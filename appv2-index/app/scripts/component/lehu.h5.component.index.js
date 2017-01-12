define('lehu.h5.component.index', [
    'zepto',
    'can',
    'store',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'lehu.utils.busizutil',
    'slide'
    /*'imagelazyload'*/
],
    function($, can, store, LHConfig, util, LHAPI, LHHybrid,
             busizutil,
             slide, imagelazyload) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */

            init:function(){
                var that=this;
                this.initDate();
                setTimeout(function(){
                    that.sendRequests.apply(that);
                },0);
            },

            initDate : function(){
                var host = window.location.host;
                if (host.indexOf("http://") == -1) {
                    host = "http://" + host;
                }

                this.URL = host + "/hht/static/wap/";
                this.LURL = host + "/hht/mobile/";

                this.userId = busizutil.getUserId();

                store.set('user', this.userId)
            },

            sendRequests: function(){
                var that = this;
                var LHURL= that.LURL + "adList.ajax";

                var LHNEW= that.LURL + "notices.ajax";

                var api = new LHAPI({
                    url : LHURL,
                    data : {},
                    method : 'post'
                });

                var apil = new LHAPI({
                    url : LHNEW,
                    data : {},
                    method : 'post'
                });

                api.sendRequest()
                    .done(function(data){
                        var IMGURL;

                        //如果userId存在，则对URL进行Id拼接
                     //   if(that.userId){

                       //     IMGURL = that.URL + "detail.html?userid=" + that.userId + "&id=";

                      //  }
                      //  else {

                            IMGURL = that.URL + "detail.html?id=";

                      //  }
                        var GOODS = data.result;
                        var bannerList = GOODS.banner;
                        var html_01 = "";

                        html_01 += "<ul data-slide-ul='firstUl'>";

                        var i;
                        for ( i = 0 ; i < bannerList.length; i++)
                        {
                             
                                html_01 += " <li style='height:100%' data-ul-child='child'  class='slide-li swiper-slide' data-origin='" + bannerList[i].linkUrl + "'><img style='width:100%; height: 3.25rem;' src=' " + bannerList[i].picUrl + " '></li>";

                        };
                        html_01 += "</ul>";

                        html_01 += "<div class='focus-btn' data-small-btn='smallbtn'></div>";

                        $('#ajax_banner').empty().append(html_01);

                        localStorage.removeItem("html_01");
                        localStorage.html01 = html_01;

                        var slide = window.slide('.nbanner .swiper-container');
                        slide.init({
                            loop: true,
                            smallBtn: true,
                            autoPlay: true,
                            autoHeight: false,
                            playTime: 4000
                        });

                        var FLOOR = GOODS.floor;
                        var html_02 = "";
                        var k;
                        for( k = 0; k < FLOOR.length; k++)
                        { 
                            html_02 += "<div class='ntuijian cms-module-fillprice'><div class='ntuijian_ad'><a href='javascript:;'class='prommotionLayout_ad'><img class='lazyload' src= ' " + FLOOR[k].picUrl +" '><p class='ntuijian_ad_title' ><span >" + FLOOR[k].name + "</span><em >" + FLOOR[k].contenct + "</em></p></a><span class='triangle_ad'></span><span class='arrow_ad'><img src='images/goodsdetail/jiantou.png'></span></div><div class='ntuijian_main'><div class='swiper-container' style='-webkit-overflow-scrolling:touch'><div class='swiper-wrapper' style='-webkit-overflow-scrolling:touch'>";

                            var goodsList = FLOOR[k].goodslist ;

                            for (var h = 0; h < goodsList.length; h++)
                            {
                               
                                html_02 += " <a href='" + IMGURL + goodsList[h].linkUrl + "' class='swiper-slide prommotionLayout_detail'><img class='lazyload' src='" + goodsList[h].picUrl + "'></a>"

                            }

                            html_02 += "<a href='javascript:;' class='swiper-slide prommotionLayout_detail_more'><img class='lazyload' src='images/more.jpg'></a></div></div></div></div>";

                            html_02 += "<div class='nhr'></div>";

                          }

                           //本地存储 
                           $('#ajax_prommotionLayout').empty().append(html_02);

                           localStorage.removeItem("html_02");
                           localStorage.html02 = html_02;

                    })
                    .fail(function(error){
                        $(".ajax_noload").show();
                    });

                apil.sendRequest()
                    .done(function(data){

                        var NEWURL;

                        NEWURL = that.URL + "newsList.html";
                        var result = data.result;
                        var html_05 = "";
                        html_05 += "<ul>";
                        var i;
                        for( i = 0; i<result.length; i++){

                            html_05 += "<li><a href=' " + NEWURL + " '><span>" + result[i].title +"</span><em><i>|</i>详情</em></a></li>";

                        };
                        html_05 += "</ul>";

                        $('#ajax_news').empty().append(html_05);

                        localStorage.removeItem("hml05");
                        localStorage.html05 = html_05;
                    });

                //绑定信息滚动事件
                that.scrollZhongjiangjilu();

            },

            '.nbanner .swiper-slide click': function(element, event) {

                var that = this;

                var BANNERURL;
                //如果userId存在，则对URL进行Id拼接
                if(that.userId){

                    BANNERURL = that.URL + "detail.html?userid=" + that.userId + "&id=";
                }
                else {

                    BANNERURL = that.URL + "detail.html?id=";
                }
                var SORT = $(element).attr("data-origin");

                window.location.href = BANNERURL + SORT;
            },

            //商品页更多跳转
            ".ntuijian_ad,.prommotionLayout_detail_more click": function(element, event) {

                var jsonParams = {
                    'funName': 'promotion_more_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            scrollZhongjiangjilu: function() {
                /*信息滚动*/
                var $this = $(".news-msg-box");
                var scrollTimer = setInterval(function() {
                    scrollNews($this);
                }, 2000);

                function scrollNews(obj) {
                    var $self = obj.find("ul");
                    var lineHeight = $self.find("li").eq(0).height();
                    $self.animate({
                        "margin-top": -lineHeight + "px"
                    }, 400, function() {
                        $self.css({
                            "margin-top": "0px"
                        }).find("li:first").appendTo($self);
                    })
                };
            },


            //搜索入口
            ".nindex_sousuo click": function(element, event) {
                var jsonParams = {
                    'funName': 'search_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //消息入口
            ".nindex_xiaoxi click": function(element, event) {
                var jsonParams = {
                    'funName': 'message_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //重新加载入口
            '.ajax_noload click': function() {
                var jsonParams = {
                    'funName': 'reload_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //活动券入口
            '.ntag_coupon click': function() {
                var jsonParams = {
                    'funName': 'coupon_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //我的收藏入口
            '.ntag_like click': function() {
                var jsonParams = {
                    'funName': 'collect_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //我的订单入口
            '.ntag_order click': function() {
                var jsonParams = {
                    'funName': 'order_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            }
        });
    });
