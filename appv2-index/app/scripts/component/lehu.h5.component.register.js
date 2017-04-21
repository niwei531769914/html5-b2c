define('lehu.h5.component.register', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'md5',
    'store',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_register'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
    imagelazyload, busizutil,
    template_components_register) {
    'use strict';

    var DEFAULT_GOTO_URL = "http://app.lehumall.com/html5/app/index.html";

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();

        var renderList = can.mustache(template_components_register);
        var html = renderList(this.options);
        this.element.html(html);

        this.bindEvent();
      },


      bindEvent: function() {
        var that = this;

        this.userNameLength = 0;
        this.passwordLength = 0;
        this.captchaLength = 0;

        $('.txt-phone').on('keyup', function() {
          that.userNameLength = this.value.length;
          that.enableLogin();
        });

        /*密码*/
        $('.txt-password').on('keyup', function() {
          that.passwordLength = this.value.length;
          that.enableLogin();
        })

        $('.txt-sms-captcha').on('keyup', function() {
          that.captchaLength = this.value.length;
          that.enableLogin();
        })
      },

      enableLogin: function() {
        if (this.userNameLength && this.captchaLength && this.passwordLength) {
          $('.btn-login').removeClass('btn-disabled');
        } else {
          $('.btn-login').addClass('btn-disabled');
        }
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      /*密码显示按钮*/
      ".btn-off click": function(element, event) {
        if (element.hasClass('btn-on')) {
          element.removeClass('btn-on');
          element.prev().attr('type', 'password');
        } else {
          element.addClass('btn-on');
          element.prev().attr('type', 'text');
        }
      },

      countdown: function(time) {
        var that = this;
        setTimeout(function() {
          if (time > 0) {
            time--;
            that.element.find('.btn-retransmit').text(time + 's').addClass('btn-retransmit-disabled');
            that.countdown.call(that, time);
          } else {
            that.element.find('.btn-retransmit').text('获取验证码').removeClass('btn-retransmit-disabled');
          }
        }, 1000);
      },

      checkmobile: function(mobile) {
        if (!mobile) {
          return false;
        }
        return /^1\d{10}$/.test(mobile);
      },

      '.txt-phone focus': function($element, event) {
        $(".item-tips").css("display", "none");
      },

      '.txt-password focus': function($element, event) {
        $(".item-tips").css("display", "none");
      },

      '.txt-sms-captcha focus': function($element, event) {
        $(".item-tips").css("display", "none");
      },

      ".reg-protocol i click": function(element, event) {
        $(".reg-protocol").toggleClass('reg-protocol-selected');
      },

      '.btn-retransmit click': function(element, event) {

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
          url: 'http://118.178.227.135/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode',
          data: JSON.stringify(this.param),
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            if (data.code == 1) {
              that.countdown.call(that, 60);
              $(".item-tips").css("display", "none");
            } else {
              $(".err-msg").text(data.msg).parent().css("display", "block");
            }
          })
          .fail(function(error) {
            $(".err-msg").text("短信验证码发送失败").parent().css("display", "block");
          })
      },

      /**
       * 获取密码强度  
       * @param password
       * @return 1弱  2中  3强
       */
      //getPasswordSafe: function(password) {
      //  if (!password) {
      //    return "1"
      //  }
      //
      //  //数字，字母，特殊符号
      //  var hasNumber = 0;
      //  var hasZimu = 0;
      //  var hasOther = 0;
      //
      //  var arr = password.split("");
      //
      //  for (var i = 0; i < arr.length; i++) {
      //    var item = arr[i];
      //    if (item >= '0' && item <= '9') {
      //      //0-9数字
      //      hasNumber = 1;
      //      continue;
      //    }
      //
      //    //65-90, 97-122
      //    if ((item >= 'A' && item <= 'Z') || (item >= 'a' && item <= 'z')) {
      //      hasZimu = 1;
      //      continue;
      //    } else {
      //      //其他字符都算为特殊字符
      //      hasOther = 1;
      //    }
      //  }
      //  return "" + (hasNumber | hasZimu | hasOther);
      //},

      '.btn-login click': function(element, event) {
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

        if (!that.checkmobile(userName)) {
          $(".err-msg").text("手机号码格式错误!").parent().css("display", "block");
          return false;
        }

        this.param = {
          'phoneCode': userName,
          'password': passWord,
          'identifyingcode': captcha,
          'phoneToken':'',
          //'pwdSafe': passWord,
          'origin': '5'
        };

       // busizutil.encription(this.param);

        var api = new LHAPI({
          url: 'http://118.178.227.135/mobile-web-user/ws/mobile/v1/user/register',
          data: JSON.stringify(this.param),
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            if (data.code == 1) {
              store.set("user", data.user);
              location.href = that.from || DEFAULT_GOTO_URL;
            } else {
              $(".err-msg").text(data.msg).parent().css("display", "block");
            }
          })
          .fail(function(error) {
            alert("注册失败");
          })
      },

      '.back click': function() {

        // temp begin
        if (util.isMobile.Android() || util.isMobile.iOS()) {
          var jsonParams = {
            'funName': 'back-fun',
            'params': {}
          };
          LHHybrid.nativeFun(jsonParams);
          console.log('back-fun');
        } else {
          history.go(-1);
        }
      }


    });

  });