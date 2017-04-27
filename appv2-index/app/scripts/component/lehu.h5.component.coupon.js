define('lehu.h5.component.coupon', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',

        //'imagelazyload',
        'lehu.utils.busizutil',

        'text!template_components_coupon'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid,
              busizutil,
              template_components_coupon) {
        'use strict';

        return can.Control.extend({

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();

                var renderList = can.mustache(template_components_coupon);
                var html = renderList(this.options);
                this.element.html(html);

                //  去除导航事件
                this.deleteNav();

                //渲染页面
                this.render();
            },

            // "#sharetip click": function (element, event) {
            //     $("#sharetip").hide();
            // },

            // "#share click": function (element, event) {
            //     var param = can.deparam(window.location.search.substr(1));
            //     var version = param.version;
            //     if (!version && !util.isMobile.WeChat()) {
            //         util.tip("请升级app到最新版本后使用!");
            //         return false;
            //     }
            //
            //     if (util.isMobile.WeChat()) {
            //         $("#sharetip").show();
            //         return false;
            //     }
            //
            //     var jsonParams = {
            //         'funName': 'share_fun',
            //         'params': {
            //             'title': "汇银乐虎全球购-领券中心",
            //             'type': "1",
            //             'video_img': "",
            //             'shareUrl': 'http://' + window.location.host + "/html5/app/coupon.html?from=share",
            //             'shareImgUrl': "http://app.lehumall.com/html5/app/images/Shortcut_114_114.png",
            //             'text': "汇银乐虎全球购，赶紧领取优惠券吧，手慢无！"
            //         }
            //     };
            //     LHHybrid.nativeFun(jsonParams);
            // },

            initData: function () {
                this.URL = LHHybrid.getUrl();
            },

            render: function () {
                var that = this;
                that.getCoupon(0);
            },

            //券展示
            getCoupon: function (flag) {

                var that = this;

                this.param = {
                    "flag": flag,
                    "pageRows": 20,
                    "toPage": 1
                };

                var api = new LHAPI({
                    url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/ticketCenter/list",
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        console.log(3);
                        if (data.code == 1) {
                            var COUPONLIST = data.response.list;
                            if (COUPONLIST && COUPONLIST.length > 0) {
                                var html = "";
                                for (var i = 0; i < COUPONLIST.length; i++) {
                                    if (COUPONLIST[i].usingRange == 4) {
                                        html += '<div class="coupons_box total-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b><b>全场券</b></em><span>' + COUPONLIST[i].ticketActivityName + '</span><p>请于' +
                                            COUPONLIST[i].useEndTime + '前使用</p></div><div class="coupons_box_r" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em><b>￥' + COUPONLIST[i].condition2 + '</b>现金券</em> <span>立即领取<i>&gt;</i></span></div></div>';
                                    }
                                    if (COUPONLIST[i].usingRange == 3) {
                                        html += '<div class="coupons_box single-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_gift.png"><b><b>品类券</b></em><span>' + COUPONLIST[i].ticketActivityName + '</span><p>请于' +
                                            COUPONLIST[i].useEndTime + '前使用</p></div><div class="coupons_box_r" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em><b>￥' + COUPONLIST[i].condition2 + '</b>现金券</em> <span>立即领取<i>&gt;</i></span></div></div>';
                                    }
                                    if (COUPONLIST[i].usingRange == 2) {
                                        html += '<div class="coupons_box store-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_store_mall.png"><b><b>品类券</b></em><span>' + COUPONLIST[i].ticketActivityName + '</span><p>请于' +
                                            COUPONLIST[i].useEndTime + '前使用</p></div><div class="coupons_box_s" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em>满<b>' + COUPONLIST[i].condition2 + '</b>送<b>' + COUPONLIST[i].condition1 + '</b></em><span>立即领取<i>&gt;</i></span></div></div>';
                                    }
                                    if (COUPONLIST[i].usingRange == 1) {
                                        html += '<div class="coupons_box store-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_redeem.png"><b><b>品类券</b></em><span>' + COUPONLIST[i].ticketActivityName + '</span><p>请于' +
                                            COUPONLIST[i].useEndTime + '前使用</p></div><div class="coupons_box_s" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em>满<b>' + COUPONLIST[i].condition2 + '</b>送<b>' + COUPONLIST[i].condition1 + '</b></em><span>立即领取<i>&gt;</i></span></div></div>';
                                    }
                                }

                                $('.coupons_main').empty().append(html);
                                $('.enter_coupon').show();
                            }
                            else if (COUPONLIST && COUPONLIST.length == 0) {
                                $('.coupons_box_null').show();
                                $('.enter_coupon').show();
                            }
                        }

                    })
                    .fail(function (error) {
                        util.tip(error.msg);
                    });

            },

            '.coupons_category a click': function (element, event) {
                var that = this;
                //切换券类
                $(".coupons_category .active").removeClass('active');
                element.addClass('active');

                if (element.index() == 1) {
                    that.getCoupon(1);
                    console.log(1);
                }
                else if (element.index() == 0) {
                    that.getCoupon(0);
                    console.log(0);
                }

            },

            ".coupons_box_r,.coupons_box_s click": function (element, event) {

                var couponid = element.attr("data-id");

                var param = can.deparam(window.location.search.substr(1));

                this.userId = busizutil.getUserId();

                console.log(this.userId);

                if (!this.userId) {
                    if (util.isMobile.WeChat() || param.from == 'share') {
                        location.href = "login.html?from=coupon.html";
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
                this.uesCoupon(this.userId, couponid);
            },

            uesCoupon:function (userId,couponid) {
                var that = this;

                this.param = {
                    "userId": userId,
                    "activityId": couponid
                };

                var api = new LHAPI({
                    url: 'http://118.178.227.135/mobile-web-market/ws/mobile/v1/ticketCenter/getTicket',
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {

                        if(data.code == 1){
                            util.tip("领取成功！",3000);
                        }
                        else {
                            //code不为1
                            util.tip(data.msg,3000);
                        }
                    })
                    .fail(function(error) {
                        util.tip(error.msg);
                    });
            },

            '.enter_coupon click': function () {

                var jsonParams = {
                    'funName': 'back_coupons',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);

            },

            deleteNav:function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.from);
                if(param.from == "share"){
                    $('.header').hide();
                    return false;
                }
            },

            '.back click': function () {

                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_fun',
                        'params': {
                            "backurl": "index"
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                    console.log('back_fun');
                } else {
                    if (history.length == 1) {
                        window.opener = null;
                        window.close();
                    } else {
                        history.go(-1);
                    }
                }

            }
        });

    });