define('lehu.h5.component.activitydonate', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',
        'store',

        'imagelazyload',
        'lehu.utils.busizutil',

        'text!template_components_activitydonate'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
              imagelazyload, busizutil,
              template_components_activitydonate) {
        'use strict';

        var DEFAULT_PAGE_INDEX = 1;
        var NODATA = false;

        can.route.ready();

        return can.Control.extend({

            helpers: {
                // 'lehu-img': function (imgprefix, img) {
                //     if (_.isFunction(img)) {
                //         img = img();
                //     }
                //
                //     if (_.isFunction(imgprefix)) {
                //         imgprefix = imgprefix();
                //     }
                //
                //     if (img.indexOf("http://") > -1) {
                //         return img;
                //     }
                //
                //     return imgprefix + img;
                // },
                //
                // 'lehu-showDis': function (discount, price, options) {
                //     if (_.isFunction(discount)) {
                //         discount = discount();
                //     }
                //     if (_.isFunction(price)) {
                //         price = price();
                //     }
                //     if (parseFloat(discount) < parseFloat(price) && discount != 0) {
                //         return options.fn(options.contexts || this);
                //     } else {
                //         return options.inverse(options.contexts || this);
                //     }
                // }
            },

            param: {},

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();
                this.render();

            },

            initData: function () {
                var HOST = window.location.host;
                if(HOST.indexOf('118')>1){
                    this.URL = 'http://118.178.227.135';
                }
                else {
                    this.URL = 'http://121.196.208.98:28080';
                }
            },

            render: function () {
                var params = can.deparam(window.location.search.substr(1));
                this.request({
                    pageIndex: params.pageIndex,
                    activityId: params.activityId,
                    storeActivityId: params.storeActivityId
                });
            },

            request: function (cparams) {
                var that = this;
                this.pageIndex = cparams.pageIndex;
                if (!this.pageIndex) {
                    this.pageIndex = DEFAULT_PAGE_INDEX;
                }
                var query = {
                    toPage: this.pageIndex,
                    pageRows: 10,
                    activityId: cparams.activityId,
                    storeActivityId: cparams.storeActivityId
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/promotion/donateGoodsList',
                    data: JSON.stringify(query),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if(data.code == 1) {
                            that.paint(data);
                        }
                    })
            },

            paint: function (data) {

                var ACTIVITYLIST = data.response.promotionInfo;
                var renderFn = can.view.mustache(template_components_activitydonate);
                ACTIVITYLIST.supplement = {
                    onLoadingData: false
                };
                if (ACTIVITYLIST.activityImg == "") {
                    ACTIVITYLIST.activityImg = "https://m.360buyimg.com/mobilecms/s720x322_jfs/t5380/53/518840503/167832/4849cc1b/5901bc2eNbed21d23.jpg!q70.jpg";
                }
                else {
                    ACTIVITYLIST.activityImg = data.response.promotionInfo.activityImg;
                }
                this.options.data = new can.Map(ACTIVITYLIST);
                //this.options.data.attr("imgprefix", this.URL.IMAGE_URL);
                this.options.data.attr("pageIndex", this.pageIndex);

                this.options.data.attr("supplement.noData", false);
                var html = renderFn(this.options.data);
                this.element.html(html);
                //    去导航条
                this.deleteNav();

                this.initLoadDataEvent();
            },

            /**
             * @author zhangke
             * @description 初始化上拉加载数据事件
             */
            initLoadDataEvent: function () {
                var that = this;
                var renderData = this.options.data;
                //节流阀
                var loadingDatas = function () {
                    if (that.options.data.attr("supplement.noData") || that.options.data.attr("supplement.onLoadingData")|| that.options.data.attr("goods").length<10) {
                        return false;
                    }
                    var srollPos = $(window).scrollTop(); //滚动条距离顶部的高度
                    var windowHeight = $(window).height(); //窗口的高度
                    var dbHiht = $("#content").height(); //整个页面文件的高度

                    if ((windowHeight + srollPos + 200) >= (dbHiht)) {

                        that.loadingData();
                    }
                };

                $(window).scroll(_.throttle(loadingDatas, 200));
            },

            loadingData: function (cparams) {

                var that = this;
                that.options.data.attr("supplement.onLoadingData", true);

                var params = can.deparam(window.location.search.substr(1));
                var ACTIVITYID = params.activityId;
                var STOREACTIVITYID = params.activityId;
                var query = {
                    toPage: parseInt(this.options.data.pageIndex) + 1,
                    pageRows: 10,
                    activityId: ACTIVITYID,
                    storeActivityId: STOREACTIVITYID
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/promotion/reduceGoodsList',
                    data: JSON.stringify(query),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        that.options.data.attr("supplement.onLoadingData", false);
                        if (data.response.promotionInfo.goods) {
                            _.each(data.response.promotionInfo.goods, function (item) {
                                that.options.data.goods.push(item);
                            });

                            that.options.data.attr("pageIndex", parseInt(that.options.data.pageIndex) + 1);
                            that.options.data.attr("supplement.onLoadingData", false);
                        } else {
                            that.options.data.attr("supplement.noData", true);
                        }

                    })
            },

            //去商品详情
            ".fullgive_list img click": function (element, event) {
                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                this.toDetail(goodsitemid, goodsid);
            },

            //加入购物车
            //加入购物车
            ".fullgive-sale-ct click": function (element, event) {
                var param = can.deparam(window.location.search.substr(1));

                this.userId = busizutil.getUserId();
                alert(this.userId);
                if (!this.userId) {
                    if (util.isMobile.WeChat() || param.from == 'share') {
                        location.href = "login.html?from=" + escape(location.href);
                        return false;
                    } else {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {}
                        };
                        LHHybrid.nativeFun(jsonParams);
                        return false;
                    }
                }
                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                var stroeId = element.attr("data-storeid");

                var query = {
                    userId: this.userId,
                    goodsId: goodsid,
                    storeId: stroeId,
                    goodsItemId: goodsitemid,
                    quantity: 0
                }

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-trade/ws/mobile/v1/cart/add',
                    data: JSON.stringify(query),
                    method: 'post'
                });

                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            util.tip("成功加入购物车！", 3000);
                        }
                        else {
                            util.tip(data.msg, 3000);
                        }
                    })
                    .fail(function (error) {
                        util.tip("服务器错误！", 3000);
                    });
            },
            //去购物车
            "#gotocart click": function (element, event) {

                var jsonParams = {
                    'funName': 'goto_shopping_cart',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            toDetail: function (STORE_ID, GOODS_NO) {
                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': STORE_ID,
                        'goodsItemId': GOODS_NO
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.from == "app") {
                    $('.header').hide();
                    $('.fullgive_ad').css('top',0);
                    return false;
                }
            },

            '.back click': function () {

                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_fun',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                } else {
                    history.go(-1);
                }
            }
        });

    });