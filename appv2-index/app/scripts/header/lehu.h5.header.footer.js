define('lehu.h5.header.footer', [
    'zepto',
    'can',
    'lehu.h5.business.config',

    'text!template_header_footer'
  ],

  function($, can, LHConfig,
    template_header_footer) {
    'use strict';

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {

        var renderFooter = can.mustache(template_header_footer);
        var html = renderFooter(this.options);
        $("#footer").html(html);

        this.goBack2Top();
      },

      goBack2Top: function() {
        var topElement = document.querySelector(".fix_go_top");
        var scrollTop = {
          init: function() {
            this.scrollEvt();
            this.toTopEvt()
          },
          toTopEvt: function() {
            topElement.addEventListener("click", function() {
              window.scroll(0, 0);
              topElement.style.display = "none"
            }, false);
          },
          scrollEvt: function() {
            window.addEventListener("scroll", function() {
              var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
              var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
           //   if (scrollTop >  0 ||clientHeight) {
              if (scrollTop >  10 ) {
                topElement.style.display = "block"
              } else {
                topElement.style.display = "none"
              }
            }, false);
          }
        };
        return scrollTop.init()
      }
    });

  });