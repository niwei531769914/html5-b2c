define('lehu.h5.component.coupon', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'store',
        'md5',
        //'imagelazyload',
        'lehu.utils.busizutil',

        'text!template_components_coupon'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, store, md5,
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

                this.pageIndex = 1;
                this.totalPageNum = "";
                this.flag = 0;
                this.clear = false;

                var renderList = can.mustache(template_components_coupon);
                var html = renderList(this.options);
                this.element.html(html);

                //  去除导航事件
                this.deleteNav();

                //渲染页面
                this.render();

                //滚动加载
                this.bindScroll();

                var params = can.deparam(window.location.search.substr(1));

                //app登录
                if(params.hyfrom == 'app'){
                    //    分享
                    if (util.isMobile.Android() || util.isMobile.iOS()) {
                        this.share();
                    }

                    //    IOS存userid和token
                    if (util.isMobile.iOS()) {
                        this.localStronge();
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "汇银乐虎全球购-领券中心"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }

                }

            },

            initData: function () {
                var HOST = window.location.host;
                if(HOST.indexOf("https://") == -1){
                    HOST = "https://" + HOST;
                }
                this.URL = HOST;
                //获取当前时间戳
                this.timeStamp = Date.parse(new Date());
            },

            render: function () {
                var that = this;
                that.getCoupon(0);
            },

            //券展示
            getCoupon: function (flag,topage) {

                var that = this;
                this.user = busizutil.getUserId();

                if (!this.user) {
                    this.user = {};
                    this.user.userId = "";
                    this.user.token = "";
                }
                this.param = {
                    "flag": flag,
                    "pageRows": 10,
                    "toPage": topage,
                    "userId": this.user.userId,
                    "strUserId": this.user.userId,
                    "strToken": this.user.token
                };

                var api = new LHAPI({
                    url: that.URL + "/mobile-web-market/ws/mobile/v1/ticketCenter/list",
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {

                        if (data.code == 1) {
                            var COUPONLIST = data.response.list;
                            that.totalPageNum = data.page.pageAmount;

                            if (COUPONLIST == "") {
                                $('.coupons_main').empty();
                                $('.coupons_box_null').show();
                                return false;
                            }

                            if (COUPONLIST && COUPONLIST.length > 0) {
                                var HTML = "";

                                for (var i = 0; i < COUPONLIST.length; i++) {

                                    if (flag == 0) {
                                        if (COUPONLIST[i].type == 1) {
                                            HTML += '<div class="coupons_box total-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>乐虎券</b></em>';
                                        }
                                        else if (COUPONLIST[i].type == 2) {
                                            HTML += '<div class="coupons_box single-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>乐虎券</b></em>';
                                        }
                                    }
                                    else if (flag == 1) {
                                        if (COUPONLIST[i].type == 1) {
                                            HTML += '<div class="coupons_box total-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>' + COUPONLIST[i].storeName + '</b></em>';
                                        }
                                        else if (COUPONLIST[i].type == 2) {
                                            HTML += '<div class="coupons_box single-coupon"><div class="coupons_box_l"> <em><img src="images/coupons/ic_product.png"><b>' + COUPONLIST[i].storeName + '</b></em>';
                                        }
                                    }

                                    HTML += '<span>' + COUPONLIST[i].ticketActivityName + '</span><p>请于' + COUPONLIST[i].useEndTime + '前使用</p></div>';

                                    if (COUPONLIST[i].type == 1) {
                                        HTML += '<div class="coupons_box_r" style="color: #ffffff" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em><b>￥' + COUPONLIST[i].condition2 + '</b>现金券</em> <span>立即领取</span></div></div>';
                                    }
                                    else if (COUPONLIST[i].type == 2) {
                                        HTML += '<div class="coupons_box_s"  style="color: #ffffff" data-id = "' + COUPONLIST[i].ticketActivityId + '"><em>满<b>' + COUPONLIST[i].condition1 + '</b>减<b>' + COUPONLIST[i].condition2 + '</b></em><span >立即领取</span></div></div>';
                                    }
                                }
                            }

                            $('.coupons_box_null').hide();

                            if (that.clear) {

                                $(".coupons_main").append(HTML);
                            }
                            else {

                                $(".coupons_main").show().empty().append(HTML);
                                that.clear = true;
                            }

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
                that.clear = false;
                //init
                that.pageIndex = 1;
                if (element.index() == 1) {
                    that.flag = 1;
                    that.getCoupon(1,that.pageIndex);
                }
                else if (element.index() == 0) {
                    that.flag = 0;
                    that.getCoupon(0,that.pageIndex);
                }

            },

            ".coupons_box_r,.coupons_box_s click": function (element, event) {
                var couponid = element.attr("data-id");

                var param = can.deparam(window.location.search.substr(1));

                this.user = busizutil.getUserId();
                if (!this.user) {
                    if (param.hyfrom) {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {
                                "backurl": "index"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                        return false;
                    } else {

                        location.href = "login.html?hyfrom=coupon.html";
                        return false;

                    }
                }
                this.uesCoupon(element, this.user, couponid);
            },

            /**
             * @author zhangke
             * @description 初始化上拉加载数据事件
             */
            bindScroll: function () {
                var that = this;

                //滚动加载
                var range = 400; //距下边界长度/单位px
                var huadong = true;

                var totalheight = 0;

                $(window).scroll(function () {
                    if (that.pageIndex >= that.totalPageNum) {
                        return;
                    }
                    var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)
                    totalheight = parseFloat($(window).height()) + parseFloat(srollPos); //滚动条当前位置距顶部距离+浏览器的高度

                    if (($(document).height() == totalheight)) {

                        that.pageIndex++;
                        that.getCoupon(that.flag,that.pageIndex);
                    } else {
                        if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range

                            if (huadong) {
                                huadong = false;
                                that.pageIndex++;
                                that.getCoupon(that.flag,that.pageIndex);
                            }
                        } else {

                            huadong = true;
                        }
                    }
                });
            },

            uesCoupon: function (element, user, couponid) {
                var that = this;

                this.param = {
                    "userId": this.user.userId,
                    "strUserId": this.user.userId,
                    "strToken": this.user.token,
                    "activityId": couponid,
                    "timeStamp": that.timeStamp
                };
                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/ticketCenter/getTicket?sign=' + that.encription(this.param),
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == -10) {
                            util.tip(data.msg, 2000);
                            setTimeout(function () {
                                var param = can.deparam(window.location.search.substr(1));
                                if (param.hyfrom) {
                                    var jsonParams = {
                                        'funName': 'login',
                                        'params': {}
                                    };
                                    LHHybrid.nativeFun(jsonParams);
                                } else {

                                    location.href = "login.html?hyfrom=" + escape(location.href);
                                }
                            }, 2000);
                            return false;
                        }
                        if (data.code == 1) {
                            util.tip("领取成功！", 3000);
                            $(element).parents('.coupons_box').remove();
                            if ($('.coupons_box').length <= 0) {
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
                this.user = busizutil.getUserId();
                if (!this.user) {
                    if (param.hyfrom) {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {
                                "backurl": "index"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                        return false;
                    } else {
                        location.href = "login.html?hyfrom=coupon.html";
                        return false;
                    }
                }
                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_coupons',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                }
                else {
                    util.tip("此功能需要下载APP!");
                }
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                }
                if (util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.enter_coupon').hide();
                }
            },

            //分享
            share: function () {
                var that = this;
                var jsonParams = {
                    'funName': 'shareHandler',
                    'params': {
                        "shouldShare": 1,
                        "shareTitle": '乐虎券优惠大放松',
                        "shareUrl": that.URL + '/front/coupon.html',
                        "shareImage": that.URL + '/front/images/Shortcut_114_114.png',
                        "shareContent": '邀小伙伴一起来汇银乐虎享受全球购物体验 领券下单更优惠哦'
                    },
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //IOS userid和token 本地存储
            localStronge: function () {
                var jsonParams = {
                    'funName': 'localStronge',
                    'params': {}
                };

                LHHybrid.nativeRegister(jsonParams);
            },

            //md5加密
            encription: function (params) {
                var Keyboard = '00BE62201707188DE8A63ZGH66D46yTXNREG1423';
                var mdName = 'key=' + Keyboard +'&body=' + JSON.stringify(params);
                return md5(mdName);
            },

            '.back click': function () {
                history.go(-1);
            }
        });

    })
;