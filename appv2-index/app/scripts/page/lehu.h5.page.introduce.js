define('lehu.h5.page.introduce', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',

        'text!template_components_introduce'
    ],

    function (can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
              LHFooter,
              template_page_introduce) {
        'use strict';

        Fastclick.attach(document.body);

        var Introduce = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function (element, options) {
                var renderList = can.mustache(template_page_introduce);
                var html = renderList(this.options);
                this.element.html(html);

                if (util.isMobile.iOS()) {
                    //标题
                    var jsonParams = {
                        'funName': 'title_fun',
                        'params': {
                            "title": "50购价值200元套券"
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                }

               // new LHFooter();
            },

            '.introduce click': function () {
                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': '11539',
                        'goodsItemId': '11820'
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            }
        });

        new Introduce('#content');
    });