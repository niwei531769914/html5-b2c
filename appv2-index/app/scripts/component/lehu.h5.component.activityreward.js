define('lehu.h5.component.activityreward', [
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

    'text!template_components_activityreward'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
    imagelazyload, busizutil,
    template_components_activityreward) {
    'use strict';

    var DEFAULT_PAGE_INDEX = 1;
    var NODATA = false;

    can.route.ready();

    return can.Control.extend({

      helpers: {
        'lehu-img': function(imgprefix, img) {
          if (_.isFunction(img)) {
            img = img();
          }

          if (_.isFunction(imgprefix)) {
            imgprefix = imgprefix();
          }

          if (img.indexOf("http://") > -1) {
            return img;
          }

          return imgprefix + img;
        },

        'lehu-showDis': function(discount, price, options) {
          if (_.isFunction(discount)) {
            discount = discount();
          }
          if (_.isFunction(price)) {
            price = price();
          }
          if (parseFloat(discount) < parseFloat(price) && discount != 0) {
            return options.fn(options.contexts || this);
          } else {
            return options.inverse(options.contexts || this);
          }
        }
      },

      param: {},

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
        // this.URL.SERVER_URL_NJ = 'http://172.16.201.68:8083/ptapp/';
      },

      // render: function() {
      //   var that = this;

      //   this.param = {};

      //   busizutil.encription(this.param);

      //   var api = new LHAPI({
      //     url: this.URL.SERVER_URL + "queryGiftsActivityDetail.do",
      //     data: this.param,
      //     method: 'post'
      //   });
      //   api.sendRequest()
      //     .done(function(data) {
      //       that.options.data = data.giftsActivityDetail;
      //       that.options.imgprefix = that.URL.IMAGE_URL;

      //       var renderList = can.mustache(template_components_activityreward);
      //       var html = renderList(that.options, that.helpers);
      //       that.element.html(html);
      //     })
      //     .fail(function(error) {
      //       util.tip(error.msg);
      //     })
      // },

      render: function() {
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        this.request({
          pageIndex: params.pageIndex
        });
      },

      request: function(cparams) {
        var that = this;

        this.pageIndex = cparams.pageIndex;
        if (!this.pageIndex) {
          this.pageIndex = DEFAULT_PAGE_INDEX;
        }
        var query = can.param({
          pageIndex: this.pageIndex
        });

        var that = this;
        var api = new LHAPI({
          url: this.URL.SERVER_URL + 'queryGiftsActivityDetail.do?' + query,
          data: {}
        });
        api.sendRequest()
          .done(function(data) {
            that.paint(data);
          })
      },

      paint: function(data) {
        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());
        var renderFn = can.view.mustache(template_components_activityreward);

        data.supplement = {
          onLoadingData: false
        };
        this.options.data = new can.Map(data);
        this.options.data.attr("imgprefix", this.URL.IMAGE_URL);
        this.options.data.attr("pageIndex", this.pageIndex);
        this.options.data.attr("supplement.noData", false);
        var html = renderFn(this.options.data, this.helpers);
        this.element.html(html);

        this.initLoadDataEvent();
      },

      /**
       * @author zhangke
       * @description 初始化上拉加载数据事件
       */
      initLoadDataEvent: function() {
        var that = this;
        var renderData = this.options.data;
        //节流阀
        var loadingDatas = function() {
          if (that.options.data.attr("supplement.noData") || that.options.data.attr("supplement.onLoadingData")) {
            return false;
          }
          var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
          var windowHeight = $(window).height(); //窗口的高度
          var dbHiht = $("#content").height(); //整个页面文件的高度

          if ((windowHeight + srollPos + 200) >= (dbHiht)) {

            that.loadingData();
          }
        };

        $(window).scroll(_.throttle(loadingDatas, 200));
      },

      loadingData: function(cparams) {

        var that = this;
        that.options.data.attr("supplement.onLoadingData", true);

        var params = can.deparam(window.location.search.substr(1));
        params = _.extend(params, can.route.attr());

        var query = can.param({
          pageIndex: parseInt(this.options.data.pageIndex) + 1,
        });

        var that = this;
        var api = new LHAPI({
          url: this.URL.SERVER_URL + 'queryGiftsActivityDetail.do?' + query,
          data: {}
        });
        api.sendRequest()
          .done(function(data) {

            that.options.data.attr("supplement.onLoadingData", false);

            if (data.giftsActivityDetail) {
              _.each(data.giftsActivityDetail, function(item) {
                that.options.data.giftsActivityDetail.push(item);
              });

              that.options.data.attr("pageIndex", parseInt(that.options.data.pageIndex) + 1);
              that.options.data.attr("supplement.onLoadingData", false);
            } else {
              that.options.data.attr("supplement.noData", true);
            }

          })
      },

      //去商品详情
      ".fullgive_list img click": function(element, event) {
        var goodsid = element.attr("data-goodsid");
        var goodsno = element.attr("data-goodsno");
        var storeid = element.attr("data-storeid");

        this.toDetail(storeid, goodsno, goodsid);
      },

      isLogin: function() {
        var param = can.deparam(window.location.search.substr(1));

        this.userId = busizutil.getUserId();
        if (!this.userId) {
          if (util.isMobile.WeChat() || param.from == 'share') {
            location.href = "login.html?from=" + escape(location.href);
            return false;
          } else {
            var jsonParams = {
              'funName': 'login',
              'params': {
                "backurl": "index"
              }
            };
            LHHybrid.nativeFun(jsonParams);

            return false;
          }
        }

        return true;
      },

      //加入购物车
      ".fullgive_list i click": function(element, event) {

        if (!this.isLogin()) {
          return false;
        }
        var goodsid = element.attr("data-goodsid");
        var goodsno = element.attr("data-goodsno");
        var storeid = element.attr("data-storeid");

        var jsonParams = {
          'funName': 'addto_shopping_cart',
          'params': {
            'select_good_Num': 1,
            'goods_no': goodsno,
            'goods_id': goodsid
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      //去购物车
      "#gotocart click": function(element, event) {

        var jsonParams = {
          'funName': 'goto_shopping_cart',
          'params': {}
        };
        LHHybrid.nativeFun(jsonParams);
      },

      toDetail: function(STORE_ID, GOODS_NO, GOODS_ID) {
        var jsonParams = {
          'funName': 'good_detail_fun',
          'params': {
            'STORE_ID': STORE_ID,
            'GOODS_NO': GOODS_NO,
            'GOODS_ID': GOODS_ID
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      '.back click': function() {
        // temp begin  
        // 在app外部使用 点击返回 如果没有可返回则关闭掉页面
        var param = can.deparam(window.location.search.substr(1));
        if (!param.version) {
          if (history.length == 1) {
            window.opener = null;
            window.close();
          } else {
            history.go(-1);
          }
          return false;
        }
        // temp end

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