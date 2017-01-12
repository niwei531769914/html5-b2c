define('lehu.h5.page.newsList', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.header.footer',
        'lehu.h5.component.newsList'
    ],
    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHFooter,
             LHNews) {
        'use strict';

        Fastclick.attach(document.body);

        var NewsList = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var newsList = new LHNews("#newsList");

                new LHFooter();
            }
        });

        new NewsList('#newsList');
    });

