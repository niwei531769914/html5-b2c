define('lehu.h5.component.group', [
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

    'text!template_components_group'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
    imagelazyload, busizutil,
    template_components_group) {
    'use strict';

    return can.Control.extend({

      helpers: {
        'lehu-img': function(imgprefix, img) {
          if (_.isFunction(imgprefix)) {
            imgprefix = imgprefix();
          }

          if (_.isFunction(img)) {
            img = img();
          }

          if (img.indexOf("http://") > -1) {
            return img;
          }

          return imgprefix + img;
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

        this.options.data = new can.Map({
          "grouplist": null,
          "joinlist": null,
          "successlist": null,
          "imgprefix": null
        });
      },

      render: function() {
        var that = this;

        this.param = {
          "page": 1,
          "pageNum": "20"
        };

        // busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + "groupAcFrontList.do",
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {

            that.options.data.attr("grouplist", data.list);
            that.options.data.attr("imgprefix", that.URL.IMAGE_URL);

            var renderList = can.mustache(template_components_group);
            var html = renderList(that.options.data, that.helpers);
            that.element.html(html);

            that.dealhash();
          })
          .fail(function(error) {
            var renderList = can.mustache(template_components_group);
            var html = renderList(that.options, that.helpers);
            that.element.html(html);
            util.tip(error.msg);
          })
      },

      ".tabs a click": function(element, event) {
        $(".tabs .active").removeClass('active');
        element.addClass('active');
        var currentdetail = $(".swiper-slide").eq(element.index());
        $(currentdetail).show().siblings().hide();

        store.set("groupselectedindex", element.index());

        var action = null;
        var status = null;
        if (element.index() == 1) {
          action = "queryUserAcPageList.do";
          status = 0;

          if (!this.options.data.attr("joinlist")) {
            this.sendRequest(action, status);
          }

        } else if (element.index() == 2) {
          action = "queryUserAcPageList.do";
          status = 1;

          if (!this.options.data.attr("successlist")) {
            this.sendRequest(action, status);
          }
        }
      },

      sendRequest: function(action, status) {
        var that = this;

        var param = {
          "page": 1,
          "pageNum": "20",
          "status": status
        }

        var api = new LHAPI({
          url: this.URL.SERVER_URL + action,
          data: param,
          method: 'post'
        });

        api.sendRequest()
          .done(function(data) {

            if (status == 0) {
              that.options.data.attr("joinlist", data.list);
            } else if (status == 1) {
              that.options.data.attr("successlist", data.list);
            }

          })
          .fail(function(error) {
            util.tip(error.msg);
          })
      },

      dealhash: function() {
        var selectedIndex = store.get("groupselectedindex");

        // ios
        if (typeof selectedIndex != 'undefined') {
          $(".tabs a").eq(selectedIndex).click()
        } else {
          var hash = location.hash;
          if (hash == "#open" || hash == "") {
            $(".tabs a").eq(0).click()
          } else if (hash == "#join") {
            $(".tabs a").eq(1).click()
          } else if (hash == "#success") {
            $(".tabs a").eq(2).click()
          }
        }
      },

      '.group_main_box click': function(element, event) {
        var href = element.attr("data-href");
        location.href = href;
        return false;
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