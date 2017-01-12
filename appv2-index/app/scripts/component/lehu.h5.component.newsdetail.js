define('lehu.h5.component.newsdetail', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'underscore',
        'text!template_components_newsdetail'
    ],
    function($, can, LHConfig, util, LHAPI, LHHybrid, _,
             template_components_newsdetail) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */

            init:function(){
                var that = this;
                that.initDate();
                var renderList = can.mustache(template_components_newsdetail);
                var html = renderList(this.options);
                that.element.html(html);

                that.getNewsDetailtData.apply(that);

            },

            initDate : function(){
                var host = window.location.host;
                if (host.indexOf("http://") == -1) {
                    host = "http://" + host;
            }


                this.LURL = host + "/hht/mobile/notices/";

            },

            getNewsDetailtData: function(){
                var that = this ;

                this.param = {};

                this.param = can.deparam(window.location.search.substr(1));

                var LHURL=  that.LURL +  "detail.ajax";

                var api = new LHAPI({
                    url : LHURL,
                    data : {
                        id : this.param.id
                    },
                    method : 'post'
                });

                api.sendRequest()
                    .done(function(data){

                        var newsDetail = data.result;

                        $('.header_list_title').text(newsDetail.title);

                        $('.ac_list_neirong').html(newsDetail.content);

                    })
                    .fail(function(error){

                        util.tip("相应超时！");

                    }) ;
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

