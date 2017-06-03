define('lehu.h5.component.forgetpassword', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',

        'imgLazyLoad',
        'lehu.utils.busizutil',

        'text!template_components_forgetpassword'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5,
              imagelazyload, busizutil,
              template_components_forgetpassword) {
        'use strict';

        return can.Control.extend({

            param: {},

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();

                var renderList = can.mustache(template_components_forgetpassword);
                var html = renderList(this.options);
                this.element.html(html);

                this.bindEvent();
            },


            bindEvent: function () {
                var that = this;

                this.userNameLength = 0;
                this.passwordLength = 0;
                this.captchaLength = 0;

                $('.txt-phone').on('keyup', function () {
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
                if (this.userNameLength && this.captchaLength && this.passwordLength) {
                    $('.btn-login').removeClass('btn-disabled');
                } else {
                    $('.btn-login').addClass('btn-disabled');
                }
            },

            initData: function () {
                var HOST = window.location.host;
                if (HOST.indexOf("http://") == -1) {
                    HOST = "http://" + HOST;
                }
                this.URL = HOST;
            },

            checkmobile: function (mobile) {
                if (!mobile) {
                    return false;
                }
                return /^1\d{10}$/.test(mobile);
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

            countdown: function (time) {
                var that = this;
                setTimeout(function () {
                    if (time > 0) {
                        time--;
                        that.element.find('.btn-retransmit').text(time + 's').addClass('btn-retransmit-disabled');
                        that.countdown.call(that, time);
                    } else {
                        that.element.find('.btn-retransmit').text('获取验证码').removeClass('btn-retransmit-disabled');
                    }
                }, 1000);
            },

            '.btn-findpwd click': function (element, event) {
                var that = this;

                if (element.hasClass('btn-disabled')) {
                    return false;
                }

                var userName = $(".txt-phone").val();
                var passWord = $(".txt-password").val();
                var captcha = $(".txt-sms-captcha").val();

                if (userName == "") {
                    $(".err-msg").text("手机号码不能为空!").parent().css("display", "block");
                    return false;
                }
                if (captcha == "") {
                    $(".err-msg").text("验证码不能为空!").parent().css("display", "block");
                    return false;
                }
                if (passWord == "") {
                    $(".err-msg").text("密码不能为空!").parent().css("display", "block");
                    return false;
                }

                if (!that.checkmobile(userName)) {
                    $(".err-msg").text("手机号码格式错误!").parent().css("display", "block");
                    return false;
                }

                this.param = {
                    'phoneCode': userName,
                    'newpassword': passWord,
                    'identifyingcode': captcha,
                    'origin': '5'
                };

                var api = new LHAPI({
                   // url: 'http://mobile.vision-world.cn:8080/mobile-web-user/ws/mobile/v1/user/findpassword',
                    url: that.URL + '/mobile-web-user/ws/mobile/v1/user/findpassword',
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            location.href = 'login.html';
                        } else {
                            $(".err-msg").text(data.msg).parent().css("display", "block");
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").text("找回密码失败").parent().css("display", "block");
                    })
            },

            '.btn-retransmit click': function (element, event) {

                if (element.hasClass("btn-retransmit-disabled")) {
                    return false;
                }
                var that = this;
                var userName = $(".txt-phone").val();

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

                //busizutil.encription(this.param);

                var api = new LHAPI({
                    //url: 'http://mobile.vision-world.cn:8080/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode',
                    url: that.URL + '/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode',
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

            '.back click': function () {
                history.go(-1);
            }
        });

    });