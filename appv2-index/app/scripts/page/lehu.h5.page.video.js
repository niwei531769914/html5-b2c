define('lehu.h5.page.video', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        'lehu.utils.busizutil',

        'lehu.h5.header.footer',

        'text!template_components_video'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI, busizutil,
        LHFooter,
        template_page_video) {
        'use strict';

        Fastclick.attach(document.body);

        var Video = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {

                var renderList = can.mustache(template_page_video);
                var html = renderList(this.options);
                this.element.html(html);


            }

        });

        new Video('#content');
    });