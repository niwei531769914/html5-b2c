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

    function (can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
              LHFooter,
              template_page_registerhelp) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function () {
                this.URL = LHHybrid.getUrl();
            },

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function (element, options) {
                var that = this;

                this.initData();

                var renderList = can.mustache(template_page_registerhelp);
                that.element.html(renderList);
                that.deleteNav();
                new LHFooter();
            },
            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.from);
                if (param.from == "app") {
                    $('.header').hide();
                    $('.login_main').css('margin-top',0);
                    return false;
                }
            },
            '.back click': function () {

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