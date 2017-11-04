define('lehu.h5.page.notice', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        "imgLazyLoad",
        'lehu.utils.busizutil',
        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'text!template_components_notice'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,imgLazyLoad,busizutil,
             LHFooter,LHDownload,
             template_components_notice) {
        'use strict';

        Fastclick.attach(document.body);

        var Notice = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {

                var renderList = can.mustache(template_components_notice);
                var html = renderList(this.options);
                this.element.html(html);

                if (util.isMobile.iOS()) {
                    //标题
                    var jsonParams = {
                        'funName': 'title_fun',
                        'params': {
                            "title": "国庆放假通知"
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                }
            }
        });

        new Notice('#content');

    });