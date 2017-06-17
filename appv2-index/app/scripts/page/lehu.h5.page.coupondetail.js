define('lehu.h5.page.coupondetail', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.header.footer',

        'lehu.h5.component.coupondetail'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
        LHFooter,
        LHCoupondetail) {
        'use strict';

        Fastclick.attach(document.body);

        var CouponDetail = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var coupondetail = new LHCoupondetail("#content");
                new LHFooter();
            }
        });

        new CouponDetail('#content');
    });