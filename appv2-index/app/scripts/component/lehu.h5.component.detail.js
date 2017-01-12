define('lehu.h5.component.detail', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'lehu.utils.busizutil',
        'underscore',
        'swipe',
        //'imagelazyload',
        'text!template_components_detail'
    ],
    function($, can, LHConfig, util, LHAPI, LHHybrid, busizutil, _,
             Swipe, //imagelazyload,
             template_components_detail) {
        'use strict';

        return can.Control.extend({
            /**
             * @override
             * @description 初始化方法
             */
            init: function() {
                var that = this;
                this.initDate();
                var renderList = can.mustache(template_components_detail);
                var html = renderList(this.options);
                that.element.html(html);

                //页面渲染
                that.getGoodsDetailData.apply(that);

                //商品ID是否收藏
                that.collectGoods.apply(that);

            },

            initDate : function(){
                this.MINBUYNUM = "";
                this.PRICEWAY = "";
                this.GOODSSKUID = "";
                this.SHOPID = "";
                var host = window.location.host;
                if (host.indexOf("http://") == -1) {
                    host = "http://" + host;
                }

                this.URL = host + "/hht/static/wap/";
                this.LURL = host + "/hht/goods/";
                this.SCURL = host + "/m/collgood/";
                //获取用户ID
                this.userId = busizutil.getUserId();

                //获取页面GOODSID
                this.param = {};
                this.param = can.deparam(window.location.search.substr(1));
            },

            getGoodsDetailData: function() {
                var that = this;
                //商品详情页接口
                var LHURL = that.LURL + "viewAjax.ajax";
                //商品规格接口
                var GGURL = that.LURL + "goodSellSpecAjax.ajax";
                var api = new LHAPI({
                    url: LHURL,
                    data: {
                        id : that.param.id
                    },
                    method : 'post'
                });

                var apil = new LHAPI({
                    url : GGURL,
                    data : {
                        goodid : that.param.id
                    }
                });

                api.sendRequest()
                    .done(function(data) {
                        var goodsList = data;
                        that.SHOPID = goodsList.shopId;
                        that.GOODSSKUID = data.skuId;

                        //轮播图
                        var picList = goodsList.picList;
                        var GOODS_IMG_LIST = "";
                        var i;
                        for( i = 0; i<picList.length; i++){
                            GOODS_IMG_LIST += "<div class='swiper-slide'><img src=' " + picList[i].picUrl + " '></div>";
                        };
                        $('.swiper-wrapper').append(GOODS_IMG_LIST);

                        new Swipe($('.nwrapper_silder .swiper-container')[0], {
                            pagination: $('.swiper-pagination')[0],
                            disableScroll: false,
                            stopPropagation: false,
                            callback: function(index, elem) {
                            },
                            transitionEnd: function(index, elem) {}
                        });

                        //goods详情
                        var goodsDetail = "";
                        goodsDetail += "<span class='npost_direct'>";
                        var k;
                        for( k = 0; k<goodsList.goodsLableImageList.length; k++){
                            goodsDetail +="<em>" + goodsList.goodsLableImageList[k].label +"</em>";
                        };
                        goodsDetail += "</span><span class='npost_jieshao'> " + goodsList.name + "</span>";
                        $('.npost_titlel').append(goodsDetail);

                        //商品批发价和促销价格

                        var goodsPrice = "";
                        var goodsSale = "";

                        var n, h, j,l;

                        var GOODSSUBPRICELIST = goodsList.goodsSubPriceList;

                        if(goodsList.priceWay == "0")
                        {
                            that.PRICEWAY = "0";
                            that.MINBUYNUM = goodsList.goodsSubPriceList[0].startNum;
                            $('.number_btn_shumu').val(that.MINBUYNUM);

                            if (GOODSSUBPRICELIST) {
                                goodsPrice += "<p class='npost_price_shoujia'>";
                                for (n = 0; n < GOODSSUBPRICELIST.length - 1; n++) {
                                    goodsPrice += "<span class='price_shoujia_fc'><em>￥" + GOODSSUBPRICELIST[n].price + "</em><i>" + GOODSSUBPRICELIST[n].startNum + "-" + GOODSSUBPRICELIST[n].endNum + "件</i></span>";
                                }
                                var END = GOODSSUBPRICELIST.length - 1;
                                goodsPrice += "<span class='price_shoujia_fc'><em>￥" + GOODSSUBPRICELIST[END].price + "</em><i>≥" + GOODSSUBPRICELIST[END].startNum + "件</i></span>";
                                goodsPrice += "</p>";
                                goodsSale += "<table class='goods_jieti' cellpadding='0'> <tr class='goods_jieti_jiage'><td class='table_btl'>原价</td> ";
                                for( h = 0; h<GOODSSUBPRICELIST.length ; h++){
                                    goodsSale += "<td class='goods_jieti_yuanjia'>" + GOODSSUBPRICELIST[h].price + "</td>";
                                }
                                goodsSale += "</tr>";
                                goodsSale += "<tr class='goods_jieti_single'><td class='table_btl'>单品促销价</td><td class='jieti_single_cuxiao'></td>"
                                for ( l = 0 ; l < GOODSSUBPRICELIST.length - 1 ; l ++){
                                    goodsSale += "<td></td>";
                                }
                                goodsSale += "</tr>";
                                goodsSale += "<tr class='goods_jieti_btw'><td class='table_btl'>区间</td>";
                                for( j = 0; j<GOODSSUBPRICELIST.length - 1 ; j++){
                                    goodsSale += "<td>" + GOODSSUBPRICELIST[j].startNum+ "-" + GOODSSUBPRICELIST[j].endNum  + "</td>";
                                }
                                goodsSale += "<td>≥" + GOODSSUBPRICELIST[END].startNum + "</td>"
                                goodsSale += "</tr></table>";
                                goodsSale +="<p class='goods_jieti_acy'><span class='jiage_time'></span></p>";
                            }
                        }
                        if(goodsList.priceWay == "1"){
                            that.PRICEWAY = "1";
                            that.MINBUYNUM = goodsList.minBuyNum;
                            $('.number_btn_shumu').val(that.MINBUYNUM);
                            if(goodsList.salePriceTwo) {

                                var GOODSSALE;
                                var PRICELE = String(goodsList.salePriceTwo).split(',');

                                if( parseInt(PRICELE[0]) == parseInt(PRICELE[1])){
                                    GOODSSALE = PRICELE[0];
                                }else {
                                    GOODSSALE = goodsList.salePriceTwo.replace(/,/g, "-");
                                }

                                goodsPrice += "<p class='npost_price_guige'><span class='price_guige_fc'><em>￥" + GOODSSALE + "</em><i>" + goodsList.minBuyNum + "件起批</i></span></p>";
                                goodsSale += " <p class='goods_jiage_canshu'><span class='jiage_ago'>原价&nbsp;:&nbsp;<em style='color: #ff2d2d' class='jiage_canshu_price'>" + GOODSSALE + "</em></span><span class='jiage_cuxiao'></span><span class='jiage_guige'></span><span class='jiage_time'></span></p>";
                            }
                        }

                        $('.facations_shuliang').html(that.MINBUYNUM);
                        $('.npost_price').empty().append(goodsPrice);
                        $('.goods_jiage').empty().append(goodsSale);

                        //购物车弹出层中的商品介绍和商品库存

                        var goodsIntroduction = "";
                        goodsIntroduction += "<span class='goods_introduction_ph'><img src=' " + goodsList.picUrl +" '></span><span class='goods_introduction_title'><em class='introduction_title_tp'>" + goodsList.name + "</em></span><span class='goods_introduction_close'></span>";
                        $('.goods_introduction').append(goodsIntroduction);
                        var cukun = goodsList.count
                        $('.number_btn_cukun em').append(cukun);

                        //商品详情页

                        var goodssall = goodsList.goodsinfopc;
                        $('#goodsInfor').empty().append(goodssall);

                        //给商品增加商品id和商品skuId属性

                        $('.npost_fications').attr({
                            'data-id' : goodsList.id,
                            'data-skuid' : goodsList.skuId
                        });

                    })
                    .fail(function(error){
                        util.tip("响应超时！请重新下拉刷新。",1000);
                    });

                //商品规格层
                apil.sendRequest()
                    .done(function(data){
                        var k;
                        var html = "";
                        for( k = 0; k < data.length; k ++)
                        {
                            html += "<div class='goods_detail_guige' id='goods_attr" + k + "'>";
                            var GUIGR = data[k];
                            var RONGLIANG = GUIGR.attval;
                            var i;
                            html += "<h1>" + GUIGR.attname + "</h1>";
                            for (i = 0; i < RONGLIANG.length; i++) {
                                html += "<button type='button' data-attr= '" + RONGLIANG[i].id + "' data-attid = ' " + RONGLIANG[i].attid + "' id= '" + RONGLIANG[i].attid+ RONGLIANG[i].id + "'>" + RONGLIANG[i].attValContent + "</button>";
                            }
                            html += "</div>";
                        }
                        $('.goods_detail').empty().append(html);
                    })
                    .fail(function(error){
                        util.tip("响应超时！请重新下拉刷新。",1000);
                    })

            },

           // 商品、详情、评价页面切换
            ".tabs a click": function(element, event) {
                $(window).scrollTop(0);
                $(".tabs .active").removeClass('active');
                element.addClass('active');
                var currentdetail = $(".nwrapper_silder").eq(element.index());
                $(currentdetail).show().siblings().hide();

                if(element.index() == 2){
                    $(window).scrollTop(0);
                    this.sendRequest();
                }
            },

            sendRequest:function(action){
                var that = this;
                var PLURL = that.LURL + "appraiseAjax.ajax";
                var api = new LHAPI({
                    url :  PLURL,
                    data : {
                        id : that.param.id
                    },
                    method : 'post'
                });
                api.sendRequest()
                    .done(function(data){
                        var goodsPinglun = data.result;
                        var pinglun = "";
                        pinglun += "<span class='active'>全部评价</br>" + goodsPinglun.appraisesCount +"</span><span>好评</br><em>" + goodsPinglun.large + "</em></span><span>中评</br><em>" + goodsPinglun.middle + "</em></span><span>差评</br><em>" + goodsPinglun.low + "</em></span>";
                        $('.ncomment_top').empty().append(pinglun);

                        //评论数量
                        var appraiseList = goodsPinglun.appraiseList.rows;
                        var PINGLUNLIST = "";
                        var i, k;
                        for( i = 0; i<appraiseList.length; i++){
                            PINGLUNLIST += "<div class='npost_pinglun_box'>";
                            PINGLUNLIST += "<div class='nhr'></div>";
                            PINGLUNLIST +="<div class='pinglun_box'>";
                            PINGLUNLIST += "<span class='real-star'><img src='images/goodsdetailtouxiang.png'><em class='ee'>" + appraiseList[i].evaluateUser + "</em></span><span class='npost_pinglun_msg'>" + appraiseList[i].evaluateTime + "</span>";
                            PINGLUNLIST += "</div>";
                            PINGLUNLIST += " <div class='npost_pinglun_text'>";
                            PINGLUNLIST += "<div class='pinglun_text_xing'>";

                            for( k = 0; k<appraiseList[i].evaluateLevel; k++){
                                PINGLUNLIST += "<img src='images/xing.png'>";
                            };

                            PINGLUNLIST += "</div>";
                            PINGLUNLIST += "<div class='pinglun_text_npost'>" + appraiseList[i].content + "</div>";
                            PINGLUNLIST += "<div class='pinglun_text_photo'>";

                            if(appraiseList[i].pic1){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic1 + " '></a>";
                            };

                            if(appraiseList[i].pic2){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic2 + " '></a>";
                            };

                            if(appraiseList[i].pic3){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic3 + " '></a>";
                            };

                            if(appraiseList[i].pic4){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic4 + " '></a>";
                            };

                            if(appraiseList[i].pic5){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic5 + " '></a>";
                            };

                            PINGLUNLIST += "</div>";
                            if(appraiseList[i].shopReplyContent){
                                PINGLUNLIST += "<div class='npost_pinglun_tiame'>";
                                PINGLUNLIST += "商家回复：<span>" + appraiseList[i].shopReplyContent +"</span>";
                                PINGLUNLIST += "</div>";
                            }
                            PINGLUNLIST += "</div></div>";
                            };
                        $('.ncomment_list').empty().append(PINGLUNLIST);
                    })
            },

            //切换评论
            '.ncomment_top span click': function(element,event){
                var that = this;
                $(".ncomment_top .active").removeClass('active');
                element.addClass('active');
                var Index = element.index();
                var PLURL = that.LURL + "appraiseAjax.ajax";
                if(Index == 0){
                    var api = new  LHAPI({
                        url : PLURL,
                        data : {
                            id : that.param.id
                        },
                        method : 'post'
                    })
                }
                else {
                    var api = new  LHAPI({
                        url : PLURL,
                        data : {
                            appraiceStatus : Index,
                            id : that.param.id
                        },
                        method : 'post'
                    })
                }

                api.sendRequest()
                    .done(function(data){
                        var goodsPinglun = data.result;
                        //评论数量
                        var appraiseList = goodsPinglun.appraiseList.rows;
                        var PINGLUNLIST = "";
                        var i, k;
                        for( i = 0; i<appraiseList.length; i++){
                            PINGLUNLIST += "<div class='npost_pinglun_box'>";
                            PINGLUNLIST += "<div class='nhr'></div>";
                            PINGLUNLIST +="<div class='pinglun_box'>";
                            PINGLUNLIST += "<span class='real-star'><img src='images/goodsdetailtouxiang.png'><em class='ee'>" + appraiseList[i].evaluateUser + "</em></span><span class='npost_pinglun_msg'>" + appraiseList[i].evaluateTime + "</span>";
                            PINGLUNLIST += "</div>";
                            PINGLUNLIST += " <div class='npost_pinglun_text'>";
                            PINGLUNLIST += "<div class='pinglun_text_xing'>";

                            for( k = 0; k<appraiseList[i].evaluateLevel; k++){
                                PINGLUNLIST += "<img src='images/xing.png'>";
                            };

                            PINGLUNLIST += "</div>";
                            PINGLUNLIST += "<div class='pinglun_text_npost'>" + appraiseList[i].content + "</div>";
                            PINGLUNLIST += "<div class='pinglun_text_photo'>";

                            if(appraiseList[i].pic1){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic1 + " '></a>";
                            };

                            if(appraiseList[i].pic2){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic2 + " '></a>";
                            };

                            if(appraiseList[i].pic3){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic3 + " '></a>";
                            };

                            if(appraiseList[i].pic4){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic4 + " '></a>";
                            };

                            if(appraiseList[i].pic5){
                                PINGLUNLIST += "<a href='javascript:;'><img src=' " + appraiseList[i].pic5 + " '></a>";
                            };

                            PINGLUNLIST += "</div>";

                            if(appraiseList[i].shopReplyContent){
                                PINGLUNLIST += "<div class='npost_pinglun_tiame'>";
                                PINGLUNLIST += "商家回复：<span>" + appraiseList[i].shopReplyContent +"</span>";
                                PINGLUNLIST += "</div>";
                            }

                            PINGLUNLIST += "</div>";
                            PINGLUNLIST += "</div>";
                        };
                        $('.ncomment_list').empty().append(PINGLUNLIST);
                    }).
                    fail(function(error){
                       util.tip("加载错误！",2000)
                })
            },

            //点击进入商品详情页
            '.npost_switch click':function(){
                $(".tabs .active").removeClass('active');
                $('.tabs a').eq(1).addClass('active');
                $(".nwrapper_silder").eq(1).show().siblings().hide();
                $(window).scrollTop(0);
            },

            //规格页面的隐藏与显示
            '.npost_fications click':function(element,event){

            },

            '.goods_introduction_close click':function(){
                $('.gouwu').hide();
            },

            //选择规格属性
            '.goods_detail_guige button click' :function(element,event){

                var gghs = 0;
                var allDate = {};
                var p = 0;
                if($(element).hasClass('active_guige')){
                    var check = 0;
                    var gg = $(".goods_detail_guige").length;
                    var allDate = {
                        'goodsId' : $('.npost_fications ').attr('data-id'),
                        'attValList[0].attid' : $(element).attr("data-attid"),
                        "attValList[0].id": $(element).attr("data-attr"),
                        "attValList[0].goodsId" : 0
                    }
                    $(element).removeClass();
                    this.getAttrbuite(allDate, check);
                    return false;
                }
               else {
                    $(element).closest("div").find("button").each(function (index, item) {
                        $(item).removeClass("active_guige");
                    });
                    $(element).removeClass().addClass("active_guige");
                }

                allDate["goodsId"] = $('.npost_fications ').attr('data-id');

                var list = {};
                var gg = $(".goods_detail_guige").length;
                $(".goods_detail_guige").each(function (i, item) {
                    $(item).find("button").each(function (j, itemt) {
                        if ($(itemt).hasClass('active_guige')) {
                            ++gghs
                            allDate["attValList[" + p + "].attid"] = $(itemt).attr("data-attid");
                            allDate["attValList[" + p + "].id"] = $(itemt).attr("data-attr");
                            allDate["attValList[" + p + "].goodsId"] = p;
                            p++
                        }
                    })
                })
                if (gghs == gg) {
                    //根据选中的规格获取报价详细信息及活动与否
                    this.getSkusDetailByAtts(list, allDate);
                }
                if (gghs == 1 || gg == 2) {
                    allDate = {
                        'goodsId' : $('.npost_fications ').attr('data-id'),
                        "attValList[0].attid": $(element).attr("data-attid"),
                        "attValList[0].id": $(element).attr("data-attr"),
                        "attValList[0].goodsId": "0"
                    };
                }//禁用未启用的规格商品
                this.getAttrbuite(allDate, 1);

            },

            //禁用未启用的规格商品
            getAttrbuite : function(allDate, check){
                var that = this;
                var STOPURL = that.LURL + "getAttsByAtts.ajax";
                var api = new LHAPI({
                    url : STOPURL,
                    data : allDate,
                    method : 'post'
                })
                api.sendRequest()
                    .done(function(data){
                        console.log(data);
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].isUsed == '0' && check == 1) {
                                $("#" + data[i].attid + data[i].id).attr("disabled","true");
                                $("#" + data[i].attid + data[i].id).css("color", "#DEDEDE").css("border", "1px dashed #DEDEDE").attr("check", "1");
                            } else if (data[i].isUsed == '1' && check == 1) {
                                if ($("#" + data[i].attid + data[i].id).attr("check") == "1") {
                                    $("#" + data[i].attid + data[i].id).removeAttr("disabled");
                                    $("#" + data[i].attid + data[i].id).css("color", "").css("border", "").attr("check", "0");
                                }
                            } else if (check == 0 && data[i].isUsed == '0') {
                                if ($("#" + data[i].attid + data[i].id).attr("check") == "1") {
                                    $("#" + data[i].attid + data[i].id).removeAttr("disabled");
                                    $("#" + data[i].attid + data[i].id).css("color", "").css("border", "").attr("check", "0");
                                }
                            }
                        }
                    })
                    .fail(function(error){
                    })

            },

            //根据选中的规格获取报价详细信息及活动与否
            getSkusDetailByAtts : function(list, allDate){
                var that = this;
                var SALEURL = that.LURL + "getSalePrice.ajax";
                var api = new LHAPI({
                    url : SALEURL,
                    data : allDate,
                    method : 'post'
                })
                api.sendRequest()
                    .done(function(data){

                        that.GOODSSKUID = data.skuId;

                         //库存
                        $(".number_btn_cukun em").html(data.kucun);

                        //var SALEPRICE = parseFloat(data.salePrice);
                       // var OLDPRICE = parseFloat(data.oldPrice);

                        if(that.PRICEWAY == "0"){

                           // if(SALEPRICE < OLDPRICE || SALEPRICE == OLDPRICE){

                                if (data.goodscommodity != null && data.goodscommodity != "") {

                                    $('.goods_jieti_yuanjia').css({
                                        "color": "#999999",
                                        "text-decoration": "line-through"
                                    })

                                    $('.jieti_single_cuxiao').html(data.goodscommodity.cxPrice);

                                    var TIMT = "活动结束时间&nbsp;:<em>" + data.goodscommodity.cxEnTime + "</em><em>价格为&nbsp;:<i>" + data.goodscommodity.cxPrice + "</i></em>"

                                    $('.jiage_time').show().html(TIMT).css({"display": "block"});
                                }
                          //  }
                            else {
                                $('.goods_jieti_yuanjia').css({

                                    "color": "#ff2d2d",
                                    "text-decoration": "none"

                                });
                                $('.jieti_single_cuxiao').html("");
                                $('.jiage_time').html("").hide();

                            }

                        }
                        if (that.PRICEWAY == "1") {

                           // if (SALEPRICE < OLDPRICE || SALEPRICE == OLDPRICE) {

                                if (data.goodscommodity != null && data.goodscommodity != "") {

                                    $('.jiage_canshu_price').html(data.oldPrice).css({
                                        "color": "#999999",
                                        "text-decoration": "line-through"
                                    })

                                    $('.jiage_cuxiao').show().html("促销价&nbsp;:<em>" + data.salePrice + "</em>").css({"display": "block"});

                                    var TIMT = "活动结束时间&nbsp;:<em>" + data.goodscommodity.cxEnTime + "</em><em>价格为&nbsp;:<i>" + data.goodscommodity.cxPrice + "</i></em>"

                                    $('.jiage_time').show().html(TIMT).css({"display": "block"});
                                }

                          //  }
                            else {

                                $('.jiage_canshu_price').html(data.oldPrice).css({

                                    "color": "#ff2d2d",
                                    "text-decoration": "none"

                                });
                                $('.jiage_cuxiao').html("").hide();
                                $('.jiage_time').html("").hide();
                            }
                        }
                    })
                    .fail(function(error){

                    })
            },

            //商品数量加减
            '.number_btn_jian click':function(){
                var that = this;
                var shuliang = parseInt($('.number_btn_shumu').val());
                if( shuliang == parseInt(that.MINBUYNUM) ){
                    util.tip("您所填写的商品数量超过库存!",1000);
                    $('.number_btn_shumu').val(that.MINBUYNUM);
                    $('.facations_shuliang').text(shuliang);
                    return false;
                }
                shuliang = shuliang - 1;
                $('.number_btn_shumu').val(shuliang);
                $('.facations_shuliang').text(shuliang);
            },

            '.number_btn_jia click':function(){
                var shuliang = parseInt($('.number_btn_shumu').val());
                shuliang = shuliang + 1;
                var kucun = parseInt($('.number_btn_cukun em').text());
                if( shuliang > kucun){
                    util.tip("您所填写的商品数量超过库存!",1000);
                    return false;
                }
                $('.number_btn_shumu').val(shuliang);
                $('.facations_shuliang').text(shuliang);
            },

            '.number_btn_shumu change' : function(element,event){

                var shuliang = parseInt($('.number_btn_shumu').val());
                var kucun = parseInt($('.number_btn_cukun em').text());
                $('.facations_shuliang').html(shuliang );

                if($('.number_btn_shumu').val() == ""){

                    $('.number_btn_shumu').val("1");
                    $('.facations_shuliang').text("1");
                }
                if(shuliang > kucun){

                    util.tip("您所填写的商品数量超过库存!",1000);
                    $('.number_btn_shumu').val("1");
                    return false;
                }
            },

            //返回
            '.back click': function() {

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

            //分享入口
            //'.share click': function() {
            //
            //    var param = can.deparam(window.location.search.substr(1));
            //    var Href = window.location.href;
            //
            //    var jsonParams = {
            //
            //    }
            //    LHHybrid.nativeFun(jsonParams);
            //},

            //客服
            '.npost_foot_kefu click': function() {

                var jsonParams = {
                    'funName': 'customer_service_fun',
                    'params': {
                        'servicePhone' : '4001003762'
                    }
                };

                LHHybrid.nativeFun(jsonParams);

            },

            //收藏
            '.npost_foot_shouchang click': function(element,event) {
              
                var that = this;

                //收藏接口
                var SHOUURL = that.LURL + "collectionAjax.ajax";
                //取消收藏接口
                var NOSHOUURL = that.SCURL + "deleteCollection.ajax";
                //判断用户是否登录
                if(!that.userId){
                    var jsonParams = {
                        'funName': 'login_fun',
                        'params': {}
                    };

                    LHHybrid.nativeFun(jsonParams);
                    return false;

                };

                if( $(element).find('.btm-act-icn').hasClass('btm-active')){
                    /*var api = new  LHAPI({
                        url : NOSHOUURL,
                        data : {
                            token : that.userId,
                            APPChanel : "APP",
                            id : that.param.id
                        },
                        method : 'post'
                    });

                    api.sendRequest()
                        .done(function(data){
                        
                            if(data.code == 10000){
                                $(element).find('.btm-act-icn').removeClass('btm-active');

                                util.tip("已取消收藏！",1000);
                            }
                        })
                        .fail(function(error){
                            console.log("系统错误！");

                        });*/
                    util.tip("您已收藏",2000);
                    return false;
                }

                else{

                    var api = new LHAPI({
                        url : SHOUURL,
                        data : {
                            token : that.userId,
                            APPChanel : "APP",
                            goodsId : that.param.id
                        },
                        method : 'post'
                    });

                    api.sendRequest()
                        .done(function(data){
                            if(data.code == 2000){ 
                               $(element).find('.btm-act-icn').addClass('btm-active');
                               util.tip("收藏成功！",1000);
                                return false;
                            }
                        })
                        .fail(function(error){

                            console.log("系统错误！");
                        });
                }
            },

            //判断用户是否已收藏商品
            collectGoods : function(){
                var that = this;
                var SCOURL = that.LURL + "collectionAjax.ajax";
                if(that.userId){
                    var api = new LHAPI({
                        url : SCOURL,
                        data : {
                            token: that.userId,
                            APPChanel : "APP",
                            goodsId : that.param.id
                        },
                        method : 'post'
                        });
                    api.sendRequest()
                        .done(function(data){
                            if(data.code == 2000){
                                $('.btm-act-icn').addClass('btm-active');  

                            }

                        })
                        .fail(function(error){

                            console.log("系统错误！");
                        })

                }
           

            },

            //加入进货单
            '#nadd_cart click': function() {

                var that = this;
                var AMOUNT = $('.facations_shuliang').html();
                //判断用户是否登录
                if(!that.userId){
                    var jsonParams = {
                        'funName': 'login_fun',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                    return false;
                };

                //判断商品数量是否大于起批数量
                if(AMOUNT == "") {
                    util.tip("数量需大于等于起批量!", 2000);
                    return false;
                }

                if (parseInt(AMOUNT) < parseInt(that.MINBUYNUM)) {

                    util.tip("数量需大于等于起批量!", 2000)
                    return false;
                }

                //判断是否勾选商品属性
                var gghs = 0;
                var gg = $(".goods_detail_guige").length;
                $(".goods_detail_guige").each(function (i, item) {
                    $(item).find("button").each(function (j, itemt) {
                        if ($(itemt).hasClass('active_guige')) {
                            ++gghs
                        }
                    })

                })
                if (gghs != gg) {

                    util.tip("需勾选商品属性!",2000)
                    return false;
                }

                var JHTURL = that.LURL + "cartAjax.ajax";

                var api = new LHAPI({
                    url: JHTURL,
                    data: {
                        goodsId : that.param.id,
                        goodsSkuId : that.GOODSSKUID,
                        amount : AMOUNT,
                        shopId : that.SHOPID,
                        token : that.userId,
                        APPChanel : "APP",
                    },
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data){
                      
                        if(data.code == 1000){
                            util.tip(data.msg);
                        }
                        if(data.code == 2000){
                            util.tip("已成功加入购物车!")
                        }
                    })
                    .fail(function(error){
                           util.tip("未能加入购物车!");
                    });

                if( $('.gouwu').css("display") == "block"){
                    $('.gouwu').hide();
                }
            },

            //马上结算
            '.npost_foot_go click': function() {

                var that = this;

                var AMOUNT = $('.facations_shuliang').html();
                var JHTURL = that.LURL + "cartAjax.ajax";
                //判断用户是否登录
                if(!that.userId){
                    var jsonParams = {
                        'funName': 'login_fun',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                    return false;
                };

                //判断商品数量是否大于起批数量
                if(AMOUNT == "") {
                    util.tip("数量需大于等于起批量!", 2000);
                    return false;
                }

                if (parseInt(AMOUNT) < parseInt(that.MINBUYNUM)) {

                    util.tip("数量需大于等于起批量!", 2000)
                    return false;
                }

                //判断是否勾选商品属性
                var gghs = 0;
                var gg = $(".goods_detail_guige").length;
                $(".goods_detail_guige").each(function (i, item) {
                    $(item).find("button").each(function (j, itemt) {
                        if ($(itemt).hasClass('active_guige')) {
                            ++gghs
                        }
                    })

                })
                if (gghs != gg) {

                    util.tip("需勾选商品属性!",2000)
                    return false;
                }

                var api = new LHAPI({
                    url: JHTURL,
                    data: {
                        goodsId : that.param.id,
                        goodsSkuId : that.GOODSSKUID,
                        amount : AMOUNT,
                        shopId : that.SHOPID,
                        token : that.userId,
                        APPChanel : "APP",
                    },
                     method: 'post'
                });
                api.sendRequest()
                    .done(function(data){
                        if(data.code == 1000){
                            util.tip(data.msg);
                        }
                        if(data.code == 2000){
                            //登录取userId 和  GoodsID  调native
                            var jsonParams = {
                                'funName': 'shopping_buy_fun',
                                'params': {}
                            };
                            LHHybrid.nativeFun(jsonParams);
                        }
                    })
                    .fail(function(error){
                        util.tip("服务器繁忙，请重新进入页面！");
                    })

            },

            //lazyload: function() {
            //    $('.lazyload').picLazyLoad({
            //        threshold: 400
            //    });
            //}
        });
    });