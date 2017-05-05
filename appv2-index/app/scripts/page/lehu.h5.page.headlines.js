define('lehu.h5.page.headlines', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',

        'text!template_components_headlines'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
        LHFooter,
        template_page_headlines) {
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

                var renderList = can.mustache(template_page_headlines);
                var html = renderList(this.options);
                this.element.html(html);
                //    去除导航
                this.deleteNav();
                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/marketing/getLehuTop',
                    data: {},
                    method: 'get'
                });
                api.sendRequest()
                    .done(function(data) {

                        if(data.code == 1){
                            if(data.response == ""){
                                var html = "";
                                html += '<p>春眠不觉晓</p><p>处处问题鸟</p>';
                                console.log(html);
                                $('.line-content-title').empty().append(html);
                                $('.line-content-detail').html("滚蛋！");
                                return false;
                            }
                            var CONTENT = data.response[0];
                            console.log(CONTENT);
                            var html = "";
                            html += '<p>' + CONTENT.begintime + '</p><p>' + CONTENT.articleTitle + '</p>';
                            console.log(html);
                            $('.line-content-title').empty().append(html);
                            $('.line-content-detail').html(CONTENT.articleContent);

                        }

                    })
                    .fail(function(error) {

                        util.tip("服务器错误！",3000);

                    });

                new LHFooter();
            },

            deleteNav:function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.from);
                if(param.from == "app"){
                    $('.header').hide();
                    return false;
                }
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