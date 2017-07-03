define('lehu.h5.page.userhelp', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',

        'text!template_page_userhelp'
    ],

    function (can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
              LHFooter,
              template_page_userhelp) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function (element, options) {
                var that = this;

                var renderList = can.mustache(template_page_userhelp);
                that.element.html(renderList);
                that.deleteNav();
                new LHFooter();
            },
            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));

                if (param.hyfrom) {
                    $('.header').hide();
                    $('.login_main').css('margin-top',0);
                    return false;
                }
            },
            '.back click': function () {
                    history.go(-1);
            }
        });

        new RegisterHelp('#content');
    });