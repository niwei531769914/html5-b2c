define('lehu.h5.component.newsList', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'underscore',
        'text!template_components_newsList'
    ],
    function($, can, LHConfig, util, LHAPI, LHHybrid, _,
             template_components_newsList) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */

            init:function(){
                var that = this;
                that.initDate();
                var renderList = can.mustache(template_components_newsList);
                var html = renderList(this.options);
                that.element.html(html);

                that.getNewsListData.apply(that);

            },

             initDate : function(){
                var host = window.location.host;
                if (host.indexOf("http://") == -1) {
                    host = "http://" + host;
                }

                this.URL = host + "/hht/static/wap/";
                this.LURL = host + "/hht/mobile/notices/search/";

            },

            getNewsListData: function(){
                var that = this;

                var param = can.deparam(window.location.search.substr(1));

                var LHURL= that.LURL + "month.ajax";

                var api = new LHAPI({
                    url : LHURL,
                    data : {},
                    method : 'post'
                });

                api.sendRequest()
                    .done(function(data){

                        var NewsList = data.result;

                        var CurrentMonth = NewsList.currentMonth;
                        var OtherMonth = NewsList.otherMonth;

                        var HREF;

                        HREF = that.URL + "newsdetail.html?id=";
                        
                        var i,k;

                        var html_01 = "";
                        html_01 += "<div>";
                        for(i = 0; i< CurrentMonth.length; i++){

                            html_01 += "<a href=' " + HREF + CurrentMonth[i].id + " ' ><span class='list_now_biaoti'>" + CurrentMonth[i].title + "</span><span class='list_now_time'>" + CurrentMonth[i].addTime + "</span></a>"

                        };

                        html_01 += "</div>";

                        $('#ac_list_now').empty().append(html_01);

                        var html_02 = "";
                        html_02 += "<div>";
                        for(k = 0; k< OtherMonth.length; k++){

                         

                            html_02 += "<a  href=' " + HREF + OtherMonth[k].id + " '><span class='list_now_biaoti'>" + OtherMonth[k].title + "</span><span class='list_now_time'>" + OtherMonth[k].addTime + "</span></a>"

                        };

                        html_02 += "</div>";

                        $('#ac_list_ago').empty().append(html_02);

                    })
                    .fail(function(error){

                        util.tip("相应超时！");

                    }) ;
            },

            //公告列表标签切换
            '.ac_list_fenlei a click': function(element, event) {

                $('.ac_list_fenlei .list_fenlei_active').removeClass('list_fenlei_active');
                $(element).addClass('list_fenlei_active');

                var CUMMENT = $(element).index();

                $('.ac_list_name').eq(CUMMENT).show().siblings().hide();

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

