define('lehu.h5.page.login', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',

        'lehu.h5.header.footer',

        'lehu.h5.component.login'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid,
        LHFooter,
        LHLogin) {
        'use strict';

        Fastclick.attach(document.body);

        var Login = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var login = new LHLogin("#login");
            }
        });

        new Login('#login');
    });