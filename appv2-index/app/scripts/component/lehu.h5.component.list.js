define('lehu.h5.component.list', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'store',
        'md5',
        'imgLazyLoad',
        'lehu.utils.busizutil',

        'text!template_components_list'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, store, md5, imagelazyload,
              busizutil,
              template_components_list) {
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

                var renderList = can.mustache(template_components_list);
                var html = renderList(this.options);
                this.element.html(html);

                //  去除导航事件
                this.deleteNav();

                //渲染页面
                this.render();

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
                that.getList();
            },

            //楼层列表展示
            getList: function () {

                var that = this;
                var params = can.deparam(window.location.search.substr(1));

                this.param = {
                    "keyword": params.key
                };

                var api = new LHAPI({
                    url: that.URL + "/mobile-web-user/ws/mobile/v1/activePage/pageDetail",
                    data: JSON.stringify(this.param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {

                        //delete 加载
                        $('.nlist_loading').remove();

                        if (data.code == 1) {
                            //定义标题
                            var TITLE = data.response.name;

                            $('title').html(TITLE);
                            $('.header h2').html(TITLE);

                            if (params.hyfrom == 'app') {
                                if (util.isMobile.iOS()) {
                                    //ios设置标题
                                    var jsonParams = {
                                        'funName': 'title_fun',
                                        'params': {
                                            "title": TITLE
                                        }
                                    };
                                    LHHybrid.nativeFun(jsonParams);
                                }
                            }

                            //    render楼层
                            var FLOORLIST = data.response.floorList;

                            for (var i = 0; i < FLOORLIST.length; i++) {
                                if (FLOORLIST[i].type == 1) {
                                    //    楼层1
                                    that.TypeFirst(FLOORLIST[i]);
                                }
                                if (FLOORLIST[i].type == 2) {
                                    //    楼层2
                                    that.TypeTwo(FLOORLIST[i]);
                                }
                                if (FLOORLIST[i].type == 3) {
                                    //    楼层3
                                    that.TypeThree(FLOORLIST[i]);
                                }
                                if (FLOORLIST[i].type == 4) {
                                    //    楼层4
                                    that.TypeFour(FLOORLIST[i]);
                                }
                                if (FLOORLIST[i].type == 5) {
                                    //    楼层5
                                    that.TypeFive(FLOORLIST[i]);
                                }

                            }
                        }
                        else {
                            util.tip(data.msg);
                        }
                    })
                    .fail(function (error) {
                        //delete 加载
                        $('.nlist_loading').remove();
                        util.tip("服务器错误！");
                    });

            },

            TypeFirst: function (floorItem) {
                var html = '';
                html += '<div data-url = "' + floorItem.url + '" class="list-content-image"><img data-img="' + floorItem.img + '" src="images/big_goods_back.png" class="lazyload" /></div>';
                html += '<div class="nhr"></div>';
                $('.list-content').append(html);

                //图片懒加载
                $.imgLazyLoad();
            },

            TypeTwo: function (floorItem) {
                var html = '';
                html += '<div class="list-content-scroll"><img class="content-scroll-top lazyload" data-url = "' + floorItem.url + '"  data-img="' + floorItem.img + '" src="images/big_goods_back.png"/><div class="scroll-goods"><div class="scroll-goods-items"><ul>';

                var RelateGoodsList = floorItem.relateGoodsList;

                //render goodsa
                for (var i = 0; i < RelateGoodsList.length; i++) {
                    html += ' <li data-goodsId = "' + RelateGoodsList[i].productId + '" data-goodsItemId = "' + RelateGoodsList[i].productItemId + '"  ><a href="javascript: void(0)"><div class="goods-item-images" ><img data-img="' + RelateGoodsList[i].imgUrl + '" src="images/goods_back.png" class="item-images-pic lazyload" />';

                    //判断商品是否下架 卢明彪 2017-08-14-12.06
                    if (parseFloat(RelateGoodsList[i].goodsItemStatus) == 21) {
                        html += '<img class="square-item-wuxiao" src="images/pic_wuxiao.png">';
                    }

                    html += '</div><p>' + RelateGoodsList[i].productName + '</p><em>';


                    if (RelateGoodsList[i].price != 0 || RelateGoodsList[i].price != "") {
                        html += '<i>¥' + RelateGoodsList[i].price + '</i><del>¥' + RelateGoodsList[i].originalPrice + '</del>';
                    }
                    else if(RelateGoodsList[i].goodsVipPrice != 0 || RelateGoodsList[i].price != ""){
                        html += '<i>￥' + RelateGoodsList[i].originalPrice + '</i><b>￥' + RelateGoodsList[i].goodsVipPrice + '</b>';
                    }
                    else {
                        html += '<i>¥' + RelateGoodsList[i].originalPrice + '</i>';
                    }

                    html += '</em></a></li>';

                }

                html += '</ul></div></div></div>';

                html += '<div class="nhr"></div>';

                $('.list-content').append(html);

                //图片懒加载
                $.imgLazyLoad();
            },

            TypeThree: function (floorItem) {

                var html = '';
                html += '<div class="banner-title" data-url="' + floorItem.url + '" ><img class="lazyload" data-img="' + floorItem.img + '"  src="images/big_goods_back.png"/><p>' + floorItem.title + '</p></div>';

                html += '<div class="nhr"></div>';

                $('.list-content').append(html);

                //图片懒加载
                $.imgLazyLoad();

            },

            TypeFour: function (floorItem) {

                var html = '<div class="list-content-square"><div class="content-square-title"><p class="square-caption">' + floorItem.title + '</p><span class="square-subhead">' + floorItem.subtitle + '</span></div><div class="content-square-items">';

                var SquareList = floorItem.relateGoodsList;

                for (var i = 0; i < SquareList.length; i++) {
                    html += '<a data-goodsId="' + SquareList[i].productId + '" data-goodsItemId="' + SquareList[i].productItemId + '" href="javascript:void (0)" class="content-square-item"><div class="square-item-images"><img class="square-item-pic lazyload" data-img="' + SquareList[i].imgUrl + '"  src="images/goods_back.png">';

                    //判断商品是否下架 卢明彪 2017-08-14-12.06
                    if (parseFloat(SquareList[i].goodsItemStatus) == 21) {
                        html += '<img class="square-item-wuxiao" src="images/pic_wuxiao.png">';
                    }

                    html += '</div><p>' + SquareList[i].productName + '</p><em>';
                    if (SquareList[i].price == 0 || SquareList[i].price == "") {
                        html += '<i>¥' + SquareList[i].originalPrice + '</i>';
                    }
                    else {
                        html += '<i>¥' + SquareList[i].price + '</i><del>¥' + SquareList[i].originalPrice + '</del>';
                    }

                    html += '</em></a>';
                }

                html += '</div></div>';

                html += '<div class="nhr"></div>';

                $('.list-content').append(html);

                //图片懒加载
                $.imgLazyLoad();
            },

            TypeFive: function (floorItem) {

                var html = '';

                html += '<div class="wealthy">' + floorItem.content + '</div>';

                html += '<div class="nhr"></div>';

                $('.list-content').append(html);

                //图片懒加载
                $.imgLazyLoad();
            },


            //type 1
            '.list-content-image click': function (element, event) {
                var DATAURL = $(element).attr('data-url');
                if (DATAURL == "") {
                    return false
                }
                else {
                    location.href = DATAURL;
                }
            },

            //type 2  banner跳转
            '.content-scroll-top click': function (element, event) {
                var DATAURL = $(element).attr('data-url');
                location.href = DATAURL;
            },

            //type2 goods跳转
            '.scroll-goods ul li, .content-square-item click': function (element, event) {
                var GOODSID = $(element).attr('data-goodsId');
                var GOODSITEMID = $(element).attr('data-goodsItemId');
                this.toDetail(GOODSID, GOODSITEMID);
            },

            //type 3
            '.banner-title click': function (element, event) {
                var DATAURL = $(element).attr('data-url');
                location.href = DATAURL;
            },

            //进入商品详情页
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

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                }
            },

            '.back click': function () {
                history.go(-1);
            }
        });

    })
;