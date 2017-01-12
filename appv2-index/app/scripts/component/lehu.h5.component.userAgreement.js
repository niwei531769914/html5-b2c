define('lehu.h5.component.userAgreement', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'underscore',
        'text!template_components_userAgreement'
    ],
    function($, can, LHConfig, util, LHAPI, LHHybrid, _,
             template_components_userAgreement) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */

            init:function(){
                var that = this;
                var renderList = can.mustache(template_components_userAgreement);
                var html = renderList(this.options);
                that.element.html(html);


            },


            // 返回
            '.back click': function() {
                if (history.length == 1) {
                    window.opener = null;
                    window.close();
                } else {
                    window.history.go(-1);
                };

                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_fun',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                    console.log('back_fun');
                } else {
                    window.history.go(-1);
                }
            },
        });
    });

