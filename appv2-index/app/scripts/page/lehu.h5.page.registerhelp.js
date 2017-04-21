define('lehu.h5.page.registerhelp', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',

        'text!template_page_registerhelp'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
        LHFooter,
        template_page_registerhelp) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function() {
                this.URL = LHHybrid.getUrl();
            },

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                this.initData();

                // var api = new LHAPI({
                //     url: this.URL.SERVER_URL + LHConfig.setting.action.queryRegistrationAgreement,
                //     data: {
                //         "flag": 362
                //     },
                //     method: 'post'
                // });
                // api.sendRequest()
                //     .done(function(data) {
                        var renderList = can.mustache(template_page_registerhelp);

                      //  var html = renderList(data);
                        that.element.html(renderList);
                    // })
                    // .fail(function(error) {
                    //
                    // });

                new LHFooter();
            },

            '.back click': function() {

                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_fun',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                    console.log('back_fun');
                } else {
                    history.go(-1);
                }
            }
        });

        new RegisterHelp('#content');
    });