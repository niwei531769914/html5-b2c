define('lehu.h5.page.outlogin', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        'md5',
        'lehu.utils.busizutil',

        'lehu.h5.header.download',
        'text!template_components_outlogin'
    ],

    function (can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI, md5 , busizutil, LHDownload,
              template_components_outlogin) {
        'use strict';

        Fastclick.attach(document.body);

        var Outlogin = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function (element, options) {
                var that = this;
                this.initData();
                var renderList = can.mustache(template_components_outlogin);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

            },

            initData: function () {
                this.URL = busizutil.httpgain();
                this.loginBysms = true;

                //获取当前时间戳
                this.timeStamp = Date.parse(new Date());
            },

            '.user-phone focus': function ($element, event) {
                $(".err-msg").html("");
            },

            '.user-password focus': function ($element, event) {
                $(".err-msg").html("");
            },

            '.txt-input focus': function ($element, event) {
                $(".err-msg").html("");
            },

            //倒计时
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
            //手机格式
            checkmobile: function (mobile) {
                if (!mobile) {
                    return false;
                }
                return /^1\d{10}$/.test(mobile);
            },

            '.btn-retransmit click': function (element, event) {
                if (element.hasClass("btn-retransmit-disabled")) {
                    return false;
                }
                var that = this;
                var userName = $(".user-phone").val();

                if (userName == "") {
                    $(".err-msg").html("手机号码不能为空");
                    return false;
                }

                if (!that.checkmobile(userName)) {
                    $(".err-msg").html("手机号码格式错误");
                    return false;
                }

                this.param = {
                    'phoneCode': userName,
                    'timeStamp': that.timeStamp
                };

                var api = new LHAPI({
                    //url: that.URL + "/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode?sign=" + that.encription(this.param),
                    url: "http://121.196.208.98:28080/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode?sign=" + that.encription(this.param),
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            that.countdown.call(that, 60);
                            $(".err-msg").html("");
                        } else {
                            $(".err-msg").html(data.msg);
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").html("短信验证码发送失败");
                    })
            },


            '.btn-login click': function (element, event) {
                if (element.hasClass('btn-disabled')) {
                    return false;
                }

                var userName = $(".user-phone").val();
                var captcha = $(".txt-input").val();
                var passWord = $(".user-password").val();

                if (userName == "") {
                    $(".err-msg").html("手机号码不能为空!");
                    return false;
                }
                if (captcha == "") {
                    $(".err-msg").html("验证码不能为空!");
                    return false;
                }
                if (passWord == "") {
                    $(".err-msg").html("密码不能为空!");
                    return false;
                }
                if (passWord.length < 5) {
                    $(".err-msg").html("密码不能小于6位数");
                    return false;
                }
                if (passWord.length > 17) {
                    $(".err-msg").html("密码不能大于18位数");
                    return false;
                }

                if($('.reg-protocol').find('i').hasClass('active')){
                    $('.err-msg').html("请点击同意用户协议");
                    return false;
                }

                this.loginBySms(userName, captcha,passWord);

            },

            loginBySms: function (userName, captcha,passWord) {
                var that = this;

                if (captcha == "") {
                    $(".err-msg").html("验证码不能为空!");
                    return false;
                }

                this.param = {
                    'phoneCode': userName,
                    'password': md5(passWord),
                    'identifyingcode': captcha,
                    'type': "1",
                    'origin': '5',
                    'phoneToken':'',
                    'timeStamp': that.timeStamp
                };

                var api = new LHAPI({
                    //url: that.URL + '/mobile-web-user/ws/mobile/v1/user/login?sign=' + that.encription(this.param),
                    url: 'http://121.196.208.98:28080/mobile-web-user/ws/mobile/v1/user/register?sign=' + that.encription(this.param),
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        //注册成功
                        if (data.code == 1) {
                            $('.error-msg').text("");
                            $('.user-phone').val("");
                            $('.txt-input').val("");
                            $('.register-success').show();
                            $('.cover').show();
                        }
                        else {
                            $(".err-msg").html(data.msg);
                        }
                    })
                    .fail(function (error) {
                        $(".err-msg").html('登录失败，请重新登录');
                    })
            },

            //点击隐藏注册成功弹窗
            '.close click': function () {
                $('.register-success').hide();
                $('.cover').hide();
            },

            '.load-sc, .load click': function () {
                window.location.href = 'download.html';
            },

            //用户协议
            '.reg-protocol click': function (element, event) {

                if($(element).find('i').hasClass('active')){
                    $(element).find('i').removeClass('active');
                    return false;
                }
                $(element).find('i').addClass('active');

            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    return false;
                }
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
        new Outlogin('#outlogin');

    });