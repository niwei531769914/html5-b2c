define('lehu.h5.component.orderDetails', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',

        'imgLazyLoad',
        'lehu.utils.busizutil',

        'text!template_components_orderDetails'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, imagelazyload, busizutil, template_components_orderDetails) {
        'use strict';

        return can.Control.extend({
            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();

                //    去除导航
                this.deleteNav();

                var params = can.deparam(window.location.search.substr(1));

                if (params.hyfrom == 'app') {
                    if (util.isMobile.iOS()) {
                        //token
                        this.localStronge();

                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "订单详情"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }
                }

                this.render();
            },

            initData: function () {

            },

            render: function () {

                var renderFn = can.view.mustache(template_components_orderDetails);
                var html = renderFn(this.options.data);
                this.element.html(html);
                this.request();
            },

            request: function (cparams) {
                var that = this;
                this.user = busizutil.getUserId();
                var params = can.deparam(window.location.search.substr(1));
                this.param = {
                    "orderCode": params.orderCode,
                    "phone": this.user.phone
                };
                $.ajax({
                    method: "get",
                    url: "http://120.55.126.211:8082/myOrderDetail.do",
                    data: this.param
                }).done(function (data) {
                    var bToObj = JSON.parse(data);
                    if (bToObj.type == 1) {
                        var InterfaceData = bToObj.order.orderInfo;
                        var Commodity = bToObj.order.detailsList;
                        var HTML = "";

                        $(".OrderDetailsUserName").empty().html(InterfaceData.CONSIGNEE_NAME);
                        $(".OrderDetailsUserPhone").empty().html(InterfaceData.CONSIGNEE_PHONE);
                        $(".OrderDetailsUserAddress").empty().html(InterfaceData.ADDRESS);
                        $(".OrderDetails-Logistics-number").empty().html(InterfaceData.DELIVERY_CODE);
                        $(".OrderDetailsCommodityName").empty().html(InterfaceData.STORE_NAME);
                        $(".Order-Order-number").empty().html(InterfaceData.ORDER_CODE);
                        $(".Order-content").empty().html(InterfaceData.PAYMENT_DATE);
                        $(".Total-Name-number").empty().html("￥" + InterfaceData.PRICE);

                        for (var i = 0; i < Commodity.length; i++) {
                            HTML += "<li><div class='OrderDetails-commodity-pictures'><img src='http://lehumall.b0.upaiyun.com/" + Commodity[i].IMG + "'/>" +
                                "</div><div class='OrderDetails-commodity-information'><div class='OrderDetails-commodity-information-box'>" +
                                "<p class='OrderDetails-commodity-information-title'>" + Commodity[i].GOODS_NAME + " </p>" +
                                "<p class='OrderDetails-commodity-information-Price'>￥" + Commodity[i].PRICE + "</p></div>" +
                                "<div class='OrderDetails-commodity-information-Specattr'><span class='OrderDetails-commodity-information-Specifications'></span>" +
                                "<span class='OrderDetails-commodity-information-attribute'></span></div><div class='OrderDetails-commodity-information-Taxabox'>" +
                                "<p class='OrderDetails-commodity-information-Taxabox-left'><span class='OrderDetails-commodity-information-Taxation'></span></p>" +
                                "<p class='OrderDetails-commodity-information-Taxabox-right'>X" + Commodity[i].QUANTITY + "</p></div></div></li>"
                            $(".OrderDetails-commodity-Content").empty().html(HTML);
                        }

                    } else {
                        util.tip(data.msg);
                    }
                })
                    .fail(function (error) {
                        util.tip('服务器错误！',3000);
                    })
                ;

            },

            //IOS userid和token 本地存储
            localStronge: function () {
                var jsonParams = {
                    'funName': 'localStronge',
                    'params': {}
                };

                LHHybrid.nativeRegister(jsonParams);
            },

            /*去除header*/
            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.order-list').css('margin-top', '0');
                    return false;
                }
            },

            '.back click': function () {
                history.go(-1);
            }
        });

    });