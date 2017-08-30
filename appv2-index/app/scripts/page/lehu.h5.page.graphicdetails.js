define('lehu.h5.page.graphicdetails', [
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

        'text!template_components_graphicdetails'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI, busizutil,
        LHFooter,
        template_page_graphicdetails) {
        'use strict';

        Fastclick.attach(document.body);

        var GraphicDetails = can.Control.extend({

            initData: function() {
                this.URL = busizutil.httpgain();
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

                            if(CONTENT.goodsDesc.indexOf('src="http://') > -1){
                                CONTENT.goodsDesc = CONTENT.goodsDesc.replace(/src="http:/,'src="https:');
                            }

                            if(CONTENT.serviceDesc.indexOf('src="http://') > -1){
                                CONTENT.serviceDesc = CONTENT.serviceDesc.replace(/src="http:/,'src="https:');
                            }

                            //安卓引用图片后面加webp格式后缀
                            if (util.isMobile.Android()) {
                                if(CONTENT.goodsDesc.indexOf('upaiyun') > -1 && CONTENT.serviceDesc.indexOf('upaiyun') > -1){
                                    //JPG.PNG.WOFF.GIF
                                    if(CONTENT.goodsDesc.indexOf('.jpg"') > -1){
                                        CONTENT.goodsDesc = CONTENT.goodsDesc.replace(/.jpg"/, '.jpg!/format/webp"');
                                    }
                                    if(CONTENT.serviceDesc.indexOf('.jpg"') > -1){
                                        CONTENT.serviceDesc = CONTENT.serviceDesc.replace(/.jpg"/, '.jpg!/format/webp"');
                                    }
                                    if(CONTENT.goodsDesc.indexOf('.png"') > -1){
                                        CONTENT.goodsDesc = CONTENT.goodsDesc.replace(/.png"/, '.png!/format/webp"');
                                    }
                                    if(CONTENT.serviceDesc.indexOf('.png"') > -1){
                                        CONTENT.serviceDesc = CONTENT.serviceDesc.replace(/.png"/, '.png!/format/webp"');
                                    }
                                    if(CONTENT.goodsDesc.indexOf('.gif"') > -1){
                                        CONTENT.goodsDesc = CONTENT.goodsDesc.replace(/.gif"/, '.gif!/format/webp"');
                                    }
                                    if(CONTENT.goodsDesc.indexOf('.gif"') > -1){
                                        CONTENT.goodsDesc = CONTENT.goodsDesc.replace(/.gif"/, '.gif!/format/webp"');
                                    }
                                }
                            }

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