define('lehu.h5.component.carousel', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_carousel'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload, busizutil,
    template_components_carousel) {
    'use strict';

    var $lottery;
    var $units;

    var lottery = {
      index: 0, //当前转动到哪个位置
      count: 0, //总共有多少个位置
      timer: 0, //setTimeout的ID，用clearTimeout清除
      speed: 200, //初始转动速度
      times: 0, //转动次数
      cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1, //中奖位置
      init: function(id) {
        if ($("#" + id).find(".lottery-unit").length > 0) {
          $lottery = $("#" + id);
          $units = $lottery.find(".lottery-unit");
          this.obj = $lottery;
          this.count = $units.length;
          // $lottery.find(".lottery-unit-" + this.index).addClass("active");
        };
      },
      roll: function() {
        var index = this.index;
        var count = this.count;
        var lottery = this.obj;
        $(lottery).find(".lottery-unit-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
          index = 0;
        };
        $(lottery).find(".lottery-unit-" + index).addClass("active");
        this.index = index;
        return false;
      },
      stop: function(index) {
        this.prize = index;
        return false;
      }
    };

    function roll(lotteryIndex, tip) {
      lottery.times += 1;
      lottery.roll();
      if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
        clearTimeout(lottery.timer);
        lottery.prize = -1;
        lottery.times = 0;
        click = false;
        util.tip(tip);
        $(".lottery-bt").removeClass("disable");
      } else {
        if (lottery.times < lottery.cycle) {
          lottery.speed -= 10;
        } else if (lottery.times == lottery.cycle) {
          var index = lotteryIndex;
          // var index = Math.random() * (lottery.count) | 0;
          lottery.prize = index;
        } else {
          if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
            lottery.speed += 110;
          } else {
            lottery.speed += 20;
          }
        }
        if (lottery.speed < 40) {
          lottery.speed = 40;
        };

        lottery.timer = setTimeout(function() {
          roll(lotteryIndex, tip);
        }, lottery.speed);
      }
      return false;
    }

    var click = false;

    return can.Control.extend({

      param: {},

      helpers: {
        hasnodata: function(data, options) {
          if (!data || data.length == 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        },

        "lehu-lottery": function(list, index) {
          var lottery = list[index];

          // 谢谢参与
          if (!lottery.prizeType) {
            return lottery.prizeName;
          } else if (lottery.prizeType == "2") { // 优惠券
            var map = {
              "5": "lottery-bg05",
              "8": "lottery-bg01",
              "20": "lottery-bg02",
              '50': "lottery-bg06",
              '100': "lottery-bg03",
              "200": "lottery-bg04"
            }
            if (lottery.TICKET_INFO) {
              return '<p class="' + (map[lottery.TICKET_INFO.PRICE] || "lottery-bg01") + '"><em><b>' + lottery.TICKET_INFO.PRICE + '</b>元优惠券</em>(全场通用)</p><span>通用券' + lottery.TICKET_INFO.PRICE + '元</span>'
            } else {
              return lottery.prizeName;
            }

          } else {
            return lottery.prizeName;
          }
        }
      },

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();
        this.render();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      render: function() {

        this.userId = busizutil.getUserId();

        var params = {};

        if (this.userId) {
          params.userId = this.userId;
        }else {
          params.userId = "";
        }

        var that = this;

        var api = new LHAPI({
          url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/luck/getLuckActivity",
          data: JSON.stringify(params),
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {

            if(data.code !== 1){
                util.tip(data.msg,3000);
                return false;
            }

            // 中奖纪录
            that.options.zhongJiangJiLu = data.response.recordList;

            // 奖品
            that.options.luckProbabilityList = data.response.prizeList;

            //判断当抽奖奖品少于8个，自动添加谢谢参与
            if (that.options.luckProbabilityList.length < 8) {
              var length = 8 - that.options.luckProbabilityList.length;
              for (var i = 0; i < length; i++) {
                that.options.luckProbabilityList.push({
                  "prizeName": "谢谢参与",
                  "prizeType": ""
                })
              }
            }

            // 剩余次数规则
            that.options.data = new can.Map({
              "lasttimes": data.response.drawedTimes,
            });

            // luck_id
            that.luckId = that.options.luckProbabilityList[0].probability;

            var renderList = can.mustache(template_components_carousel);
            var html = renderList(that.options, that.helpers);
            that.element.html(html);
            $('.dial_footer ul').append(data.response.activeRule);
            lottery.init('lottery');
            that.scrollZhongjiangjilu();

              //  去除导航事件
            that.deleteNav();

            if (!that.userId) {
              $("#nologin").show();
              $("#alreadylogin").hide();
            } else {
              $("#nologin").hide();
              $("#alreadylogin").show();
            }
          })
          .fail(function(error) {
            util.tip(error.msg);
          });
      },

      scrollZhongjiangjilu: function() {
        /*信息滚动*/
        var $this = $(".dial_msg_box");
        var scrollTimer = setInterval(function() {
          scrollNews($this);
        }, 2000);

        function scrollNews(obj) {
          var $self = obj.find("ul:first");
          var lineHeight = $self.find("li:first").height();
          $self.animate({
            "margin-top": -lineHeight + "px"
          }, 400, function() {
            $self.css({
              "margin-top": "0px"
            }).find("li:first").appendTo($self);
          })
        };
      },

      getLottery: function() {
        var that = this;
        $(".lottery-bt").addClass("disable");
        this.param = {
          "userId": this.userId,
          "luckActiveId": this.luckId
        };

        var api = new LHAPI({
          url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/luck/drawLuck",
          data: JSON.stringify(this.param),
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {

            //如果返回code不等于1
            if(data.code !== 1){
              util.tip(data.msg,3000);
              $(".lottery-bt").removeClass("disable");
              click = true;
              return false;
            }

            //重置抽奖次数
            that.options.data.attr("lasttimes", data.surplusNum);

            var lotteryIndex = -1;
            var lotteryInfo = null;
            var tip = ""; //中奖信息

            if (data.win_id) {

              for (var i = 0; i < that.options.luckProbabilityList.length; i++) {
                if (that.options.luckProbabilityList[i].ID == data.win_id) {
                  lotteryIndex = i;
                  lotteryInfo = that.options.luckProbabilityList[i];
                  tip = "恭喜您获得" + lotteryInfo.PRIZENAME;
                  break;
                }
              }

            } else { //谢谢参与
              for (var i = 0; i < that.options.luckProbabilityList.length; i++) {
                if (that.options.luckProbabilityList[i].TYPE == "") {
                  lotteryIndex = i;
                  lotteryInfo = that.options.luckProbabilityList[i];
                  tip = "谢谢参与";
                  break;
                }
              }
            }

            // 滚动抽奖
            if (click) {
              return false;
            } else {
              lottery.speed = 100;
              roll(lotteryIndex, tip);
              click = true;
              return false;
            }
            // util.tip(tip);
          })
          .fail(function(error) {
            util.tip("服务器错误！",3000);
          });
      },

      "#lottery a click": function() {

        if ($(".lottery-bt").hasClass("disable")) {
          return false;
        }

        var param = can.deparam(window.location.search.substr(1));

        this.userId = busizutil.getUserId();
        if (!this.userId) {
          if (util.isMobile.WeChat() || param.from == "share") {
            location.href = "login.html?from=" + escape(location.href);
            return false;
          } else {
            var jsonParams = {
              'funName': 'login',
              'params': {}
            };
            LHHybrid.nativeFun(jsonParams);
            return false;
          }
        }
        this.getLottery();
      },

      "#login click": function(element, event) {
        var param = can.deparam(window.location.search.substr(1));

        if (util.isMobile.WeChat() || param.from == "share") {
          location.href = "login.html?from=carousel.html";
          return false;
        } else {
          var jsonParams = {
            'funName': 'login',
            'params': {}
          };
          LHHybrid.nativeFun(jsonParams);

          return false;
        }
      },


        deleteNav:function () {
          var param = can.deparam(window.location.search.substr(1));
          if(param.from == "app"){
            $('.header').hide();
            return false;
          }
        },

      '.back click': function() {

        if (util.isMobile.Android() || util.isMobile.iOS()) {
          var jsonParams = {
            'funName': 'back_fun',
            'params': {}
          };
          LHHybrid.nativeFun(jsonParams);
          console.log('back_fun');
        } else {
          history.go(-1);
        }
      }
    });

  });