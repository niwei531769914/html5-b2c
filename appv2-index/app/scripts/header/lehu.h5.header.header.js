define('lehu.h5.header.header', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

    'imagelazyload',

    'text!template_header_header'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload,
    template_header_header) {
    'use strict';

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        var renderFooter = can.mustache(template_header_header);
        var html = renderFooter(this.options);
        $("#header").html(html);
      }
    });

  });