define('lehu.h5.page.carousel', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.header.footer',

        'lehu.h5.component.carousel'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
        LHFooter,
        LHCarousel) {
        'use strict';

        Fastclick.attach(document.body);

        var carousel = can.Control.extend({

            /**
             *
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var wheel = new LHCarousel("#content");
                new LHFooter();
            }
        });

        new carousel('#content');
    });