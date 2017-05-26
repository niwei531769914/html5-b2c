define('lehu.h5.header.download', [
        'zepto',
        'can',
        'store',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',


        'text!template_header_download'
    ],

    function ($, can, store, LHConfig, util, LHAPI, LHHybrid,
              template_header_download) {
        'use strict';

        return can.Control.extend({

            param: {},

            /**
             * @override
             * @description 初始化方法
             */
            init: function (element, options) {
                this.options.title =  "汇银乐虎全球家";
                this.options.subtitle =  "真货 | 真便宜 | 真方便";

                var renderDownload = can.mustache(template_header_download);
                var html = renderDownload(this.options);
                $("#download").html(html);


                if (this.options.position !== "bottom") {
                    $('.downloadapp-content').css({
                        'top': '0'
                    });
                }

                $(".downloadapp-close").bind("click", function () {

                    $(".downloadapp").hide();
                })
            }
        });

    });