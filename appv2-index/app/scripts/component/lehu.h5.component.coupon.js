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

            //    分享
               this.share();
            },

            initData: function () {
                var HOST = window.location.host;
                if (HOST.indexOf('118') > -1) {
                    this.URL = 'http://118.178.227.135';
                    this.LOACTION = 'http://118.178.227.135:8083'
                }
                else {
                    this.URL = 'http://121.196.208.98:28080';
                    this.LOACTION = 'http://121.196.208.98:28080'
                }
            },

            render: function () {
                var that = this;
                that.getCoupon(0);
            },

            //券展示
            getCoupon: function (flag) {

                var that = this;
                this.userId = busizutil.getUserId();
                if(!this.userId){
                    this.userId = "";
                }
                this.param = {
                    "flag": flag,
                    "pageRows": 20,
                    "toPage": 1,
                    "userId":this.userId
                };
                console.log(flag);
                var api = new LHAPI({
                    url: that.URL + "/mobile-web-market/ws/mobile/v1/ticketCenter/list",
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {

                        if (data.code == 1) {
                            var COUPONLIST = data.response.list;
                            if (COUPONLIST == "") {
                                $('.coupons_main').empty();
                                $('.coupons_box_null').show();
                                $('.enter_coupon').show();
                                return false;
                            }

                                if (COUPONLIST && COUPONLIST.length > 0) {
                                    var html = "";

                                    for (var i = 0; i < COUPONLIST.length; i++) {

                                        if(flag == 0){
                                            if (COUPONLIST[i].type == 1) {
                                                html += '<div class="coupons_box total-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>乐虎券</b></em>';
                                            }
                                            else if(COUPONLIST[i].type == 2){
                                                html += '<div class="coupons_box single-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>乐虎券</b></em>';
                                            }
                                        }
                                        else if(flag == 1){
                                            if (COUPONLIST[i].type == 1) {
                                                html += '<div class="coupons_box total-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>' + COUPONLIST[i].storeName + '</b></em>';
                                            }
                                            else if(COUPONLIST[i].type == 2){
                                                html += '<div class="coupons_box single-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>' + COUPONLIST[i].storeName + '</b></em>';
                                            }
                                        }

                                        html += '<span>' + COUPONLIST[i].ticketActivityName + '</span><p>请于' + COUPONLIST[i].useEndTime + '前使用</p></div>';

                                        if (COUPONLIST[i].type == 1) {
                                            html += '<div class="coupons_box_r" style="color: #ffffff" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em><b>￥' + COUPONLIST[i].condition2 + '</b>现金券</em> <span>立即领取<i>&gt;</i></span></div></div>';
                                        }
                                        else if (COUPONLIST[i].type == 2) {
                                            html += '<div class="coupons_box_s"  style="color: #ffffff" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em>满<b>' + COUPONLIST[i].condition1 + '</b>减<b>' + COUPONLIST[i].condition2 + '</b></em><span >立即领取<i>&gt;</i></span></div></div>';
                                        }
                                    }
                                }


                            $('.coupons_box_null').hide();
                            $('.coupons_main').empty().append(html);
                            $('.enter_coupon').show();
                        }
                        else {
                            util.tip(data.msg);
                        }
                    })
                    .fail(function (error) {
                        util.tip("服务器错误！");
                    });

            },

            '.coupons_category a click': function (element, event) {
                var that = this;
                //切换券类
                $(".coupons_category .active").removeClass('active');
                element.addClass('active');

                if (element.index() == 1) {
                    that.getCoupon(1);
                }
                else if (element.index() == 0) {
                    that.getCoupon(0);
                }

            },

            ".coupons_box_r,.coupons_box_s click": function (element, event) {
                var couponid = element.attr("data-id");

                var param = can.deparam(window.location.search.substr(1));

                this.userId = busizutil.getUserId();
                if (!this.userId) {
                    if (param.from == 'app') {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {
                                "backurl": "index"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);

                        return false;

                    } else if (util.isMobile.WeChat() || param.from == 'share') {

                        location.href = "login.html?from=coupon.html";
                        return false;

                    }
                }
                this.uesCoupon(element,this.userId, couponid);
            },

            uesCoupon: function (element,userId, couponid) {
                var that = this;

                this.param = {
                    "userId": userId,
                    "activityId": couponid
                };
                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/ticketCenter/getTicket',
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {

                        if (data.code == 1) {
                            util.tip("领取成功！", 3000);
                            $(element).parents('.coupons_box').remove();
                            if($('.coupons_box').length <= 0){
                                $('.coupons_box_null').show();
                            }
                        }
                        else {
                            //code不为1
                            util.tip(data.msg, 3000);
                        }
                    })
                    .fail(function (error) {
                        util.tip(error.msg);
                    });
            },

            '.enter_coupon click': function () {
                var param = can.deparam(window.location.search.substr(1));
                this.userId = busizutil.getUserId();
                if (!this.userId) {
                    if (param.from == 'app') {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {
                                "backurl": "index"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                        return false;
                    } else if (util.isMobile.WeChat() || param.from == 'share') {
                        location.href = "login.html?from=coupon.html";
                        return false;
                    }
                }

                var jsonParams = {
                    'funName': 'back_coupons',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);

            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.from == "app"|| util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    return false;
                }
            },

            //分享
            share:function () {
                var that = this;
                var jsonParams = {
                    'funName': 'shareHandler',
                    'params': {
                        "shouldShare":1,
                        "shareTitle":'领券中心',
                        "shareUrl": that.LOACTION + '/front/coupon.html?from=share',
                        "shareImage":'',
                        "shareContent":'我是谁'
                    },
                };
                console.log(jsonParams.funName);
                LHHybrid.nativeFun(jsonParams);
            },

            '.back click': function () {
                    history.go(-1);
            }
        });

    })
;