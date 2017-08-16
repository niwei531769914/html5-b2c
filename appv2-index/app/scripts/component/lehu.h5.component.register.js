define('lehu.h5.component.register', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',
        'store',

        'lehu.utils.busizutil',

        'text!template_components_register'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
              busizutil,
              template_components_register) {
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
                this.from = params.from;
                var renderList = can.mustache(template_components_register);
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
                if(HOST.indexOf("http://") == -1){
                    HOST = "http://" + HOST;
                }
                this.URL = HOST;

                //获取当前时间戳
                this.timeStamp = Date.parse(new Date());
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
                        that.element.find('.btn-retransmit').text(time + 's后重发').addClass('btn-retransmit-disabled');
                        that.countdown.call(that, time);
                    } else {
                        that.element.find('.btn-retransmit').text('获取验证码').removeClass('btn-retransmit-disabled');
                    }
                }, 1000);
            },

            checkmobile: function (mobile) {
                if (!mobile) {
                    return false;
                }
                return /^1\d{10}$/.test(mobile);
            },

            '.txt-phone focus': function ($element, event) {
                $(".item-tips").css("display", "none");
            },

            '.txt-password focus': function ($element, event) {
                $(".item-tips").css("display", "none");
            },

            '.txt-sms-captcha focus': function ($element, event) {
                $(".item-tips").css("display", "none");
            },

            ".reg-protocol i click": function (element, event) {
                $(".reg-protocol").toggleClass('reg-protocol-selected');
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
                    'phoneCode': userName,
                    'timeStamp': that.timeStamp
                };

                var api = new LHAPI({
                    url:  that.URL + '/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode?sign=' + that.encription(this.param),
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

            '.btn-login click': function (element, event) {
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
                    $(".err-msg").text("验证码不能为空!").parent().css("display", "block")
                    return false;
                }
                if (passWord == "") {
                    $(".err-msg").text("密码不能为空!").parent().css("display", "block")
                    return false;
                }
                if (passWord.length < 5) {
                    $(".err-msg").text("密码不能小于6位数").parent().css("display", "block")
                    return false;
                }
                if (passWord.length > 17) {
                    $(".err-msg").text("密码不能大于18位数").parent().css("display", "block")
                    return false;
                }

                if (!that.checkmobile(userName)) {
                    $(".err-msg").text("手机号码格式错误!").parent().css("display", "block");
                    return false;
                }

                this.param = {
                    'phoneCode': userName,
                    'password': md5(passWord),
                    'identifyingcode': captcha,
                    'phoneToken': '',
                    'origin': '5',
                    'timeStamp': that.timeStamp
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-user/ws/mobile/v1/user/register?sign=' + that.encription(this.param),
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            location.href = 'login.html?hyfrom=' + escape(that.from);
                        } else {
                            $(".err-msg").text(data.msg).parent().css("display", "block");
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").text('注册失败').parent().css("display", "block");
                    })
            },

            //md5加密
            encription: function (params) {
                var Keyboard = '00BE62201707188DE8A63ZGH66D46yTXNREG1423';
                var mdName = 'key=' + Keyboard +'&body=' + JSON.stringify(params);
                return md5(mdName);
            },

            '.back click': function () {
                    history.go(-1);
            }


        });

    });