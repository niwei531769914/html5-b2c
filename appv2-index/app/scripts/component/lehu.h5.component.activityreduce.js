define('lehu.h5.component.activityreduce', [
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

        'text!template_components_activityreduce'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
              imagelazyload, busizutil,
              template_components_activityreduce) {
        'use strict';

        var DEFAULT_PAGE_INDEX = 1;
        var NODATA = false;

        can.route.ready();

        return can.Control.extend({


            param: {},
            helpers: {
                'lehu-rulers': function (goodsSpecName) {
                    var rulerList = goodsSpecName().split('+');
                    var HTML = "";
                    for (var i = 0; i < rulerList.length; i++) {
                        HTML += "<span>" + rulerList[i] + "</span>"
                    }
                    return HTML;
                },
                'lehu-showDis': function (discount, price, options) {
                    if (_.isFunction(discount)) {
                        discount = discount();
                    }
                    if (_.isFunction(price)) {
                        price = price();
                    }
                    if (parseFloat(discount) < parseFloat(price) && discount != 0) {
                        return options.fn(options.contexts || this);
                    } else {
                        return options.inverse(options.contexts || this);
                    }
                },
                'lehu-images': function (img) {
                    if (_.isFunction(img)) {
                        img = img();
                    }
                    if (img.indexOf('http://') > -1) {
                        return img.replace(/http/, 'https')
                    }
                    else {
                        return img;
                    }
                }
            },

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.initData();
                this.render();

                //app以外打开app事件
                this.bindEvent();

                var params = can.deparam(window.location.search.substr(1));
                //app登录
                if(params.hyfrom == 'app'){

                    if(util.isMobile.Android() || util.isMobile.iOS()){
                        //    分享
                        this.share();
                        //    是否显示购物车
                        this.shoppingCart();
                    }

                    //    IOS存userid和token
                    if (util.isMobile.iOS()) {
                        this.localStronge();
                    }
                }

            },

            initData: function () {
                var HOST = window.location.host;
                if(HOST.indexOf("https://") == -1){
                    HOST = "https://" + HOST;
                }
                this.URL = HOST;
                this.shoppingIsfor = false;
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
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/promotion/reduceGoodsList',
                    data: JSON.stringify(query),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            that.paint(data);
                        }
                    })
            },

            paint: function (data) {
                var params = can.deparam(window.location.search.substr(1));
                var ACTIVITYLIST = data.response.promotionInfo;

                var TITLE = ACTIVITYLIST.activityName;

                $('title').html(TITLE);


                ACTIVITYLIST.supplement = {
                    onLoadingData: false
                };
                if (ACTIVITYLIST.activityImg == "") {
                    ACTIVITYLIST.activityImg = "https://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170629/20170629133401926.jpg";
                }
                else {
                    ACTIVITYLIST.activityImg = data.response.promotionInfo.activityImg;
                }
                this.options.data = new can.Map(ACTIVITYLIST);
                this.options.data.attr("pageIndex", this.pageIndex);
                if (data.page.pageAmount && data.page.pageAmount == 1) {
                    this.options.data.attr("supplement.noData", true);
                }
                else {
                    this.options.data.attr("supplement.noData", false);
                    this.options.data.attr("supplement.onLoadingData", true);
                }

                var renderFn = can.view.mustache(template_components_activityreduce);
                var html = renderFn(this.options.data, this.helpers);
                this.element.html(html);

                $('header h2').empty().html(ACTIVITYLIST.activityName);

                //    去导航条
                this.deleteNav();
                //图片懒加载
                $.imgLazyLoad();
                //下拉刷新
                this.initLoadDataEvent();

                //标题
                if(params.hyfrom == 'app'){
                    if(util.isMobile.Android() || util.isMobile.iOS()){
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title":TITLE
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }
                }

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
                    if (that.options.data.attr("supplement.noData") || that.options.data.attr("goods").length < 10) {

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
                var STOREACTIVITYID = params.storeActivityId;

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

                        console.log(that.options.data.pageIndex);
                        that.options.data.attr("supplement.onLoadingData", false);
                        if (data.response.promotionInfo.goods.length > 0) {
                            _.each(data.response.promotionInfo.goods, function (item) {
                                that.options.data.goods.push(item);
                            });
                            if ( data.page.pageAmount && parseInt(parseInt(that.options.data.pageIndex) + 1) == data.page.pageAmount) {

                                that.options.data.attr("supplement.noData", true);
                            }
                            else {
                                that.options.data.attr("pageIndex", parseInt(that.options.data.pageIndex) + 1);
                                that.options.data.attr("supplement.onLoadingData", true);
                            }
                            //图片懒加载
                            $.imgLazyLoad();
                        }

                    })
            },

            //去商品详情
            ".fullgive-sale-img img,.fullgive-sale-tap click": function (element, event) {

                //app外打开
                var param = can.deparam(window.location.search.substr(1));
                if(!param.hyfrom){
                    $('.app-mask').show();
                    $('.app-native').show();
                    return false;
                }

                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");

                this.toDetail(goodsid, goodsitemid);
            },

            bindEvent: function () {
                $('.app-native-cancel').on('click',function () {
                    $('.app-mask').hide();
                    $('.app-native').hide();
                })
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.fullgive_ad').css('margin-top', 0);
                    return false;
                }
            },

            //加入购物车
            ".fullgive-sale-ct click": function (element, event) {
                var that = this;
                var param = can.deparam(window.location.search.substr(1));

                this.user = busizutil.getUserId();
                if (!this.user) {
                    if (param.hyfrom) {
                        var jsonParams = {
                            'funName': 'login',
                            'params': {}
                        };
                        LHHybrid.nativeFun(jsonParams);
                        return false;

                    } else {

                        location.href = "login.html?hyfrom=" + escape(location.href);
                        return false;
                    }
                }

                if(that.shoppingIsfor){
                    return false;
                }
                that.shoppingIsfor = true;

                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                var stroeId = element.attr("data-storeid");

                var query = {
                    "userId": this.user.userId,
                    "strToken": this.user.token,
                    "strUserId": this.user.userId,
                    "goodsId": goodsid,
                    "storeId": stroeId,
                    "goodsItemId": goodsitemid,
                    "quantity": 1
                }

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-trade/ws/mobile/v1/cart/add',
                    data: JSON.stringify(query),
                    method: 'post'
                });

                api.sendRequest()
                    .done(function (data) {
                        if (data.code == -10) {
                            util.tip(data.msg, 2000);
                            setTimeout(function () {
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

                        }
                        else if (data.code == 1) {

                            util.tip("成功加入购物车！", 3000);
                            setTimeout(function () {
                                that.shoppingIsfor = false;
                            },3000)
                        }
                        else {
                            util.tip(data.msg, 3000);
                            setTimeout(function () {
                                that.shoppingIsfor = false;
                            },3000)
                        }
                    })
                    .fail(function (error) {
                        util.tip("服务器错误！", 3000);
                    });
            },

            // 去购物车
            shoppingCart: function (element, event) {
                var jsonParams = {
                    'funName': 'goto_shopping_cart',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            toDetail: function (goodsid, goodsitemid) {
                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': goodsid,
                        'goodsItemId': goodsitemid
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            //分享
            share: function () {
                var param = can.deparam(window.location.search.substr(1));
                var that = this;
                var jsonParams = {
                    'funName': 'shareHandler',
                    'params': {
                        "shouldShare": 1,
                        "shareTitle": '满减专区，优惠享不停',
                        "shareUrl": that.URL + '/front/activityreduce.html?activityId=' + param.activityId + '&storeActivityId=' + param.storeActivityId,
                        "shareImage": that.URL + '/front/images/Shortcut_114_114.png',
                        "shareContent": '来汇银乐虎淘好货 你也来参加吧》》'
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

            '.back click': function () {
                history.go(-1);
            }
        });

    });