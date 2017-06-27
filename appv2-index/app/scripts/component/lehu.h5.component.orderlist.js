define('lehu.h5.component.orderlist', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',
        'store',
        'imgLazyLoad',

        'lehu.utils.busizutil',
        'text!template_components_orderlist'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store, imgLazyLoad, busizutil, template_components_orderlist) {
        'use strict';


        return can.Control.extend({
            /**
             * @override
             * @description 初始化方法
             */
            init: function () {

                this.initDate();

                var renderList = can.mustache(template_components_orderlist);
                var html = renderList(this.options);
                this.element.html(html);

                //    去除导航
                this.deleteNav();

                //渲染页面
                this.render();

                var params = can.deparam(window.location.search.substr(1));

                if (params.hyfrom == 'app') {

                    if (util.isMobile.iOS()) {
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "我的订单"
                            }
                        }
                        LHHybrid.nativeFun(jsonParams);
                    }
                }
            },

            initDate: function () {

            },

            render: function () {
                var that = this;
                this.user = busizutil.getUserId();

                var params = {
                    'phone': this.user.phone
                };

                $.ajax({
                    url: 'http://120.55.126.211:8082/myOrderList.do',
                    data: params,
                    method: 'get',
                    success: function (data) {
                        var result = JSON.parse(data);
                        if (result.type == 1) {

                            var html = '';
                            var ORDERLIST = result.orderList;
                            console.log(ORDERLIST.length);
                            if(ORDERLIST.length == 0){
                                $('.order-no-order').show();
                                return false;
                            }
                            for(var i = 0; i < ORDERLIST.length; i++){
                                 html += '<div class="order-list-item"><div class="list-item-des"><span class="item-des-name">' + ORDERLIST[i].STORE_NAME + '</span> <a href="javascript:void (0)" class="item-des-go">' + ORDERLIST[i].STATUS_NAME + '</a></div>';

                                 var ORDERDETAILLIST = ORDERLIST[i].orderDetalList;

                                 html += '<div class="list-item-goods">';

                                 for( var j = 0; j < ORDERDETAILLIST.length; j++) {

                                     html += '<div class="item-goods"><img src="http://lehumall.b0.upaiyun.com/' + ORDERDETAILLIST[j].GOODS_IMG +'" class="item-goods-image"><div class="item-goods-title"><div class="item-goods-sc"><span class="item-goods-name">' + ORDERDETAILLIST[j].GOODS_NAME + '</span>';

                                     var PRICE = (parseFloat(parseFloat(ORDERDETAILLIST[j].PRICE).toFixed(2))*parseFloat(ORDERDETAILLIST[j].QUANTITY)).toFixed(2);

                                     html += '<span class="item-goods-price">￥' + PRICE + '</span></div></div><span class="item-goods-quantity">×<em>' + ORDERDETAILLIST[j].QUANTITY + '</em></span>';
                                     html +='</div>';
                                 }
                                 html += '</div>';

                                 html += '<div class="list-item-prices"> <span>实际支付:<em>¥' + ORDERLIST[i].PRICE +'</em></span></div>';

                                 html += '<div class="nhr"></div>';
                                 html += '</div>';
                            }

                            //rend
                             $('.order-list').empty().append(html);
                        }
                        else {
                            util.tip(result.msg);
                        }
                    },
                    error: function (error) {
                        console.log(error);
                    }
                })

            },

            //进入订单详情页
            '.order-list-item click':function () {
                alert('123456789');
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