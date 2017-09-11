define('lehu.h5.page.love', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        "imgLazyLoad",

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'text!template_components_love'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,imgLazyLoad,
             LHFooter,LHDownload,
             template_components_love) {
        'use strict';

        Fastclick.attach(document.body);

        var Love = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                var renderList = can.mustache(template_components_love);
                var html = renderList(this.options);
                this.element.html(html);

                //img图片懒加载
                $.imgLazyLoad();

                //去除导航
                this.deleteNav();

                var param = can.deparam(window.location.search.substr(1));

                if(param.hyfrom == 'app'){
                    if(util.isMobile.iOS()){
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "七夕情人节 甜蜜购"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }
                }
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom  || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.fullgive_ad').css('margin-top',0);
                    return false;
                }
            },

            //进入活动详情页
            '.love-list-item ,.love-list-fc click': function (element, event) {

                var URL = $(element).attr('data-url');
                window.location.href = URL;

            },

            //进入商品详情页
            '.love-list-tc img ,.prefecture-list-item ,.goods-list-item ,.column-list-item click': function (element,event) {
                var GOODSID = element.attr('data-goodsid');
                var GOODSITEMID = element.attr('data-goodsitemid');

                console.log(GOODSID);
                console.log(GOODSITEMID);

                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': GOODSID,
                        'goodsItemId': GOODSITEMID
                    }
                };
                LHHybrid.nativeFun(jsonParams);

            },

            '.back click': function() {
                history.go(-1);
            }
        });

        new LHFooter();
        new Love('#content');

    });