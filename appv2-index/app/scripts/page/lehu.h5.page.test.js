define('lehu.h5.page.test', [
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

        'text!template_components_test'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,imgLazyLoad,
             LHFooter,LHDownload,
             template_components_test) {
        'use strict';

        Fastclick.attach(document.body);

        var Test = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                var renderList = can.mustache(template_components_test);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

                var param = can.deparam(window.location.search.substr(1));

                if(param.hyfrom == 'app'){
                    if(util.isMobile.iOS()){
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "开卡就送超值大礼包"
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
                    return false;
                }
            },

            '.back click': function() {
                history.go(-1);
            }
        });

        new LHFooter();
        new Test('#content');

    });