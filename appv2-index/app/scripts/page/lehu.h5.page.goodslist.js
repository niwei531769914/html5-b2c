define('lehu.h5.page.goodslist', [
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

        'text!template_components_goodslist'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,imgLazyLoad,
             LHFooter,LHDownload,
             template_components_goodslist) {
        'use strict';

        Fastclick.attach(document.body);

        var GoodsList = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                var renderList = can.mustache(template_components_goodslist);
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
                                "title": "亚洲保健专场"
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

            '.fullgive-sale-box click': function (element,event) {
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
        new GoodsList('#content');

    });