define('lehu.h5.header.download', [
    'zepto',
    'can',
    'store',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

   /* 'imagelazyload',*/

    'text!template_header_download'
  ],

  function($, can, store, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload,
    template_header_download) {
    'use strict';

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function(element, options) {
        this.options.title = options.title || "下载领取150元新人大红包";
        this.options.subtitle = options.subtitle || "还有188元优惠券等你拿！";
        this.options.canotclose = options.canotclose;

        var renderDownload = can.mustache(template_header_download);
        var html = renderDownload(this.options);
        $("#download").html(html);

        var isHideAd = store.get('IS_HIDE_AD');
        if (isHideAd && (Date.now() - isHideAd > 1 * 24 * 60 * 60 * 1000)) {
          store.remove('IS_HIDE_AD');
        }

        if (this.options.position !== "bottom") {
          $('.downloadapp-content').css({
            'top': '0'
          });
        }

        //暂时关闭
        // $('.downloadapp').hide();
        // return false;
        //暂时关闭

        if (isHideAd && !this.options.canotclose) {
          $('.downloadapp').hide();
        } else {
          $('.downloadapp').css({
            'display': 'block'
          });
        }

        $(".downloadapp-close").bind("click", function() {
          store.set("IS_HIDE_AD", Date.now());
          $(".downloadapp").hide()
        })
      }
    });

  });