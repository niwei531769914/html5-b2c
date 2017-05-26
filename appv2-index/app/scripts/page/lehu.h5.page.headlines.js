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
                if(HOST.indexOf("http://") == -1){
                    HOST = "http://" + HOST;
                }
                this.URL = HOST;
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
                var param = can.deparam(window.location.search.substr(1));
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
                                return false;
                            }
                            var CONTENT = data.response;
                            console.log(CONTENT);
                            var html = "";
                            for(var i =0; i <CONTENT.length; i++){
                                if( CONTENT[i].id == param.id){
                                    html += '<p>' + CONTENT[i].begintime + '</p><p>' + CONTENT[i].articleTitle + '</p>';
                                    $('.line-content-title').empty().append(html);
                                    $('.line-content-detail').html(CONTENT[i].articleContent);
                                    return false;
                                }
                            }

                        }

                    })
                    .fail(function(error) {

                        util.tip("服务器错误！",3000);

                    });

                new LHFooter();
            },

            deleteNav:function () {
                var param = can.deparam(window.location.search.substr(1));
                if(param.hyfrom){
                    $('.header').hide();
                    return false;
                }
            },

            '.back click': function() {
                    history.go(-1);
            }
        });

        new RegisterHelp('#content');
    });