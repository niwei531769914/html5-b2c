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
            initData: function() {
                var HOST = window.location.host;
                if(HOST.indexOf('118')>-1){
                    this.URL = 'http://118.178.227.135';
                }
                else {
                    this.URL = 'http://121.196.208.98:28080';
                }
            },
            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;
                this.initData();
                var renderList = can.mustache(template_page_graphicdetails);
                var html = renderList(this.options);
                this.element.html(html);

                var param = can.deparam(window.location.search.substr(1));
                var params = {
                    goodsId : param.goodsId
                }
                var api = new LHAPI({
                    url: that.URL + '/mobile-web-trade/ws/mobile/v1/goods/goodsDetail',
                    data: JSON.stringify(params),
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
            }
        });

        new GraphicDetails('#content');
    });