define('lehu.h5.page.coupon', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.header.footer',

        'lehu.h5.component.coupon'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
        LHFooter,
        LHCoupon) {
        'use strict';

        Fastclick.attach(document.body);

        var Coupon = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var coupon = new LHCoupon("#content");
                new LHFooter();
            }
        });

        new Coupon('#content');
    });