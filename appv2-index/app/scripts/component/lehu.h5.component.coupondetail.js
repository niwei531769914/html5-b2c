define('lehu.h5.component.coupondetail', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',

        'imgLazyLoad',
        'lehu.utils.busizutil',

        'text!template_components_coupondetail'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid,
              imagelazyload, busizutil,
              template_components_coupondetail) {
        'use strict';

        return can.Control.extend({

            param: {},

            helpers: {
                'lehu-showtime': function (time) {
                    var TIME = time;
                    var mass = new Date(TIME);
                    var m = mass.getMonth() + 1;
                    m = m < 10 ? '0' + m : m;
                    var d = mass.getDate();
                    d = d < 10 ? ('0' + d) : d;
                    return m + "." + d;
                }
            },
            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();
                this.render();

            },

            isShow:function () {
                if (util.isMobile.WeChat()|| util.isMobile.QQ()) {
                    $('.bt_share').show();
                }
                else {

                    $('.bt_share').hide();
                }
            },

            isEnd: function () {
                var that = this;
                var activeId = $(".coupons_main").attr("data-id");

                this.user = busizutil.getUserId();
                if (this.user) {
                    this.param = {
                        "userId": this.user.userId,
                        "strUserId": this.user.userId,
                        "strToken": this.user.token,
                        "activityId": activeId
                    };

                    var api = new LHAPI({
                        url:  that.URL + "/mobile-web-market/ws/mobile/v1/ticketCenter/getCouponInfo",
                        data: JSON.stringify(this.param),
                        method: 'post'
                    });
                    api.sendRequest()
                        .done(function (data) {
                            if (data.code == 400004) {
                                $(".coupons_main").addClass("end");
                                $(".coupons_main i").empty().html('已领取');

                            }
                            else if (data.code == 400006) {
                                util.tip(data.msg, 3000);
                            }
                            else {
                                $(".coupons_main").removeClass("end");
                            }
                        })
                        .fail(function (error) {
                            util.tip("服务器错误！");
                        });
                }
            },

            "#sharetip click": function (element, event) {
                $("#sharetip").hide();
            },

            ".bt_share click": function (element, event) {
                var param = can.deparam(window.location.search.substr(1));

                if (util.isMobile.WeChat()|| util.isMobile.QQ()) {
                    $("#sharetip").show();
                    return false;
                }

                // var jsonParams = {
                //   'funName': 'share_fun',
                //   'params': {
                //     'title': "汇银乐虎全球购-领券中心",
                //     'type': "1",
                //     'video_img': "",
                //     'shareUrl': 'http://' + window.location.host + "/html5/app/coupon.html?from=share",
                //     'shareImgUrl': "http://app.lehumall.com/html5/app/images/Shortcut_114_114.png",
                //     'text': "汇银乐虎全球购，赶紧领取优惠券吧，手慢无！"
                //   }
                // };
                // LHHybrid.nativeFun(jsonParams);
            },

            initData: function () {
                var HOST = window.location.host;
                if (HOST.indexOf("http://") == -1) {
                    HOST = "http://" + HOST;
                }
                this.URL = HOST;
            },

            render: function () {
                var that = this;
                var param = can.deparam(window.location.search.substr(1));

                this.param = {
                    "activityId": param.id
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/ticketCenter/getCouponInfo',
                    data: JSON.stringify(this.param),
                    method: 'post'
                });

                api.sendRequest()
                    .done(function (data) {

                        if (data.code !== 1) {
                            util.tip("客官来晚喽，券已经被领完啦");
                            $("#content").empty();
                            return false;
                        }

                        if (data.code == 1) {
                            that.options.data = data.response;
                            document.title = "汇银乐虎";
                        }

                        if (that.options.data.lhqType == "2") {
                            that.options.data.tip = "满" + that.options.data.condition1 + "使用";
                        } else if (that.options.data.lhqType == "1") {
                            that.options.data.tip = "无门槛乐虎券";
                        }

                        var renderList = can.mustache(template_components_coupondetail);
                        var html = renderList(that.options, that.helpers);
                        that.element.html(html);

                        //微信、qq打开
                        that.isShow();

                        that.isEnd();

                    })
                    .fail(function (error) {
                        util.tip(error.msg);
                    });
            },

            getCoupon: function (user, acitveId) {
                var that = this;

                this.param = {
                    "userId": user.userId,
                    "strUserId": user.userId,
                    "strToken": user.token,
                    "activityId": acitveId
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/ticketCenter/drawCoupon',
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if(data.code == 1){
                            util.tip("领取成功！",3000);

                            $(".coupons_main").addClass("end");

                            $(".coupons_main").removeClass("disabled");
                        }
                        else {
                            util.tip(data.msg,3000);
                        }

                    })
                    .fail(function (error) {
                        util.tip(error.msg);
                        $(".coupons_main").removeClass("disabled");
                    });
            },

            ".coupons_main click": function (element, event) {

                if ($(".coupons_main").hasClass("end") || $(".coupons_main").hasClass("disabled")) {
                    util.tip("您已经领取过了！", 3000);
                    return false;
                }

                var couponid = element.attr("data-id");
                var param = can.deparam(window.location.search.substr(1));

                this.user = busizutil.getUserId();
                if (!this.user) {
                    location.href = "login.html?hyfrom=" + escape(location.href);
                    return false;
                }

                $(".coupons_main").addClass("disabled");
                this.getCoupon(this.user, couponid);
            }

        });

    });