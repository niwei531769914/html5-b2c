define('lehu.h5.component.login', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',
        'store',

        'lehu.utils.busizutil',

        'text!template_components_login'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
        busizutil,
              template_components_login) {
        'use strict';


        return can.Control.extend({

            param: {},

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();

                var params = can.deparam(window.location.search.substr(1));
                this.from = params.hyfrom;

                var renderList = can.mustache(template_components_login);
                var html = renderList(this.options);
                this.element.html(html);

                this.bindEvent();
            },

            bindEvent: function () {
                var that = this;

                this.userNameLength = 0;
                this.passwordLength = 0;
                this.captchaLength = 0;


                $('.txt-username').on('keyup', function () {
                    that.userNameLength = this.value.length;
                    that.enableLogin();
                });

                /*密码*/
                $('.txt-password').on('keyup', function () {
                    that.passwordLength = this.value.length;
                    that.enableLogin();
                })

                $('.txt-sms-captcha').on('keyup', function () {
                    that.captchaLength = this.value.length;
                    that.enableLogin();
                })
            },

            enableLogin: function () {
                if (this.loginBysms) {
                    if (this.userNameLength && this.captchaLength) {
                        $('.btn-login').removeClass('btn-disabled');
                    } else {
                        $('.btn-login').addClass('btn-disabled');
                    }
                } else {
                    if (this.userNameLength && this.passwordLength) {
                        $('.btn-login').removeClass('btn-disabled');
                    } else {
                        $('.btn-login').addClass('btn-disabled');
                    }
                }
            },

            initData: function () {
                var HOST = window.location.host;
                if(HOST.indexOf("http://") == -1){
                    HOST = "http://" + HOST;
                }
                this.URL = HOST;
                this.loginBysms = true;
            },

            '.txt-username keyup': function (element, event) {
                event && event.preventDefault();
                this.element.find('.item-tips').hide();
            },

            '.txt-password keyup': function (element, event) {
                event && event.preventDefault();
                this.element.find('.item-tips').hide();
            },

            //密码验证码切换
            '.login-tabs click': function (element, event) {
                if ($(element).hasClass('login-tab-sms')) {
                    this.loginBysms = true;
                    $(element).removeClass('login-tab-sms');
                    $(element).addClass('login-tab-psd');
                    $(element).html('密码登录');
                    $('.item.item-password').hide();
                    $('.item.item-sms-captcha').show();
                    $('.btn-login').addClass('btn-disabled');
                    $('.txt-password').val("");
                } else {
                    this.loginBysms = false;
                    $(element).addClass('login-tab-sms');
                    $(element).removeClass('login-tab-psd');
                    $(element).html('验证码登录');
                    $('.item.item-password').show();
                    $('.item.item-sms-captcha').hide();
                    $('.btn-login').addClass('btn-disabled');
                    $('.txt-sms-captcha').val("");
                }
            },

            /*密码显示按钮*/
            ".btn-off click": function (element, event) {
                if (element.hasClass('btn-on')) {
                    element.removeClass('btn-on');
                    element.prev().attr('type', 'password');
                } else {
                    element.addClass('btn-on');
                    element.prev().attr('type', 'text');
                }
            },

            checkmobile: function (mobile) {
                if (!mobile) {
                    return false;
                }
                return /^1\d{10}$/.test(mobile);
            },

            countdown: function (time) {
                var that = this;
                setTimeout(function () {
                    if (time > 0) {
                        time--;
                        that.element.find('.btn-retransmit').text(time + 's后重发').addClass('btn-retransmit-disabled');
                        that.countdown.call(that, time);
                    } else {
                        that.element.find('.btn-retransmit').text('获取验证码').removeClass('btn-retransmit-disabled');
                    }
                }, 1000);
            },

            '.btn-retransmit click': function (element, event) {

                if (element.hasClass("btn-retransmit-disabled")) {
                    return false;
                }
                var that = this;
                var userName = $(".txt-username").val();

                if (userName == "") {
                    $(".err-msg").text("手机号码不能为空").parent().css("display", "block");
                    return false;
                }

                if (!that.checkmobile(userName)) {
                    $(".err-msg").text("手机号码格式错误").parent().css("display", "block");
                    return false;
                }

                this.param = {
                    'phoneCode': userName
                };

                var api = new LHAPI({
                    url: that.URL + "/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode",
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            that.countdown.call(that, 60);
                            $(".item-tips").css("display", "none");
                        } else {
                            $(".err-msg").text(data.msg).parent().css("display", "block");
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").text("短信验证码发送失败").parent().css("display", "block");
                    })
            },

            loginBySms: function (userName, captcha) {
                var that = this;

                if (captcha == "") {
                    $(".err-msg").text("验证码不能为空!").parent().css("display", "block");
                    return false;
                }

                this.param = {
                    'phoneCode': userName,
                    'identifyingcode': captcha,
                    'type': "1",
                    'origin': '5',
                    'phoneToken ':''
                };


                var api = new LHAPI({
                    url: that.URL + '/mobile-web-user/ws/mobile/v1/user/login',
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            store.set("user", data.response);
                            location.href = that.from;
                        }
                        else {
                            $(".err-msg").text(data.msg).parent().css("display", "block")
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").text('登录失败，请重新登录').parent().css("display", "block")
                    })
            },

            '.btn-login click': function (element, event) {
                if (element.hasClass('btn-disabled')) {
                    return false;
                }

                var that = this;

                var userName = $(".txt-username").val();
                var passWord = $(".txt-password").val();
                var captcha = $(".txt-sms-captcha").val();

                if (userName == "") {
                    $(".err-msg").text("手机号码不能为空!").parent().css("display", "block");
                    return false;
                }

                // 如果是验证码登录走另一个分支
                if (this.loginBysms) {
                    this.loginBySms(userName, captcha);
                    return false;
                }

                if (passWord == "") {
                    $(".err-msg").text("密码不能为空!").parent().css("display", "block");
                    return false;
                }

                this.param = {
                    'phoneCode': userName,
                    'password': md5(passWord),
                    'type': '0',
                    'origin': '5',
                    'phoneToken':''
                };

                var api = new LHAPI({
                    url: that.URL + "/mobile-web-user/ws/mobile/v1/user/login",
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            store.set("user", data.response);
                            location.href = that.from;
                            return false;
                        }
                        else {
                            $(".err-msg").text(data.msg).parent().css("display", "block")
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").text('登录失败，请重新登录').parent().css("display", "block")
                    })
            },

            '.retrieve-password click': function (element, event) {
                if (this.from) {
                    window.location.href = 'forgetpassword.html?from=' + this.from;
                } else {
                    window.location.href = 'forgetpassword.html';
                }
            },

            '.register click': function (element, event) {
                if (this.from) {
                    window.location.href = 'register.html?from=' + this.from;
                } else {
                    window.location.href = 'register.html';
                }
            },


            ".login-free click": function (element, event) {
                element.toggleClass('login-free-selected');
            },

            '.back click': function () {
                    history.go(-1);
            }
        });

    });