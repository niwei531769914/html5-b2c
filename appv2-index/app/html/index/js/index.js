
define('lehu.h5.component.index', [
        'zepto',
        'can',
        'store',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',

        'lehu.utils.busizutil',

        // 'swiper',
        'slide',
        'imagelazyload'
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

            init: function() {
                var that = this;
                this.juli = null;
                this.shengyu = null;
                this.initData();
                setTimeout(function() {
                    that.sendRequest.apply(that);
                }, 0);
                //this.shouldShowCoupon();
            },

            shouldShowCoupon: function() {
                var that = this;
                var activeIds = $(".index_popup_box_get").attr("data-acitveIds");

                this.userId = busizutil.getUserId();
                if (!this.userId) {
                    $(".index_popup").show();
                    this.bindEvent();
                    return false;
                }
                this.param = {
                    "userId": this.userId,
                    "acitveIds": activeIds
                };
                busizutil.encription(this.param);
                var api = new LHAPI({
                    url: this.URL.SERVER_URL + "judgeLHTicketReceived.do",
                    data: this.param,
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        if (data.hasReceived) {
                            $(".index_popup").hide();
                        } else {
                            $(".index_popup").show();
                            that.bindEvent();
                        }
                    })
                    .fail(function(error) {
                        // util.tip(error.msg);
                    });
            },

            bindEvent: function() {
                var that = this;

                $('.index_popup_box_close').on('click', function() {
                    $(".index_popup").hide();
                });

                $('.index_popup_box_get')[0].onclick = function() {
                    if ($(".index_popup_box_get").hasClass("disabled")) {
                        return false;
                    }
                    $(".index_popup_box_get").addClass("disabled");
                    that.getCoupon();
                };
            },

            getCoupon: function() {
                var activeIds = $(".index_popup_box_get").attr("data-acitveIds");

                var param = can.deparam(window.location.search.substr(1));
                this.userId = busizutil.getUserId();
                if (!this.userId) {
                    $(".index_popup_box_get").removeClass("disabled");
                    if (util.isMobile.WeChat()) {
                        location.href = "login.html?from=index.html";
                        return false;
                    } else {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {
                                "backurl": "index"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);

                        return false;
                    }
                }

                var that = this;

                this.param = {
                    "userId": this.userId,
                    "acitveIds": activeIds
                };

                busizutil.encription(this.param);
                var api = new LHAPI({
                    url: this.URL.SERVER_URL + "getMultipleLHTicket.do",
                    data: this.param,
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        $(".index_popup_box_get").removeClass("disabled");
                        $(".index_popup").hide();
                        util.tip(data.msg);
                    })
                    .fail(function(error) {
                        $(".index_popup_box_get").removeClass("disabled");
                        $(".index_popup").hide();
                        util.tip(error.msg);
                    });
            },

            sendRequest: function() {
                var that = this;
                var api = new LHAPI({
                    url: this.URL.SERVER_URL + LHConfig.setting.action.appNewIndexFirst,
                    data: {}
                });
                api.sendRequest()
                    .done(function(data) {
                        // 设置数据类型
                        $("html").attr("data_type", data.type);

                        // 渲染幻灯片
                        that.renderBannerList(data);

                        // 渲染标签
                        that.renderTagList(data);

                        // 渲染秒杀
                        that.renderSecondkillList(data);

                        // 渲染首页广告列表
                      /*  that.renderHotRecommendation(data);*/

                        // 楼层
                        that.renderProductList(data);

                        // 发现
                        // that.renderDiscovery(data);

                        // 绑定滚动事件
                        that.bindScroll();

                        // 执行倒计时
                      /*  that.timer = setInterval(function() {
                            that.countDown();
                        }, 1000);*/

                       /* that.doOther(data);*/
                    })
                    .fail(function(error) {
                        $(".ajax_noload").show();
                    })
            },

            /*doOther: function(data) {
                //加载_400电话
                var hotline = data.hotline;
                var jsonParams = {
                    'funName': 'set_hotline_fun',
                    'params': {
                        'hotline': hotline
                    }
                };

                try {
                    LHHybrid.nativeFun(jsonParams);
                } catch (e) {}

                setTimeout(function() {
                    var lazyload = $(".lazyload");
                    _.each(lazyload, function(item) {
                        $(item).attr('src', $(item).attr('data-original'));
                    })
                }, 100);

                //删除拼团的storeindex
                store.remove("groupselectedindex");
            },*/

            initData: function() {
                this.URL = LHHybrid.getUrl();
            },

            lazyload: function() {
                if ($('.lazyload').length == 0) {
                    return false;
                }
                $('.lazyload').picLazyLoad({
                    threshold: 400
                });
            },

            //扫描
            ".nindex_shaomiao click": function(element, event) {
                var jsonParams = {
                    'funName': 'scan_code_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //消息
            ".nindex_xiaoxi click": function(element, event) {
                var jsonParams = {
                    'funName': 'message_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //搜索
            ".nindex_sousuo click": function(element, event) {
                var jsonParams = {
                    'funName': 'search_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            ".nmiaosha_top a click": function(element, event) {
                var title = element.attr("data-title");
                var url = element.attr("data-url");
                var jsonParams = {
                    'funName': 'seckill_more_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            renderBannerList: function(data) {

                var width = $(".nwrapper").width();
                //this.URL.IMAGE_URL
                var html = "<ul data-slide-ul='firstUl'>";
                var bannerList = data.bannerList;
                for (var k = 0; k < bannerList.length; k++) {
                    html += "<li style='height:100%' data-ul-child='child'  class='slide-li swiper-slide' data-SORT='" + bannerList[k]['SORT'] + "' data-BANNER_JUMP_ID='" + bannerList[k]['BANNER_JUMP_ID'] + "' data-BANNER_CONTENT='" + bannerList[k]['BANNER_CONTENT'] + "' data-BANNER_IMG='" + bannerList[k]['BANNER_IMG'] + "' data-ID='" + bannerList[k]['ID'] + "' data-BANNER_LAYOUT='" + bannerList[k]['BANNER_LAYOUT'] + "' data-BANNER_JUMP_FLAG='" + bannerList[k]['BANNER_JUMP_FLAG'] + "' data-STATUS='" + bannerList[k]['STATUS'] + "' data-NUM='" + bannerList[k]['NUM'] + "' data-BANNER_NAME='" + bannerList[k]['BANNER_NAME'] + "'>";
                    html += "<img style='width:100%; height: 4rem;' src=" + this.URL.IMAGE_URL + bannerList[k]['BANNER_IMG'] + " >";
                    html += "</li>";
                }
                html += "</ul>";

                html += '<div class="focus-btn" data-small-btn="smallbtn"></div>'

                $("#ajax_banner").empty().append(html);

                // var swiper = new Swiper('.nbanner .swiper-container', {
                //   pagination: '.nbanner .swiper-pagination',
                //   autoplay: 4000,
                //   autoplayDisableOnInteraction: false,
                //   speed: 300,
                //   loop: true,
                //   longSwipesRatio: 0.1
                // });

                var slide = window.slide('.nbanner .swiper-container');
                slide.init({
                    loop: true,
                    smallBtn: true,
                    autoPlay: true,
                    autoHeight: false,
                    playTime: 4000
                });

                localStorage.removeItem("html01");
                localStorage.html01 = html;
            },

            '.nbanner .swiper-slide click': function(element, event) {
                var SORT = $(element).attr("data-SORT");
                var BANNER_JUMP_ID = $(element).attr("data-BANNER_JUMP_ID");
                var BANNER_CONTENT = $(element).attr("data-BANNER_CONTENT");
                var BANNER_IMG = $(element).attr("data-BANNER_IMG");
                var ID = $(element).attr("data-ID");
                var BANNER_LAYOUT = $(element).attr("data-BANNER_LAYOUT");
                var BANNER_JUMP_FLAG = $(element).attr("data-BANNER_JUMP_FLAG");
                var STATUS = $(element).attr("data-STATUS");
                var NUM = $(element).attr("data-NUM");
                var BANNER_NAME = $(element).attr("data-BANNER_NAME");

                // if (BANNER_CONTENT && BANNER_CONTENT.startsWith("http://") && BANNER_CONTENT.endsWith(".html")) {
                // alert(BANNER_CONTENT);
                if (BANNER_CONTENT && BANNER_CONTENT.indexOf("http://") > -1 && BANNER_CONTENT.indexOf(".html") > -1) {
                    // alert("inner");
                    window.location.href = BANNER_CONTENT;

                    return false;
                } else {
                    var jsonParams = {
                        'funName': 'banner_item_fun',
                        'params': {
                            'SORT': SORT,
                            'BANNER_JUMP_ID': BANNER_JUMP_ID,
                            'BANNER_CONTENT': BANNER_CONTENT,
                            'BANNER_IMG': BANNER_IMG,
                            'ID': ID,
                            'BANNER_LAYOUT': BANNER_LAYOUT,
                            'BANNER_JUMP_FLAG': BANNER_JUMP_FLAG,
                            'STATUS': STATUS,
                            'NUM': NUM,
                            'BANNER_NAME': BANNER_NAME
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                }
            },

            renderTagList: function(data) {
                var fastList_html = "";
                var fastList = data.fastList;

                for (var k = 0; k < fastList.length; k++) {

                    fastList_html += "<a href='javascript:;' data-FAST_NAME='" + fastList[k]['FAST_NAME'] + "' data-ID='" + fastList[k]['ID'] + "' data-LINK_NAME='" + fastList[k]['LINK_NAME'] + "' data-FAST_IMG='" + fastList[k]['FAST_IMG'] + "'>";
                    fastList_html += "<img class='lazyload' data-original=" + this.URL.IMAGE_URL + fastList[k]['FAST_IMG'] + " >";
                    fastList_html += "<span>" + fastList[k]['FAST_NAME'] + "</span>";
                    fastList_html += "</a>";
                }

                localStorage.removeItem("html02");
                localStorage.html02 = fastList_html;

                $("#ajax_fastList").empty().append(fastList_html);
                // this.lazyload();
            },

            ".ntag a click": function(element, event) {
                var FAST_NAME = $(element).attr("data-FAST_NAME");
                var ID = $(element).attr("data-ID");
                var LINK_NAME = $(element).attr("data-LINK_NAME");
                var FAST_IMG = $(element).attr("data-FAST_IMG");

                var clickedTag = this.tagMap[ID];
                if (clickedTag) {
                    var type = clickedTag.type;
                    if (type == 'h5') {
                        window.location.href = clickedTag.url;
                        return false;
                    } else if (type == 'h5null') {
                        util.tip("全新抽奖即将上线，敬请期待!");
                        return false;
                    } else if (type == 'native') {
                        var jsonParams = {
                            'funName': 'shortcut_fun',
                            'params': {
                                'FAST_NAME': FAST_NAME,
                                'dID': ID,
                                'LINK_NAME': LINK_NAME,
                                'FAST_IMG': FAST_IMG
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    } else if (type == 'nativehongbao') {
                        var jsonParams = {
                            'funName': 'promotion_more_fun',
                            'params': {
                                'id': '642',
                                'promotion_name': '红包商品专区',
                                'detail_layout': '2'
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    } else {
                        //其他类型不支持点击
                        return false;
                    }
                }
            },

            tagMap: {
                "17": {
                    type: "h5",
                    name: "大转盘",
                    url: 'carousel.html'
                },
                "22": {
                    type: "native",
                    name: "免费试用"
                },
                "25": {
                    type: "native",
                    name: "每日签到"
                },
                "6": {
                    type: "nativehongbao",
                    name: "红包专区"
                },
                "-1": {
                    type: "native",
                    name: "播播直播"
                },
                "3": {
                    type: "h5",
                    name: "海外购",
                    url: 'list.html?storeId=1031&mark=5',
                    query: 'storeId=1031&mark=5'
                },
                "5": {
                    type: "h5",
                    name: "日韩馆",
                    url: 'list.html?originIds=42&mark=8'
                },
                "15": {
                    type: "h5",
                    name: "澳洲馆",
                    url: 'list.html?originIds=44&mark=8',
                    query: 'originIds=44&mark=8'
                },
                "8": {
                    type: "h5",
                    name: "拼团",
                    url: 'group.html'
                },
                "7": {
                    type: "h5",
                    name: "领券中心",
                    url: 'coupon.html?appinner=true',
                    query: 'originIds=43&mark=8'
                }
            },

            // tagMap: {
            //   "17": {
            //     type: "h5null",
            //     name: "大转盘",
            //     url: 'carousel.html'
            //   },
            //   "22": {
            //     type: "native",
            //     name: "免费试用"
            //   },
            //   "25": {
            //     type: "native",
            //     name: "每日签到"
            //   },
            //   "6": {
            //     type: "nativehongbao",
            //     name: "红包专区"
            //   },
            //   "-1": {
            //     type: "native",
            //     name: "播播直播"
            //   },
            //   "3": {
            //     type: "h5",
            //     name: "海外购",
            //     url: 'list.html?storeId=1031&mark=5',
            //     query: 'storeId=1031&mark=5'
            //   },
            //   "5": {
            //     type: "h5",
            //     name: "日韩馆",
            //     url: 'list.html?originIds=42&mark=8',
            //     query: 'originIds=42&mark=8'
            //   },
            //   "15": {
            //     type: "h5",
            //     name: "澳洲馆",
            //     url: 'list.html?originIds=44&mark=8',
            //     query: 'originIds=44&mark=8'
            //   },
            //   "8": {
            //     type: "h5",
            //     name: "欧洲馆",
            //     url: 'list.html?originIds=43&mark=8',
            //     query: 'originIds=43&mark=8'
            //   },
            //   "7": {
            //     type: "h5",
            //     name: "领券中心",
            //     url: 'coupon.html?appinner=true',
            //     query: 'originIds=43&mark=8'
            //   }
            // },

            renderSecondkillList: function(data) {
                if (data.seckillList) {

                    $(".nmiaosha,.nmiaosha_nhr").css("display", "block");
                    var seckillList = data.seckillList;
                    var ajax_REMARK = seckillList['REMARK'];
                    $(".ajax_REMARK").empty().append(ajax_REMARK);

                    if (seckillList['END_TIME']) {
                        var endtime = new Date(Date.parse(seckillList['END_TIME'].replace(/-/g, "/"))).getTime();
                        // var endtime = Date.parse(new Date(seckillList['END_TIME']));
                        endtime = endtime / 1000;
                        var START_TIME = new Date(Date.parse(seckillList['START_TIME'].replace(/-/g, "/"))).getTime();
                        // var START_TIME = Date.parse(new Date(seckillList['START_TIME']));
                        START_TIME = START_TIME / 1000;

                        var current_Time = new Date(Date.parse(data.currentTime.replace(/-/g, "/"))).getTime();
                        // var current_Time = Date.parse(new Date(data.currentTime));
                        current_Time = current_Time / 1000;
                        this.juli = START_TIME - current_Time; //距离时间
                        this.shengyu = endtime - current_Time; //距离时间
                    }

                    //加载_秒杀列表

                    var COMMODITY_LIST_html = "";
                    var COMMODITY_LIST = data.seckillList['COMMODITY_LIST'];
                    if (COMMODITY_LIST) {
                        $(".nmiaosha,.nmiaosha_nhr").css("display", "block");
                        for (var k = 0; k < COMMODITY_LIST.length; k++) {
                            var PRICE = String(COMMODITY_LIST[k]['GOODS_PRICE'].toString());
                            var q = Math.floor(PRICE);
                            var h = (PRICE).slice(-2);
                            COMMODITY_LIST_html += "<a href='javascript:;' data-GOODS_IMG='" + COMMODITY_LIST[k]['GOODS_NAME'] + "'  data-GOODS_PRICE='" + COMMODITY_LIST[k]['GOODS_PRICE'] + "' data-PRICE='" + COMMODITY_LIST[k]['PRICE'] + "' data-GOODS_NAME='" + COMMODITY_LIST[k]['GOODS_NAME'] + "' data-STORE_ID='" + COMMODITY_LIST[k]['STORE_ID'] + "' data-GOODS_NO='" + COMMODITY_LIST[k]['GOODS_NO'] + "' data-GOODS_ID='" + COMMODITY_LIST[k]['GOODS_ID'] + "' data-DISCOUNT_TYPE='" + COMMODITY_LIST[k]['DISCOUNT_TYPE'] + "' data-DISCOUNT='" + COMMODITY_LIST[k]['DISCOUNT'] + "' data-NUM='" + COMMODITY_LIST[k]['NUM'] + "'>";
                            COMMODITY_LIST_html += "<img class='lazyload' data-original=" + this.URL.IMAGE_URL + COMMODITY_LIST[k]['GOODS_IMG'] + " >";
                            COMMODITY_LIST_html += "<title>" + COMMODITY_LIST[k]['GOODS_NAME'] + "</title>";
                            COMMODITY_LIST_html += "<span>￥" + q + ".<em>" + h + "</em>" + "</span>";

                            COMMODITY_LIST_html += "<del>￥" + COMMODITY_LIST[k]['ORIGINAL_PRICE'] + "</del>";

                            COMMODITY_LIST_html += "</a>";
                        }

                        $("#ajax_seckillList").empty().append(COMMODITY_LIST_html);
                        // this.lazyload();
                    }

                } else {
                    $(".nmiaosha,.nmiaosha_nhr").css("display", "none");
                }
            },

            renderHotRecommendation: function(data) {
                var that = this;

                var html = "";
                html += "<div class='ntuijian_top' style='width: 100%; height: .6rem; float: left; display: block'><span><em>" + "热销单品" + "</em></span></div>";
                var hotRecommendation = data.hotRecommendation;

                if (hotRecommendation && hotRecommendation.length > 0) {
                    for (var k = 0; k < hotRecommendation.length; k++) {
                        if (hotRecommendation[k]['TEMPLATE'] == 1) {
                            html += "<div class='nindex_ad_one'><a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][0].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][0].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
                            html += "<img  class='lazyload' data-original=" + that.URL.IMAGE_URL + hotRecommendation[k]['goods'][0].IMG_URL + " >";
                            html += "</a></div>";
                        }
                        if (hotRecommendation[k]['TEMPLATE'] == 2) {
                            html += "<div class='nindex_ad_two'>";
                            for (var i = 0; i < hotRecommendation[k]['goods'].length; i++) {
                                html += "<a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][i].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][i].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
                                html += "<img  class='lazyload' data-original=" + that.URL.IMAGE_URL + hotRecommendation[k]['goods'][i].IMG_URL + " >";
                                html += "</a>";
                            }
                            html += "</div>";
                        }
                        if (hotRecommendation[k]['TEMPLATE'] == 3) {
                            html += "<div class='nindex_ad_three'>";
                            for (var i = 0; i < hotRecommendation[k]['goods'].length; i++) {
                                html += "<a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][i].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][i].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
                                html += "<img  class='lazyload' data-original=" + that.URL.IMAGE_URL + hotRecommendation[k]['goods'][i].IMG_URL + " >";
                                html += "</a>";
                            }
                            html += "</div>";
                        }
                    }

                    localStorage.removeItem("html03");
                    localStorage.html03 = html;

                    $("#ajax_hotRecommendation").empty().append(html);
                    // this.lazyload();
                }


                $(".nindex_ad a").click(function() {
                    var IMG_URL = $(this).attr("data-IMG_URL");
                    var GOODS_ID = $(this).attr("data-GOODS_ID");
                    var ID = $(this).attr("data-ID");
                    var TEMPLATE = $(this).attr("data-TEMPLATE");
                    var jsonParams = {
                        'funName': 'hot_recommendation_fun',
                        'params': {
                            'IMG_URL': IMG_URL,
                            'GOODS_ID': GOODS_ID,
                            'ID': ID,
                            'TEMPLATE': TEMPLATE
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                })
            },

            renderProductList: function(data) {
                var that = this;
                var html = "";
                var prommotionLayout = data.prommotionLayout;

                for (var k = 0; k < prommotionLayout.length; k++) {
                    html += "<div class='ntuijian cms-module-fillprice'><div class='ntuijian_top'><span><em>" + prommotionLayout[k]['PROMOTION_NAME'] + "</em></span></div>";

                    html += "<div class='ntuijian_ad'><a href='javascript:;' data-id='" + prommotionLayout[k]['ID'] + "'   data-promotion_name='" + prommotionLayout[k]['PROMOTION_NAME'] + "'   data-detail_layout='" + prommotionLayout[k]['DETAIL_LAYOUT'] + "' class='prommotionLayout_ad'><img class='lazyload' data-original=" + that.URL.IMAGE_URL + prommotionLayout[k]['PROMOTION_BANNER'] + "></a><span class='triangle_ad'></span></div>";

                    html += "<div class='ntuijian_main'><div class='swiper-container' style='-webkit-overflow-scrolling:touch'><div class='swiper-wrapper' style='-webkit-overflow-scrolling:touch'>";

                    var prommotionLayout_detail = data.prommotionLayout[k]['goodsList'];

                    for (var i = 0; i < prommotionLayout_detail.length; i++) {
                        //var a= i+1;
                        var PRICE = String(prommotionLayout_detail[i]['GOODS_PRICE'].toString());
                        var q = Math.floor(PRICE);
                        var h = (PRICE).slice(-2);

                        html += "<a href='javascript:;'  data-GOODS_PRICE='" + prommotionLayout_detail[i]['GOODS_PRICE'] + "' data-GOODS_NAME='" + prommotionLayout_detail[i]['GOODS_NAME'] + "' data-STORE_ID='" + prommotionLayout_detail[i]['STORE_ID'] + "' data-GOODS_NO='" + prommotionLayout_detail[i]['GOODS_NO'] + "' data-GOODS_ID='" + prommotionLayout_detail[i]['ID'] + "' data-NUM='" + prommotionLayout_detail[i]['NUM'] + "' class='swiper-slide prommotionLayout_detail'>";
                        html += "<img class='lazyload' data-original=" + that.URL.IMAGE_URL + prommotionLayout_detail[i]['GOODS_IMG'] + " >";
                        html += "<title>" + prommotionLayout_detail[i]['GOODS_NAME'] + "</title>";
                        html += "<span>￥" + q + ".<i>" + h + "</i>" + "</span>";
                        html += "</a>";
                    }
                    html += "<a href='javascript:;' data-id='" + prommotionLayout[k]['ID'] + "' data-promotion_name='" + prommotionLayout[k]['PROMOTION_NAME'] + "'   data-detail_layout='" + prommotionLayout[k]['DETAIL_LAYOUT'] + "' class='swiper-slide prommotionLayout_detail_more'><img class='lazyload' data-original='images/more.jpg'></a></div></div></div>";


                    html += "</div><div class='nhr'></div>";
                }

                $("#ajax_prommotionLayout").empty().append(html);

                // this.lazyload();
            },

            ".prommotionLayout_ad,.prommotionLayout_detail_more click": function(element, event) {
                var id = $(element).attr("data-id");
                var promotion_name = $(element).attr("data-promotion_name");
                var detail_layout = $(element).attr("data-detail_layout");
                var jsonParams = {
                    'funName': 'promotion_more_fun',
                    'params': {
                        'id': id,
                        'promotion_name': promotion_name,
                        'detail_layout': detail_layout
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //商品
            ".nmiaosha_main a,.prommotionLayout_detail click": function(element, event) {
                event && event.preventDefault();
                var STORE_ID = $(element).attr("data-STORE_ID");
                var GOODS_NO = $(element).attr("data-GOODS_NO");
                var GOODS_ID = $(element).attr("data-GOODS_ID");
                var jsonParams = {
                    'funName': 'good_detail_fun',
                    'params': {
                        'STORE_ID': STORE_ID,
                        'GOODS_NO': GOODS_NO,
                        'GOODS_ID': GOODS_ID
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            renderDiscovery: function(data) {
                var that = this;

                setTimeout(
                    //发现

                    function() {
                        var html = "";
                        var showList = data.showList;
                        $(".nfaxian_top").empty();
                        if (showList && showList.length > 0) {
                            $(".ajax_nfaxian_top").prepend('<div class="nfaxian_top"><span><em>发现</em></span></div>');
                        }

                        for (var k = 0; k < showList.length; k++) {
                            var type = showList[k]['TYPE'];
                            if (type == 3) {
                                html += "<div class=' nshow_list_video' data-id='" + showList[k]['ID'] + "' data-SHOW_FILE='" + showList[k]['SHOW_FILE'] + "' data-SHOW_GOODS_IDS='" + showList[k]['SHOW_GOODS_IDS'] + "' data-FACE_IMAGE_PATH='" + showList[k]['FACE_IMAGE_PATH'] + "' data-USER_ID='" + showList[k]['USER_ID'] + "' data-CREATE_TIME='" + showList[k]['CREATE_TIME'] + "' data-SHOW_IMG='" + showList[k]['SHOW_IMG'] + "' data-PHONE='" + showList[k]['PHONE'] + "' data-SPOTLIGHT_CIRCLE_ID='" + showList[k]['SPOTLIGHT_CIRCLE_ID'] + "' data-CIRCLE_NAME='" + showList[k]['CIRCLE_NAME'] + "' data-VIDEO_IMG='" + showList[k]['VIDEO_IMG'] + "' data-LIKENUM='" + showList[k]['LIKENUM'] + "' data-CONTENT='" + showList[k]['CONTENT'] + "' data-USER_NAME='" + showList[k]['USER_NAME'] + "' data-NUM='" + showList[k]['NUM'] + "' data-APPRAISENUM='" + showList[k]['APPRAISENUM'] + "' data-TYPE='" + showList[k]['TYPE'] + "'  data-TITLE='" + showList[k]['TITLE'] + "'>";
                                html += "<div class=' nshow_listbox_video'><video class='myVideo' src=" + that.URL.IMAGE_URL + showList[k]['SHOW_FILE'] + " controls poster=" + that.URL.IMAGE_URL + showList[k]['VIDEO_IMG'] + "></video></div>"

                            } else {


                                html += "<div class='nshow_listbox' data-id='" + showList[k]['ID'] + "' data-SHOW_FILE='" + showList[k]['SHOW_FILE'] + "' data-SHOW_GOODS_IDS='" + showList[k]['SHOW_GOODS_IDS'] + "' data-FACE_IMAGE_PATH='" + showList[k]['FACE_IMAGE_PATH'] + "' data-USER_ID='" + showList[k]['USER_ID'] + "' data-CREATE_TIME='" + showList[k]['CREATE_TIME'] + "' data-SHOW_IMG='" + showList[k]['SHOW_IMG'].split(',')[0] + "' data-PHONE='" + showList[k]['PHONE'] + "' data-SPOTLIGHT_CIRCLE_ID='" + showList[k]['SPOTLIGHT_CIRCLE_ID'] + "' data-CIRCLE_NAME='" + showList[k]['CIRCLE_NAME'] + "' data-VIDEO_IMG='" + showList[k]['VIDEO_IMG'] + "' data-LIKENUM='" + showList[k]['LIKENUM'] + "' data-CONTENT='" + showList[k]['CONTENT'] + "' data-USER_NAME='" + showList[k]['USER_NAME'] + "' data-NUM='" + showList[k]['NUM'] + "' data-APPRAISENUM='" + showList[k]['APPRAISENUM'] + "' data-TYPE='" + showList[k]['TYPE'] + "'  data-TITLE='" + showList[k]['TITLE'] + "'>";
                                html += "<a href='javascript:;' class='nshow_listbox_img'><img class='lazyload' data-original=" + that.URL.IMAGE_URL + showList[k]['SHOW_IMG'].split(',')[0] + "></a>"
                            }

                            html += "<div class='nshow_listbox_title ell'>" + showList[k]['TITLE'] + "</div>"

                            if (showList[k]['FACE_IMAGE_PATH']) {
                                html += "<div class='nshow_listmsg'><a class=''><img class='lazyload' data-original=" + that.URL.IMAGE_URL + showList[k]['FACE_IMAGE_PATH'] + "><span class='nshow_listmsg_name ell'>" + showList[k]['USER_NAME'] + "</span><span class='nshow_listmsg_time'>" + showList[k]['TIME'] + "发布于：" + "<b>" + showList[k]['CIRCLE_NAME'] + "</b>" + "</span>"
                            } else {
                                html += "<div class='nshow_listmsg'><a  class=''><img class='lazyload' data-original='images/Shortcut_114_114.png'><span class='nshow_listmsg_name ell'>" + showList[k]['USER_NAME'] + "</span><span class='nshow_listmsg_time'>" + showList[k]['TIME'] + "发布于：" + "<b>" + showList[k]['CIRCLE_NAME'] + "</b>" + "</span>"
                            }

                            html += "<div class='nshow_listmsg_zh'><i class='nshow_iconfont'>&#xe601;</i><span>" + showList[k]['LIKENUM'] + "</span></div>"
                            html += "<div class='nshow_listmsg_pl'><i class='nshow_iconfont'>&#xe600;</i><span>" + showList[k]['APPRAISENUM'] + "</span></div>"
                            html += "</a></div></div>";
                        }

                        $("#ajax_showList").empty().append(html);

                        // that.lazyload();

                        $(".nshow_listbox").click(function() {
                            var id = $(this).attr("data-id");
                            var SHOW_FILE = $(this).attr("data-SHOW_FILE");
                            var SHOW_GOODS_IDS = $(this).attr("data-SHOW_GOODS_IDS");
                            var FACE_IMAGE_PATH = $(this).attr("data-FACE_IMAGE_PATH");
                            var USER_ID = $(this).attr("data-USER_ID");
                            var CREATE_TIME = $(this).attr("data-CREATE_TIME");
                            var SHOW_IMG = $(this).attr("data-SHOW_IMG");
                            var PHONE = $(this).attr("data-PHONE");
                            var SPOTLIGHT_CIRCLE_ID = $(this).attr("data-SPOTLIGHT_CIRCLE_ID");
                            var CIRCLE_NAME = $(this).attr("data-CIRCLE_NAME");
                            var VIDEO_IMG = $(this).attr("data-VIDEO_IMG");
                            var LIKENUM = $(this).attr("data-LIKENUM");
                            var CONTENT = $(this).attr("data-CONTENT");
                            var USER_NAME = $(this).attr("data-USER_NAME");
                            var NUM = $(this).attr("data-NUM");
                            var APPRAISENUM = $(this).attr("data-APPRAISENUM");
                            var TYPE = $(this).attr("data-TYPE");
                            var TITLE = $(this).attr("data-TITLE");
                            var jsonParams = {
                                'funName': 'show_detail_fun',
                                'params': {
                                    'ID': id,
                                    'SHOW_FILE': SHOW_FILE,
                                    'SHOW_GOODS_IDS': SHOW_GOODS_IDS,
                                    'FACE_IMAGE_PATH': FACE_IMAGE_PATH,
                                    'USER_ID': USER_ID,
                                    'CREATE_TIME': CREATE_TIME,
                                    'SHOW_IMG': SHOW_IMG,
                                    'PHONE': PHONE,
                                    'SPOTLIGHT_CIRCLE_ID': SPOTLIGHT_CIRCLE_ID,
                                    'CIRCLE_NAME': CIRCLE_NAME,
                                    'VIDEO_IMG': VIDEO_IMG,
                                    'LIKENUM': LIKENUM,
                                    'CONTENT': CONTENT,
                                    'USER_NAME': USER_NAME,
                                    'NUM': NUM,
                                    'APPRAISENUM': APPRAISENUM,
                                    'TYPE': TYPE,
                                    'TITLE': TITLE,
                                    'jsonParams': jsonParams
                                }
                            };
                            LHHybrid.nativeFun(jsonParams);
                        })

                        $(".nshow_list_video .nshow_listbox_title,.nshow_list_video .nshow_listmsg").click(function() {
                            var id = $(this).parent().attr("data-id");
                            var SHOW_FILE = $(this).parent().attr("data-SHOW_FILE");
                            var SHOW_GOODS_IDS = $(this).parent().attr("data-SHOW_GOODS_IDS");
                            var FACE_IMAGE_PATH = $(this).parent().attr("data-FACE_IMAGE_PATH");
                            var USER_ID = $(this).parent().attr("data-USER_ID");
                            var CREATE_TIME = $(this).parent().attr("data-CREATE_TIME");
                            var SHOW_IMG = $(this).parent().attr("data-SHOW_IMG");
                            var PHONE = $(this).parent().attr("data-PHONE");
                            var SPOTLIGHT_CIRCLE_ID = $(this).parent().attr("data-SPOTLIGHT_CIRCLE_ID");
                            var CIRCLE_NAME = $(this).parent().attr("data-CIRCLE_NAME");
                            var VIDEO_IMG = $(this).parent().attr("data-VIDEO_IMG");
                            var LIKENUM = $(this).parent().attr("data-LIKENUM");
                            var CONTENT = $(this).parent().attr("data-CONTENT");
                            var USER_NAME = $(this).parent().attr("data-USER_NAME");
                            var NUM = $(this).parent().attr("data-NUM");
                            var APPRAISENUM = $(this).parent().attr("data-APPRAISENUM");
                            var TYPE = $(this).parent().attr("data-TYPE");
                            var TITLE = $(this).parent().attr("data-TITLE");
                            var jsonParams = {
                                'funName': 'show_detail_fun',
                                'params': {
                                    'ID': id,
                                    'SHOW_FILE': SHOW_FILE,
                                    'SHOW_GOODS_IDS': SHOW_GOODS_IDS,
                                    'FACE_IMAGE_PATH': FACE_IMAGE_PATH,
                                    'USER_ID': USER_ID,
                                    'CREATE_TIME': CREATE_TIME,
                                    'SHOW_IMG': SHOW_IMG,
                                    'PHONE': PHONE,
                                    'SPOTLIGHT_CIRCLE_ID': SPOTLIGHT_CIRCLE_ID,
                                    'CIRCLE_NAME': CIRCLE_NAME,
                                    'VIDEO_IMG': VIDEO_IMG,
                                    'LIKENUM': LIKENUM,
                                    'CONTENT': CONTENT,
                                    'USER_NAME': USER_NAME,
                                    'NUM': NUM,
                                    'APPRAISENUM': APPRAISENUM,
                                    'TYPE': TYPE,
                                    'TITLE': TITLE,
                                    'jsonParams': jsonParams
                                }
                            };
                            LHHybrid.nativeFun(jsonParams);
                        })
                    }, 1500);

            },

            bindScroll: function() {
                var that = this;
                $(window).scroll(function() {
                    var s = $(window).scrollTop();
                    if (s > 100) {

                        if (that.exceed) {
                            return false;
                        }

                        $(".nheader_cover").animate({
                            opacity: 0.9
                        });
                        $(".nheader_cover").css({
                            'border-bottom': '1px solid #d2d2d2'
                        });
                        $(".nindex_sousuo").animate({
                            color: '#707070'
                        });
                        $(".nindex_sousuo").animate({
                            background: 'rgba(238,238,238,.9)'
                        });
                        $(".nindex_shaomiao").css({
                            'background-image': 'url(images/shaoyishao2.png)'
                        });
                        $(".nindex_sousuo em").css({
                            'background-image': 'url(images/soshuo2.png)'
                        });
                        $(".nindex_xiaoxi").css({
                            'background-image': 'url(images/xiaoxi2.png)'
                        });

                        that.exceed = true;

                    } else {
                        that.exceed = false;
                        $(".nheader_cover").animate({
                            opacity: 0
                        });
                        $(".nheader_cover").css({
                            'border-bottom': '0px solid #d2d2d2'
                        });
                        $(".nindex_sousuo").animate({
                            color: '#a0a0a0'
                        });
                        $(".nindex_sousuo").animate({
                            background: 'rgba(255,255,255,.7)'
                        });
                        $(".nindex_shaomiao").css({
                            'background-image': 'url(images/shaoyishao.png)'
                        });
                        $(".nindex_sousuo em").css({
                            'background-image': 'url(images/soshuo.png)'
                        });
                        $(".nindex_xiaoxi").css({
                            'background-image': 'url(images/xiaoxi.png)'
                        });
                    };
                });
            },

            '.scan_code_fun click': function() {
                var jsonParams = {
                    'funName': 'scan_code_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },



            '.ajax_noload click': function() {
                var jsonParams = {
                    'funName': 'reload_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            countDown: function() {
                var hours;
                var minutes;
                var seconds;

                if (this.juli >= 0) {
                    hours = Math.floor(this.juli / 3600);
                    minutes = Math.floor((this.juli % 3600) / 60);
                    seconds = Math.floor(this.juli % 60);

                    if (hours < 10) hours = '0' + hours;
                    if (minutes < 10) minutes = '0' + minutes;
                    if (seconds < 10) seconds = '0' + seconds;

                    $(".ajax_timetext").empty().append("距离开始");
                    $(".getting-started").empty().append("<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
                    --this.juli;
                } else {
                    hours = Math.floor(this.shengyu / 3600);
                    minutes = Math.floor((this.shengyu % 3600) / 60);
                    seconds = Math.floor(this.shengyu % 60);

                    if (hours < 10) hours = '0' + hours;
                    if (minutes < 10) minutes = '0' + minutes;
                    if (seconds < 10) seconds = '0' + seconds;

                    $(".ajax_timetext").empty().append("剩余");
                    $(".ajax_REMARK").css("display", "inline-block");
                    $(".getting-started").empty().append("<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
                    --this.shengyu;
                }

                if (this.shengyu < 0) {
                    clearInterval(this.timer);
                    $(".nmiaosha,.nmiaosha_nhr").css("display", "none");
                }
            }
        });
    });define('lehu.h5.component.index', [
        'zepto',
        'can',
        'store',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',

        'lehu.utils.busizutil',

        // 'swiper',
        'slide',
        'imagelazyload'
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

            init: function() {
                var that = this;
                this.juli = null;
                this.shengyu = null;
                this.initData();
                setTimeout(function() {
                    that.sendRequest.apply(that);
                }, 0);
                //this.shouldShowCoupon();
            },

            shouldShowCoupon: function() {
                var that = this;
                var activeIds = $(".index_popup_box_get").attr("data-acitveIds");

                this.userId = busizutil.getUserId();
                if (!this.userId) {
                    $(".index_popup").show();
                    this.bindEvent();
                    return false;
                }
                this.param = {
                    "userId": this.userId,
                    "acitveIds": activeIds
                };
                busizutil.encription(this.param);
                var api = new LHAPI({
                    url: this.URL.SERVER_URL + "judgeLHTicketReceived.do",
                    data: this.param,
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        if (data.hasReceived) {
                            $(".index_popup").hide();
                        } else {
                            $(".index_popup").show();
                            that.bindEvent();
                        }
                    })
                    .fail(function(error) {
                        // util.tip(error.msg);
                    });
            },

            bindEvent: function() {
                var that = this;

                $('.index_popup_box_close').on('click', function() {
                    $(".index_popup").hide();
                });

                $('.index_popup_box_get')[0].onclick = function() {
                    if ($(".index_popup_box_get").hasClass("disabled")) {
                        return false;
                    }
                    $(".index_popup_box_get").addClass("disabled");
                    that.getCoupon();
                };
            },

            getCoupon: function() {
                var activeIds = $(".index_popup_box_get").attr("data-acitveIds");

                var param = can.deparam(window.location.search.substr(1));
                this.userId = busizutil.getUserId();
                if (!this.userId) {
                    $(".index_popup_box_get").removeClass("disabled");
                    if (util.isMobile.WeChat()) {
                        location.href = "login.html?from=index.html";
                        return false;
                    } else {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {
                                "backurl": "index"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);

                        return false;
                    }
                }

                var that = this;

                this.param = {
                    "userId": this.userId,
                    "acitveIds": activeIds
                };

                busizutil.encription(this.param);
                var api = new LHAPI({
                    url: this.URL.SERVER_URL + "getMultipleLHTicket.do",
                    data: this.param,
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        $(".index_popup_box_get").removeClass("disabled");
                        $(".index_popup").hide();
                        util.tip(data.msg);
                    })
                    .fail(function(error) {
                        $(".index_popup_box_get").removeClass("disabled");
                        $(".index_popup").hide();
                        util.tip(error.msg);
                    });
            },

            sendRequest: function() {
                var that = this;
                var api = new LHAPI({
                    url: this.URL.SERVER_URL + LHConfig.setting.action.appNewIndexFirst,
                    data: {}
                });
                api.sendRequest()
                    .done(function(data) {
                        // 设置数据类型
                        $("html").attr("data_type", data.type);

                        // 渲染幻灯片
                        that.renderBannerList(data);

                        // 渲染标签
                        that.renderTagList(data);

                        // 渲染秒杀
                        that.renderSecondkillList(data);

                        // 渲染首页广告列表
                        that.renderHotRecommendation(data);

                        // 楼层
                        that.renderProductList(data);

                        // 发现
                        // that.renderDiscovery(data);

                        // 绑定滚动事件
                        that.bindScroll();

                        // 执行倒计时
                        that.timer = setInterval(function() {
                            that.countDown();
                        }, 1000);

                        that.doOther(data);
                    })
                    .fail(function(error) {
                        $(".ajax_noload").show();
                    })
            },

            doOther: function(data) {
                //加载_400电话
                var hotline = data.hotline;
                var jsonParams = {
                    'funName': 'set_hotline_fun',
                    'params': {
                        'hotline': hotline
                    }
                };

                try {
                    LHHybrid.nativeFun(jsonParams);
                } catch (e) {}

                setTimeout(function() {
                    var lazyload = $(".lazyload");
                    _.each(lazyload, function(item) {
                        $(item).attr('src', $(item).attr('data-original'));
                    })
                }, 100);

                //删除拼团的storeindex
                store.remove("groupselectedindex");
            },

            initData: function() {
                this.URL = LHHybrid.getUrl();
            },

            lazyload: function() {
                if ($('.lazyload').length == 0) {
                    return false;
                }
                $('.lazyload').picLazyLoad({
                    threshold: 400
                });
            },

            //扫描
            ".nindex_shaomiao click": function(element, event) {
                var jsonParams = {
                    'funName': 'scan_code_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //消息
            ".nindex_xiaoxi click": function(element, event) {
                var jsonParams = {
                    'funName': 'message_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //搜索
            ".nindex_sousuo click": function(element, event) {
                var jsonParams = {
                    'funName': 'search_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            ".nmiaosha_top a click": function(element, event) {
                var title = element.attr("data-title");
                var url = element.attr("data-url");
                var jsonParams = {
                    'funName': 'seckill_more_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            renderBannerList: function(data) {

                var width = $(".nwrapper").width();
                //this.URL.IMAGE_URL
                var html = "<ul data-slide-ul='firstUl'>";
                var bannerList = data.bannerList;
                for (var k = 0; k < bannerList.length; k++) {
                    html += "<li style='height:100%' data-ul-child='child'  class='slide-li swiper-slide' data-SORT='" + bannerList[k]['SORT'] + "' data-BANNER_JUMP_ID='" + bannerList[k]['BANNER_JUMP_ID'] + "' data-BANNER_CONTENT='" + bannerList[k]['BANNER_CONTENT'] + "' data-BANNER_IMG='" + bannerList[k]['BANNER_IMG'] + "' data-ID='" + bannerList[k]['ID'] + "' data-BANNER_LAYOUT='" + bannerList[k]['BANNER_LAYOUT'] + "' data-BANNER_JUMP_FLAG='" + bannerList[k]['BANNER_JUMP_FLAG'] + "' data-STATUS='" + bannerList[k]['STATUS'] + "' data-NUM='" + bannerList[k]['NUM'] + "' data-BANNER_NAME='" + bannerList[k]['BANNER_NAME'] + "'>";
                    html += "<img style='width:100%; height: 4rem;' src=" + this.URL.IMAGE_URL + bannerList[k]['BANNER_IMG'] + " >";
                    html += "</li>";
                }
                html += "</ul>";

                html += '<div class="focus-btn" data-small-btn="smallbtn"></div>'

                $("#ajax_banner").empty().append(html);

                // var swiper = new Swiper('.nbanner .swiper-container', {
                //   pagination: '.nbanner .swiper-pagination',
                //   autoplay: 4000,
                //   autoplayDisableOnInteraction: false,
                //   speed: 300,
                //   loop: true,
                //   longSwipesRatio: 0.1
                // });

                var slide = window.slide('.nbanner .swiper-container');
                slide.init({
                    loop: true,
                    smallBtn: true,
                    autoPlay: true,
                    autoHeight: false,
                    playTime: 4000
                });

                localStorage.removeItem("html01");
                localStorage.html01 = html;
            },

            '.nbanner .swiper-slide click': function(element, event) {
                var SORT = $(element).attr("data-SORT");
                var BANNER_JUMP_ID = $(element).attr("data-BANNER_JUMP_ID");
                var BANNER_CONTENT = $(element).attr("data-BANNER_CONTENT");
                var BANNER_IMG = $(element).attr("data-BANNER_IMG");
                var ID = $(element).attr("data-ID");
                var BANNER_LAYOUT = $(element).attr("data-BANNER_LAYOUT");
                var BANNER_JUMP_FLAG = $(element).attr("data-BANNER_JUMP_FLAG");
                var STATUS = $(element).attr("data-STATUS");
                var NUM = $(element).attr("data-NUM");
                var BANNER_NAME = $(element).attr("data-BANNER_NAME");

                // if (BANNER_CONTENT && BANNER_CONTENT.startsWith("http://") && BANNER_CONTENT.endsWith(".html")) {
                // alert(BANNER_CONTENT);
                if (BANNER_CONTENT && BANNER_CONTENT.indexOf("http://") > -1 && BANNER_CONTENT.indexOf(".html") > -1) {
                    // alert("inner");
                    window.location.href = BANNER_CONTENT;

                    return false;
                } else {
                    var jsonParams = {
                        'funName': 'banner_item_fun',
                        'params': {
                            'SORT': SORT,
                            'BANNER_JUMP_ID': BANNER_JUMP_ID,
                            'BANNER_CONTENT': BANNER_CONTENT,
                            'BANNER_IMG': BANNER_IMG,
                            'ID': ID,
                            'BANNER_LAYOUT': BANNER_LAYOUT,
                            'BANNER_JUMP_FLAG': BANNER_JUMP_FLAG,
                            'STATUS': STATUS,
                            'NUM': NUM,
                            'BANNER_NAME': BANNER_NAME
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                }
            },

            renderTagList: function(data) {
                var fastList_html = "";
                var fastList = data.fastList;

                for (var k = 0; k < fastList.length; k++) {

                    fastList_html += "<a href='javascript:;' data-FAST_NAME='" + fastList[k]['FAST_NAME'] + "' data-ID='" + fastList[k]['ID'] + "' data-LINK_NAME='" + fastList[k]['LINK_NAME'] + "' data-FAST_IMG='" + fastList[k]['FAST_IMG'] + "'>";
                    fastList_html += "<img class='lazyload' data-original=" + this.URL.IMAGE_URL + fastList[k]['FAST_IMG'] + " >";
                    fastList_html += "<span>" + fastList[k]['FAST_NAME'] + "</span>";
                    fastList_html += "</a>";
                }

                localStorage.removeItem("html02");
                localStorage.html02 = fastList_html;

                $("#ajax_fastList").empty().append(fastList_html);
                // this.lazyload();
            },

            ".ntag a click": function(element, event) {
                var FAST_NAME = $(element).attr("data-FAST_NAME");
                var ID = $(element).attr("data-ID");
                var LINK_NAME = $(element).attr("data-LINK_NAME");
                var FAST_IMG = $(element).attr("data-FAST_IMG");

                var clickedTag = this.tagMap[ID];
                if (clickedTag) {
                    var type = clickedTag.type;
                    if (type == 'h5') {
                        window.location.href = clickedTag.url;
                        return false;
                    } else if (type == 'h5null') {
                        util.tip("全新抽奖即将上线，敬请期待!");
                        return false;
                    } else if (type == 'native') {
                        var jsonParams = {
                            'funName': 'shortcut_fun',
                            'params': {
                                'FAST_NAME': FAST_NAME,
                                'dID': ID,
                                'LINK_NAME': LINK_NAME,
                                'FAST_IMG': FAST_IMG
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    } else if (type == 'nativehongbao') {
                        var jsonParams = {
                            'funName': 'promotion_more_fun',
                            'params': {
                                'id': '642',
                                'promotion_name': '红包商品专区',
                                'detail_layout': '2'
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    } else {
                        //其他类型不支持点击
                        return false;
                    }
                }
            },

            tagMap: {
                "17": {
                    type: "h5",
                    name: "大转盘",
                    url: 'carousel.html'
                },
                "22": {
                    type: "native",
                    name: "免费试用"
                },
                "25": {
                    type: "native",
                    name: "每日签到"
                },
                "6": {
                    type: "nativehongbao",
                    name: "红包专区"
                },
                "-1": {
                    type: "native",
                    name: "播播直播"
                },
                "3": {
                    type: "h5",
                    name: "海外购",
                    url: 'list.html?storeId=1031&mark=5',
                    query: 'storeId=1031&mark=5'
                },
                "5": {
                    type: "h5",
                    name: "日韩馆",
                    url: 'list.html?originIds=42&mark=8'
                },
                "15": {
                    type: "h5",
                    name: "澳洲馆",
                    url: 'list.html?originIds=44&mark=8',
                    query: 'originIds=44&mark=8'
                },
                "8": {
                    type: "h5",
                    name: "拼团",
                    url: 'group.html'
                },
                "7": {
                    type: "h5",
                    name: "领券中心",
                    url: 'coupon.html?appinner=true',
                    query: 'originIds=43&mark=8'
                }
            },

            // tagMap: {
            //   "17": {
            //     type: "h5null",
            //     name: "大转盘",
            //     url: 'carousel.html'
            //   },
            //   "22": {
            //     type: "native",
            //     name: "免费试用"
            //   },
            //   "25": {
            //     type: "native",
            //     name: "每日签到"
            //   },
            //   "6": {
            //     type: "nativehongbao",
            //     name: "红包专区"
            //   },
            //   "-1": {
            //     type: "native",
            //     name: "播播直播"
            //   },
            //   "3": {
            //     type: "h5",
            //     name: "海外购",
            //     url: 'list.html?storeId=1031&mark=5',
            //     query: 'storeId=1031&mark=5'
            //   },
            //   "5": {
            //     type: "h5",
            //     name: "日韩馆",
            //     url: 'list.html?originIds=42&mark=8',
            //     query: 'originIds=42&mark=8'
            //   },
            //   "15": {
            //     type: "h5",
            //     name: "澳洲馆",
            //     url: 'list.html?originIds=44&mark=8',
            //     query: 'originIds=44&mark=8'
            //   },
            //   "8": {
            //     type: "h5",
            //     name: "欧洲馆",
            //     url: 'list.html?originIds=43&mark=8',
            //     query: 'originIds=43&mark=8'
            //   },
            //   "7": {
            //     type: "h5",
            //     name: "领券中心",
            //     url: 'coupon.html?appinner=true',
            //     query: 'originIds=43&mark=8'
            //   }
            // },

            renderSecondkillList: function(data) {
                if (data.seckillList) {

                    $(".nmiaosha,.nmiaosha_nhr").css("display", "block");
                    var seckillList = data.seckillList;
                    var ajax_REMARK = seckillList['REMARK'];
                    $(".ajax_REMARK").empty().append(ajax_REMARK);

                    if (seckillList['END_TIME']) {
                        var endtime = new Date(Date.parse(seckillList['END_TIME'].replace(/-/g, "/"))).getTime();
                        // var endtime = Date.parse(new Date(seckillList['END_TIME']));
                        endtime = endtime / 1000;
                        var START_TIME = new Date(Date.parse(seckillList['START_TIME'].replace(/-/g, "/"))).getTime();
                        // var START_TIME = Date.parse(new Date(seckillList['START_TIME']));
                        START_TIME = START_TIME / 1000;

                        var current_Time = new Date(Date.parse(data.currentTime.replace(/-/g, "/"))).getTime();
                        // var current_Time = Date.parse(new Date(data.currentTime));
                        current_Time = current_Time / 1000;
                        this.juli = START_TIME - current_Time; //距离时间
                        this.shengyu = endtime - current_Time; //距离时间
                    }

                    //加载_秒杀列表

                    var COMMODITY_LIST_html = "";
                    var COMMODITY_LIST = data.seckillList['COMMODITY_LIST'];
                    if (COMMODITY_LIST) {
                        $(".nmiaosha,.nmiaosha_nhr").css("display", "block");
                        for (var k = 0; k < COMMODITY_LIST.length; k++) {
                            var PRICE = String(COMMODITY_LIST[k]['GOODS_PRICE'].toString());
                            var q = Math.floor(PRICE);
                            var h = (PRICE).slice(-2);
                            COMMODITY_LIST_html += "<a href='javascript:;' data-GOODS_IMG='" + COMMODITY_LIST[k]['GOODS_NAME'] + "'  data-GOODS_PRICE='" + COMMODITY_LIST[k]['GOODS_PRICE'] + "' data-PRICE='" + COMMODITY_LIST[k]['PRICE'] + "' data-GOODS_NAME='" + COMMODITY_LIST[k]['GOODS_NAME'] + "' data-STORE_ID='" + COMMODITY_LIST[k]['STORE_ID'] + "' data-GOODS_NO='" + COMMODITY_LIST[k]['GOODS_NO'] + "' data-GOODS_ID='" + COMMODITY_LIST[k]['GOODS_ID'] + "' data-DISCOUNT_TYPE='" + COMMODITY_LIST[k]['DISCOUNT_TYPE'] + "' data-DISCOUNT='" + COMMODITY_LIST[k]['DISCOUNT'] + "' data-NUM='" + COMMODITY_LIST[k]['NUM'] + "'>";
                            COMMODITY_LIST_html += "<img class='lazyload' data-original=" + this.URL.IMAGE_URL + COMMODITY_LIST[k]['GOODS_IMG'] + " >";
                            COMMODITY_LIST_html += "<title>" + COMMODITY_LIST[k]['GOODS_NAME'] + "</title>";
                            COMMODITY_LIST_html += "<span>￥" + q + ".<em>" + h + "</em>" + "</span>";

                            COMMODITY_LIST_html += "<del>￥" + COMMODITY_LIST[k]['ORIGINAL_PRICE'] + "</del>";

                            COMMODITY_LIST_html += "</a>";
                        }

                        $("#ajax_seckillList").empty().append(COMMODITY_LIST_html);
                        // this.lazyload();
                    }

                } else {
                    $(".nmiaosha,.nmiaosha_nhr").css("display", "none");
                }
            },

            renderHotRecommendation: function(data) {
                var that = this;

                var html = "";
                html += "<div class='ntuijian_top' style='width: 100%; height: .6rem; float: left; display: block'><span><em>" + "热销单品" + "</em></span></div>";
                var hotRecommendation = data.hotRecommendation;

                if (hotRecommendation && hotRecommendation.length > 0) {
                    for (var k = 0; k < hotRecommendation.length; k++) {
                        if (hotRecommendation[k]['TEMPLATE'] == 1) {
                            html += "<div class='nindex_ad_one'><a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][0].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][0].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
                            html += "<img  class='lazyload' data-original=" + that.URL.IMAGE_URL + hotRecommendation[k]['goods'][0].IMG_URL + " >";
                            html += "</a></div>";
                        }
                        if (hotRecommendation[k]['TEMPLATE'] == 2) {
                            html += "<div class='nindex_ad_two'>";
                            for (var i = 0; i < hotRecommendation[k]['goods'].length; i++) {
                                html += "<a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][i].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][i].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
                                html += "<img  class='lazyload' data-original=" + that.URL.IMAGE_URL + hotRecommendation[k]['goods'][i].IMG_URL + " >";
                                html += "</a>";
                            }
                            html += "</div>";
                        }
                        if (hotRecommendation[k]['TEMPLATE'] == 3) {
                            html += "<div class='nindex_ad_three'>";
                            for (var i = 0; i < hotRecommendation[k]['goods'].length; i++) {
                                html += "<a href='javascript:;'  data-IMG_URL='" + hotRecommendation[k]['goods'][i].IMG_URL + "'  data-GOODS_ID='" + hotRecommendation[k]['goods'][i].GOODS_ID + "' data-ID='" + hotRecommendation[k]['ID'] + "'  data-TEMPLATE='" + hotRecommendation[k]['TEMPLATE'] + "'>";
                                html += "<img  class='lazyload' data-original=" + that.URL.IMAGE_URL + hotRecommendation[k]['goods'][i].IMG_URL + " >";
                                html += "</a>";
                            }
                            html += "</div>";
                        }
                    }

                    localStorage.removeItem("html03");
                    localStorage.html03 = html;

                    $("#ajax_hotRecommendation").empty().append(html);
                    // this.lazyload();
                }


                $(".nindex_ad a").click(function() {
                    var IMG_URL = $(this).attr("data-IMG_URL");
                    var GOODS_ID = $(this).attr("data-GOODS_ID");
                    var ID = $(this).attr("data-ID");
                    var TEMPLATE = $(this).attr("data-TEMPLATE");
                    var jsonParams = {
                        'funName': 'hot_recommendation_fun',
                        'params': {
                            'IMG_URL': IMG_URL,
                            'GOODS_ID': GOODS_ID,
                            'ID': ID,
                            'TEMPLATE': TEMPLATE
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                })
            },

            renderProductList: function(data) {
                var that = this;
                var html = "";
                var prommotionLayout = data.prommotionLayout;

                for (var k = 0; k < prommotionLayout.length; k++) {
                    html += "<div class='ntuijian cms-module-fillprice'><div class='ntuijian_top'><span><em>" + prommotionLayout[k]['PROMOTION_NAME'] + "</em></span></div>";

                    html += "<div class='ntuijian_ad'><a href='javascript:;' data-id='" + prommotionLayout[k]['ID'] + "'   data-promotion_name='" + prommotionLayout[k]['PROMOTION_NAME'] + "'   data-detail_layout='" + prommotionLayout[k]['DETAIL_LAYOUT'] + "' class='prommotionLayout_ad'><img class='lazyload' data-original=" + that.URL.IMAGE_URL + prommotionLayout[k]['PROMOTION_BANNER'] + "></a><span class='triangle_ad'></span></div>";

                    html += "<div class='ntuijian_main'><div class='swiper-container' style='-webkit-overflow-scrolling:touch'><div class='swiper-wrapper' style='-webkit-overflow-scrolling:touch'>";

                    var prommotionLayout_detail = data.prommotionLayout[k]['goodsList'];

                    for (var i = 0; i < prommotionLayout_detail.length; i++) {
                        //var a= i+1;
                        var PRICE = String(prommotionLayout_detail[i]['GOODS_PRICE'].toString());
                        var q = Math.floor(PRICE);
                        var h = (PRICE).slice(-2);

                        html += "<a href='javascript:;'  data-GOODS_PRICE='" + prommotionLayout_detail[i]['GOODS_PRICE'] + "' data-GOODS_NAME='" + prommotionLayout_detail[i]['GOODS_NAME'] + "' data-STORE_ID='" + prommotionLayout_detail[i]['STORE_ID'] + "' data-GOODS_NO='" + prommotionLayout_detail[i]['GOODS_NO'] + "' data-GOODS_ID='" + prommotionLayout_detail[i]['ID'] + "' data-NUM='" + prommotionLayout_detail[i]['NUM'] + "' class='swiper-slide prommotionLayout_detail'>";
                        html += "<img class='lazyload' data-original=" + that.URL.IMAGE_URL + prommotionLayout_detail[i]['GOODS_IMG'] + " >";
                        html += "<title>" + prommotionLayout_detail[i]['GOODS_NAME'] + "</title>";
                        html += "<span>￥" + q + ".<i>" + h + "</i>" + "</span>";
                        html += "</a>";
                    }
                    html += "<a href='javascript:;' data-id='" + prommotionLayout[k]['ID'] + "' data-promotion_name='" + prommotionLayout[k]['PROMOTION_NAME'] + "'   data-detail_layout='" + prommotionLayout[k]['DETAIL_LAYOUT'] + "' class='swiper-slide prommotionLayout_detail_more'><img class='lazyload' data-original='images/more.jpg'></a></div></div></div>";


                    html += "</div><div class='nhr'></div>";
                }

                $("#ajax_prommotionLayout").empty().append(html);

                // this.lazyload();
            },

            ".prommotionLayout_ad,.prommotionLayout_detail_more click": function(element, event) {
                var id = $(element).attr("data-id");
                var promotion_name = $(element).attr("data-promotion_name");
                var detail_layout = $(element).attr("data-detail_layout");
                var jsonParams = {
                    'funName': 'promotion_more_fun',
                    'params': {
                        'id': id,
                        'promotion_name': promotion_name,
                        'detail_layout': detail_layout
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //商品
            ".nmiaosha_main a,.prommotionLayout_detail click": function(element, event) {
                event && event.preventDefault();
                var STORE_ID = $(element).attr("data-STORE_ID");
                var GOODS_NO = $(element).attr("data-GOODS_NO");
                var GOODS_ID = $(element).attr("data-GOODS_ID");
                var jsonParams = {
                    'funName': 'good_detail_fun',
                    'params': {
                        'STORE_ID': STORE_ID,
                        'GOODS_NO': GOODS_NO,
                        'GOODS_ID': GOODS_ID
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            renderDiscovery: function(data) {
                var that = this;

                setTimeout(
                    //发现

                    function() {
                        var html = "";
                        var showList = data.showList;
                        $(".nfaxian_top").empty();
                        if (showList && showList.length > 0) {
                            $(".ajax_nfaxian_top").prepend('<div class="nfaxian_top"><span><em>发现</em></span></div>');
                        }

                        for (var k = 0; k < showList.length; k++) {
                            var type = showList[k]['TYPE'];
                            if (type == 3) {
                                html += "<div class=' nshow_list_video' data-id='" + showList[k]['ID'] + "' data-SHOW_FILE='" + showList[k]['SHOW_FILE'] + "' data-SHOW_GOODS_IDS='" + showList[k]['SHOW_GOODS_IDS'] + "' data-FACE_IMAGE_PATH='" + showList[k]['FACE_IMAGE_PATH'] + "' data-USER_ID='" + showList[k]['USER_ID'] + "' data-CREATE_TIME='" + showList[k]['CREATE_TIME'] + "' data-SHOW_IMG='" + showList[k]['SHOW_IMG'] + "' data-PHONE='" + showList[k]['PHONE'] + "' data-SPOTLIGHT_CIRCLE_ID='" + showList[k]['SPOTLIGHT_CIRCLE_ID'] + "' data-CIRCLE_NAME='" + showList[k]['CIRCLE_NAME'] + "' data-VIDEO_IMG='" + showList[k]['VIDEO_IMG'] + "' data-LIKENUM='" + showList[k]['LIKENUM'] + "' data-CONTENT='" + showList[k]['CONTENT'] + "' data-USER_NAME='" + showList[k]['USER_NAME'] + "' data-NUM='" + showList[k]['NUM'] + "' data-APPRAISENUM='" + showList[k]['APPRAISENUM'] + "' data-TYPE='" + showList[k]['TYPE'] + "'  data-TITLE='" + showList[k]['TITLE'] + "'>";
                                html += "<div class=' nshow_listbox_video'><video class='myVideo' src=" + that.URL.IMAGE_URL + showList[k]['SHOW_FILE'] + " controls poster=" + that.URL.IMAGE_URL + showList[k]['VIDEO_IMG'] + "></video></div>"

                            } else {


                                html += "<div class='nshow_listbox' data-id='" + showList[k]['ID'] + "' data-SHOW_FILE='" + showList[k]['SHOW_FILE'] + "' data-SHOW_GOODS_IDS='" + showList[k]['SHOW_GOODS_IDS'] + "' data-FACE_IMAGE_PATH='" + showList[k]['FACE_IMAGE_PATH'] + "' data-USER_ID='" + showList[k]['USER_ID'] + "' data-CREATE_TIME='" + showList[k]['CREATE_TIME'] + "' data-SHOW_IMG='" + showList[k]['SHOW_IMG'].split(',')[0] + "' data-PHONE='" + showList[k]['PHONE'] + "' data-SPOTLIGHT_CIRCLE_ID='" + showList[k]['SPOTLIGHT_CIRCLE_ID'] + "' data-CIRCLE_NAME='" + showList[k]['CIRCLE_NAME'] + "' data-VIDEO_IMG='" + showList[k]['VIDEO_IMG'] + "' data-LIKENUM='" + showList[k]['LIKENUM'] + "' data-CONTENT='" + showList[k]['CONTENT'] + "' data-USER_NAME='" + showList[k]['USER_NAME'] + "' data-NUM='" + showList[k]['NUM'] + "' data-APPRAISENUM='" + showList[k]['APPRAISENUM'] + "' data-TYPE='" + showList[k]['TYPE'] + "'  data-TITLE='" + showList[k]['TITLE'] + "'>";
                                html += "<a href='javascript:;' class='nshow_listbox_img'><img class='lazyload' data-original=" + that.URL.IMAGE_URL + showList[k]['SHOW_IMG'].split(',')[0] + "></a>"
                            }

                            html += "<div class='nshow_listbox_title ell'>" + showList[k]['TITLE'] + "</div>"

                            if (showList[k]['FACE_IMAGE_PATH']) {
                                html += "<div class='nshow_listmsg'><a class=''><img class='lazyload' data-original=" + that.URL.IMAGE_URL + showList[k]['FACE_IMAGE_PATH'] + "><span class='nshow_listmsg_name ell'>" + showList[k]['USER_NAME'] + "</span><span class='nshow_listmsg_time'>" + showList[k]['TIME'] + "发布于：" + "<b>" + showList[k]['CIRCLE_NAME'] + "</b>" + "</span>"
                            } else {
                                html += "<div class='nshow_listmsg'><a  class=''><img class='lazyload' data-original='images/Shortcut_114_114.png'><span class='nshow_listmsg_name ell'>" + showList[k]['USER_NAME'] + "</span><span class='nshow_listmsg_time'>" + showList[k]['TIME'] + "发布于：" + "<b>" + showList[k]['CIRCLE_NAME'] + "</b>" + "</span>"
                            }

                            html += "<div class='nshow_listmsg_zh'><i class='nshow_iconfont'>&#xe601;</i><span>" + showList[k]['LIKENUM'] + "</span></div>"
                            html += "<div class='nshow_listmsg_pl'><i class='nshow_iconfont'>&#xe600;</i><span>" + showList[k]['APPRAISENUM'] + "</span></div>"
                            html += "</a></div></div>";
                        }

                        $("#ajax_showList").empty().append(html);

                        // that.lazyload();

                        $(".nshow_listbox").click(function() {
                            var id = $(this).attr("data-id");
                            var SHOW_FILE = $(this).attr("data-SHOW_FILE");
                            var SHOW_GOODS_IDS = $(this).attr("data-SHOW_GOODS_IDS");
                            var FACE_IMAGE_PATH = $(this).attr("data-FACE_IMAGE_PATH");
                            var USER_ID = $(this).attr("data-USER_ID");
                            var CREATE_TIME = $(this).attr("data-CREATE_TIME");
                            var SHOW_IMG = $(this).attr("data-SHOW_IMG");
                            var PHONE = $(this).attr("data-PHONE");
                            var SPOTLIGHT_CIRCLE_ID = $(this).attr("data-SPOTLIGHT_CIRCLE_ID");
                            var CIRCLE_NAME = $(this).attr("data-CIRCLE_NAME");
                            var VIDEO_IMG = $(this).attr("data-VIDEO_IMG");
                            var LIKENUM = $(this).attr("data-LIKENUM");
                            var CONTENT = $(this).attr("data-CONTENT");
                            var USER_NAME = $(this).attr("data-USER_NAME");
                            var NUM = $(this).attr("data-NUM");
                            var APPRAISENUM = $(this).attr("data-APPRAISENUM");
                            var TYPE = $(this).attr("data-TYPE");
                            var TITLE = $(this).attr("data-TITLE");
                            var jsonParams = {
                                'funName': 'show_detail_fun',
                                'params': {
                                    'ID': id,
                                    'SHOW_FILE': SHOW_FILE,
                                    'SHOW_GOODS_IDS': SHOW_GOODS_IDS,
                                    'FACE_IMAGE_PATH': FACE_IMAGE_PATH,
                                    'USER_ID': USER_ID,
                                    'CREATE_TIME': CREATE_TIME,
                                    'SHOW_IMG': SHOW_IMG,
                                    'PHONE': PHONE,
                                    'SPOTLIGHT_CIRCLE_ID': SPOTLIGHT_CIRCLE_ID,
                                    'CIRCLE_NAME': CIRCLE_NAME,
                                    'VIDEO_IMG': VIDEO_IMG,
                                    'LIKENUM': LIKENUM,
                                    'CONTENT': CONTENT,
                                    'USER_NAME': USER_NAME,
                                    'NUM': NUM,
                                    'APPRAISENUM': APPRAISENUM,
                                    'TYPE': TYPE,
                                    'TITLE': TITLE,
                                    'jsonParams': jsonParams
                                }
                            };
                            LHHybrid.nativeFun(jsonParams);
                        })

                        $(".nshow_list_video .nshow_listbox_title,.nshow_list_video .nshow_listmsg").click(function() {
                            var id = $(this).parent().attr("data-id");
                            var SHOW_FILE = $(this).parent().attr("data-SHOW_FILE");
                            var SHOW_GOODS_IDS = $(this).parent().attr("data-SHOW_GOODS_IDS");
                            var FACE_IMAGE_PATH = $(this).parent().attr("data-FACE_IMAGE_PATH");
                            var USER_ID = $(this).parent().attr("data-USER_ID");
                            var CREATE_TIME = $(this).parent().attr("data-CREATE_TIME");
                            var SHOW_IMG = $(this).parent().attr("data-SHOW_IMG");
                            var PHONE = $(this).parent().attr("data-PHONE");
                            var SPOTLIGHT_CIRCLE_ID = $(this).parent().attr("data-SPOTLIGHT_CIRCLE_ID");
                            var CIRCLE_NAME = $(this).parent().attr("data-CIRCLE_NAME");
                            var VIDEO_IMG = $(this).parent().attr("data-VIDEO_IMG");
                            var LIKENUM = $(this).parent().attr("data-LIKENUM");
                            var CONTENT = $(this).parent().attr("data-CONTENT");
                            var USER_NAME = $(this).parent().attr("data-USER_NAME");
                            var NUM = $(this).parent().attr("data-NUM");
                            var APPRAISENUM = $(this).parent().attr("data-APPRAISENUM");
                            var TYPE = $(this).parent().attr("data-TYPE");
                            var TITLE = $(this).parent().attr("data-TITLE");
                            var jsonParams = {
                                'funName': 'show_detail_fun',
                                'params': {
                                    'ID': id,
                                    'SHOW_FILE': SHOW_FILE,
                                    'SHOW_GOODS_IDS': SHOW_GOODS_IDS,
                                    'FACE_IMAGE_PATH': FACE_IMAGE_PATH,
                                    'USER_ID': USER_ID,
                                    'CREATE_TIME': CREATE_TIME,
                                    'SHOW_IMG': SHOW_IMG,
                                    'PHONE': PHONE,
                                    'SPOTLIGHT_CIRCLE_ID': SPOTLIGHT_CIRCLE_ID,
                                    'CIRCLE_NAME': CIRCLE_NAME,
                                    'VIDEO_IMG': VIDEO_IMG,
                                    'LIKENUM': LIKENUM,
                                    'CONTENT': CONTENT,
                                    'USER_NAME': USER_NAME,
                                    'NUM': NUM,
                                    'APPRAISENUM': APPRAISENUM,
                                    'TYPE': TYPE,
                                    'TITLE': TITLE,
                                    'jsonParams': jsonParams
                                }
                            };
                            LHHybrid.nativeFun(jsonParams);
                        })
                    }, 1500);

            },

            bindScroll: function() {
                var that = this;
                $(window).scroll(function() {
                    var s = $(window).scrollTop();
                    if (s > 100) {

                        if (that.exceed) {
                            return false;
                        }

                        $(".nheader_cover").animate({
                            opacity: 0.9
                        });
                        $(".nheader_cover").css({
                            'border-bottom': '1px solid #d2d2d2'
                        });
                        $(".nindex_sousuo").animate({
                            color: '#707070'
                        });
                        $(".nindex_sousuo").animate({
                            background: 'rgba(238,238,238,.9)'
                        });
                        $(".nindex_shaomiao").css({
                            'background-image': 'url(images/shaoyishao2.png)'
                        });
                        $(".nindex_sousuo em").css({
                            'background-image': 'url(images/soshuo2.png)'
                        });
                        $(".nindex_xiaoxi").css({
                            'background-image': 'url(images/xiaoxi2.png)'
                        });

                        that.exceed = true;

                    } else {
                        that.exceed = false;
                        $(".nheader_cover").animate({
                            opacity: 0
                        });
                        $(".nheader_cover").css({
                            'border-bottom': '0px solid #d2d2d2'
                        });
                        $(".nindex_sousuo").animate({
                            color: '#a0a0a0'
                        });
                        $(".nindex_sousuo").animate({
                            background: 'rgba(255,255,255,.7)'
                        });
                        $(".nindex_shaomiao").css({
                            'background-image': 'url(images/shaoyishao.png)'
                        });
                        $(".nindex_sousuo em").css({
                            'background-image': 'url(images/soshuo.png)'
                        });
                        $(".nindex_xiaoxi").css({
                            'background-image': 'url(images/xiaoxi.png)'
                        });
                    };
                });
            },

            '.scan_code_fun click': function() {
                var jsonParams = {
                    'funName': 'scan_code_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },



            '.ajax_noload click': function() {
                var jsonParams = {
                    'funName': 'reload_web_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            countDown: function() {
                var hours;
                var minutes;
                var seconds;

                if (this.juli >= 0) {
                    hours = Math.floor(this.juli / 3600);
                    minutes = Math.floor((this.juli % 3600) / 60);
                    seconds = Math.floor(this.juli % 60);

                    if (hours < 10) hours = '0' + hours;
                    if (minutes < 10) minutes = '0' + minutes;
                    if (seconds < 10) seconds = '0' + seconds;

                    $(".ajax_timetext").empty().append("距离开始");
                    $(".getting-started").empty().append("<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
                    --this.juli;
                } else {
                    hours = Math.floor(this.shengyu / 3600);
                    minutes = Math.floor((this.shengyu % 3600) / 60);
                    seconds = Math.floor(this.shengyu % 60);

                    if (hours < 10) hours = '0' + hours;
                    if (minutes < 10) minutes = '0' + minutes;
                    if (seconds < 10) seconds = '0' + seconds;

                    $(".ajax_timetext").empty().append("剩余");
                    $(".ajax_REMARK").css("display", "inline-block");
                    $(".getting-started").empty().append("<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
                    --this.shengyu;
                }

                if (this.shengyu < 0) {
                    clearInterval(this.timer);
                    $(".nmiaosha,.nmiaosha_nhr").css("display", "none");
                }
            }
        });
    });