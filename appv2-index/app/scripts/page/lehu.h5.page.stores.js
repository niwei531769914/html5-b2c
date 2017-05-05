define('lehu.h5.page.stores', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',

        'text!template_components_stores'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
        LHFooter,
        template_page_stores) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function() {
                var HOST = window.location.host;
                if(HOST.indexOf('118')>1){
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

                var renderList = can.mustache(template_page_stores);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/marketing/storeActivity',
                    data: {},
                    method: 'get'
                });
                api.sendRequest()
                    .done(function(data) {
                        if(data.code == 1){
                            var CONTENT = data.response;
                            var html = "";
                            for(var i = 0; i< CONTENT.length; i++){
                                html += '<div class="stores-list-box"><img src="' + CONTENT[i].img + '"  data-url="' + CONTENT[i].url + '"><p>' + CONTENT[i].title + '</p></div>';
                            }
                            $('.stores-list').empty().append(html);
                        }
                    })
                    .fail(function(error) {
                        util.tip(error.msg);
                    });
                new LHFooter();
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.from);
                if (param.from == "app") {
                    $('.header').hide();
                    return false;
                }
            },

            '.stores-list img click': function (element,event) {

                var URLTITLE = element.attr('data-url');
                console.log(URLTITLE);
                window.location.href  = element.attr('data-url');

                return false;
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