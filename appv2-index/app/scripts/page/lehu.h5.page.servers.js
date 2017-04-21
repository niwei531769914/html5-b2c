define('lehu.h5.page.servers', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.env.switcher',
        'lehu.hybrid',

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'lehu.h5.component.servers'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHSwitcher, LHHybrid,
             LHFooter, LHDownload,
             LHServers) {
        'use strict';

        Fastclick.attach(document.body);

        // window.onerror = function(msg, url, l) {
        //     var txt = "Error: " + msg + "\n"
        //     txt += "URL: " + url + "\n"
        //     txt += "Line: " + l + "\n\n";
        //     alert(txt);
        // };

        var Servers = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var content = new LHServers("#content");
                new LHFooter();

                var param = can.deparam(window.location.search.substr(1));
                if (!param.version) {
                    new LHDownload(null, {
                        "position": "bottom"
                    });
                }
            }
        });

        new Servers('#content');
    });