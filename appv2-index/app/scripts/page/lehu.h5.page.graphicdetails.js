define('lehu.h5.page.graphicdetails', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',

        'text!template_components_graphicdetails'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
        LHFooter,
        template_page_graphicdetails) {
        'use strict';

        Fastclick.attach(document.body);

        var GraphicDetails = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;
                var renderList = can.mustache(template_page_graphicdetails);
                var html = renderList(this.options);
                this.element.html(html);

                var param = can.deparam(window.location.search.substr(1));

                var api = new LHAPI({
                    url: 'http://118.178.227.135/mobile-web-trade/ws/mobile/v1/goods/goodsDetail',
                    data: JSON.stringify(param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        if(data.code == 1){
                            var CONTENT = data.response.goodsDetail;

                            $('.graphicdetails').append(CONTENT.goodsDesc);
                            $('.graphicdetails').append(CONTENT.serviceDesc);
                        }
                    })
                    .fail(function(error) {
                        util.tip(error.msg);
                    });
                new LHFooter();
            },
            //
            //
            // '.back click': function() {
            //
            //     if (util.isMobile.Android() || util.isMobile.iOS()) {
            //         var jsonParams = {
            //             'funName': 'back_fun',
            //             'params': {}
            //         };
            //         LHHybrid.nativeFun(jsonParams);
            //         console.log('back_fun');
            //     } else {
            //         history.go(-1);
            //     }
            // }
        });

        new GraphicDetails('#content');
    });