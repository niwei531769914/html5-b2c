define('lehu.h5.page.detail', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.component.detail'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
             LHDetail) {
        'use strict';

        Fastclick.attach(document.body);

        var Detail = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var list = new LHDetail("#detail");
            }
        });

        new Detail('#detail');
    });