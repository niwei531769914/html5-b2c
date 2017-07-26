define('lehu.h5.component.timeLimit', [
 
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'md5',
        'store',
        'imgLazyLoad',
        'iScroll',

        'lehu.utils.busizutil',
        'text!template_components_timeLimit'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store, imgLazyLoad, iScroll, busizutil, template_components_timeLimit) {
        'use strict';


        return can.Control.extend({
            /**
             * @override
             * @description 初始化方法
             */
            init: function () {

                this.initDate();

                var renderList = can.mustache(template_components_timeLimit);
                var html = renderList(this.options);
                this.element.html(html);

                this.juli = 0; //距离开始时间
                this.clear = false;

                this.pageIndex = 1;
                this.totalPageNum = "";
                this.status = null;
                this.activityId = null;

                //    去除导航
                this.deleteNav();
                //渲染页面
                this.render();

                //滚动加载
                this.bindScroll();

                var params = can.deparam(window.location.search.substr(1));

                if (params.hyfrom == 'app') {
                    //    分享
                    if (util.isMobile.Android() || util.isMobile.iOS()) {
                        this.share();
                    }

                    if (util.isMobile.iOS()) {
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "汇银乐虎全球购-限时折扣"
                            }
                        }
                        LHHybrid.nativeFun(jsonParams);
                    }

                }

            },

            initDate: function () {
                var HOST = window.location.host;
                if (HOST.indexOf("https://") == -1) {
                    HOST = "https://" + HOST;
                }
                this.URL = HOST;

                //页面滚动无法触发页面事件
                this.TOUCH = false;
            },

            render: function () {

                var that = this;
                var api = new LHAPI({
                    url: that.URL + "/mobile-web-market/ws/mobile/v1/activity/timelimitDiscount",
                    //url: "http://app.lehumall.com/mobile-web-market/ws/mobile/v1/activity/timelimitDiscount",
                    data: {},
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            var TABLIST = data.response;

                            if (TABLIST == "") {

                                $(".nlist_no_activity").show();
                                return false;
                            }
                            var html = "";

                            //活动都未开始; 取第一场未开始  2 status
                            if (that.isStatus(TABLIST) == 2) {
                                html += " <a href='javascript:void (0)' class='active' status = " + TABLIST[0].status + "  activityid = " + TABLIST[0].activityId + ">" + TABLIST[0].dateStr + "点场</a>";
                                that.status = TABLIST[0].status;
                                that.activityId = TABLIST[0].activityId;
                                for (var j = 1; j < TABLIST.length; j++) {
                                    html += "<a  href='javascript:void (0)'  status = " + TABLIST[j].status + "  activityid = " + TABLIST[j].activityId + ">" + TABLIST[j].dateStr + "点场</a>";
                                }
                                html += "<div class='tabs-title'>";
                                for (var k = 0; k < TABLIST.length; k++) {
                                    if (k == 0) {
                                        html += "<div class = 'time-title'><span class='time-title-count'>本次抢购即将开始</span></div>"
                                    }
                                    else {
                                        html += "<div class = 'time-title' style='display: none'><span class='time-title-count'>本次抢购即将开始</span></div>"
                                    }
                                }
                                html += "</div>";

                            }

                            //活动都结束; 取最后一场3 status
                            else if (that.isStatus(TABLIST) == 3) {
                                for (var l = 0; l < TABLIST.length - 1; l++) {
                                    html += " <a  href='javascript:void (0)'  status = " + TABLIST[l].status + "  activityid = " + TABLIST[l].activityId + ">" + TABLIST[l].dateStr + "点场</a>";
                                }
                                html += " <a href='javascript:void (0)'  class='active' status = " + TABLIST[TABLIST.length - 1].status + "  activityid = " + TABLIST[TABLIST.length - 1].activityId + ">" + TABLIST[TABLIST.length - 1].dateStr + "点场</a>";
                                that.status = TABLIST[TABLIST.length - 1].status;
                                that.activityId = TABLIST[TABLIST.length - 1].activityId;

                                html += "<div class='tabs-title'>";
                                for (var s = 0; s < TABLIST.length; s++) {
                                    if (s == TABLIST.length - 1) {
                                        html += "<div class = 'time-title'><span class='time-title-count'>本次抢购已经结束</span></div>"
                                    }
                                    else {
                                        html += "<div class = 'time-title' style='display: none'><span class='time-title-count'>本次抢购已经结束</span></div>"
                                    }
                                }
                                html += "</div>";
                            }
                            //活动status有2有3有1; 取2 status
                            else if (that.isStatus(TABLIST) == 1) {
                                for (var i = 0; i < TABLIST.length; i++) {

                                    //判断抢购时间
                                    if (TABLIST[i].status == 1) {
                                        that.activityId = TABLIST[i].activityId;
                                        that.status = TABLIST[i].status;
                                        html += "<a  href='javascript:void (0)'  class='active' status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">正在抢购</a>";
                                    } else {
                                        html += "<a href='javascript:void (0)'  status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">" + TABLIST[i].dateStr + "点场</a>";
                                    }

                                }
                                html += "<div class='tabs-title'>";
                                for (var j = 0; j < TABLIST.length; j++) {

                                    if (TABLIST[j].status == 3) {
                                        html += "<div class = 'time-title' style='display: none'><span class='time-title-count'>本次抢购已经结束</span></div>";
                                    }
                                    else if (TABLIST[j].status == 2) {
                                        html += "<div class = 'time-title' style='display: none'><span class='time-title-count'>本次抢购即将开始</span></div>";
                                    }
                                    else if (TABLIST[j].status == 1) {
                                        html += "<div class = 'time-title'><span class='time-title-count time-title-count-1'>本场结束还剩<em>00</em>:<em>00</em>:<em>00</em></span></div>";
                                        that.juli = TABLIST[j].endTime;
                                    }
                                }
                                html += "</div>";
                            }
                            else {
                                var tag = true;
                                var tags = true;
                                for (var i = 0; i < TABLIST.length; i++) {
                                    //判断抢购时间
                                    if (tag) {
                                        if (TABLIST[i].status == 2) {
                                            that.activityId = TABLIST[i].activityId;
                                            that.status = TABLIST[i].status;
                                            html += " <a href='javascript:void (0)'  class='active' status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">" + TABLIST[i].dateStr + "点场</a>";
                                            tag = false
                                        } else {
                                            html += "<a href='javascript:void (0)'  status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">" + TABLIST[i].dateStr + "点场</a>";
                                        }
                                    }
                                    else if (!tag) {
                                        html += " <a href='javascript:void (0)'  status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">" + TABLIST[i].dateStr + "点场</a>";
                                    }
                                }
                                html += "<div class='tabs-title'>";
                                for (var s = 0; s < TABLIST.length; s++) {
                                    if (tags) {
                                        if (TABLIST[s].status == 3) {
                                            html += "<div class = 'time-title' style='display: none'><span class='time-title-count'>本次抢购已经结束</span></div>";
                                        }
                                        else if (TABLIST[s].status == 2) {

                                            html += "<div class = 'time-title' ><span class='time-title-count'>本次抢购即将开始</span></div>";
                                            tags = false;
                                        }
                                    }
                                    else if (!tags) {
                                        html += "<div class = 'time-title' style='display: none'><span class='time-title-count'>本次抢购即将开始</span></div>";
                                    }
                                }
                                html += "</div>";
                            }

                            //清楚加载
                            $('.loading-date').hide();

                            //渲染时间点
                            $(".tabs").show().empty().append(html);
                            $(".tabs").css("background", "#f5a623");
                            $(".tabs").css("box-shadow", "0px 1px 4px 0px rgb( 225, 225, 225 )");
                            //倒计时插入
                            that.renderSecondkillList(data.nowTime, that.juli);
                            that.countDown();
                            //倒计时
                            setInterval(function () {
                                that.countDown();
                            }, 1000);
                        }

                        that.sendRequest(that.activityId, that.status);
                    })
                    .fail(function (error) {
                        util.tip("服务器错误！");
                    })
            },

            //判断活动状态
            isStatus: function (tablist) {
                for (var i = 0; i < tablist.length; i++) {
                    if (tablist[0].status == 2) {
                        return tablist[i];
                    }
                    else if (tablist[tablist.length - 1].status == 3) {
                        return tablist[i].status;
                    }
                    else if (tablist[i].status == 1) {
                        return tablist[i].status;
                    }
                }
            },

            ".tabs a click": function (element, event) {
                var that = this;

                if (that.TOUCH) {
                    return false;
                }

                if (element.hasClass('active')) {
                    return false;
                }

                that.clear = false;  //是否清楚容器
                $(".time-sale-main").empty();
                $(".nlist_nomore").css("display", "none");
                $(".loading-date").css("display", "block");
                var Index = $(element).index();
                $(".tabs .active").removeClass('active');
                element.addClass('active');
                $('.time-title').eq(Index).show().siblings().hide();
                that.pageIndex = 1;
                that.activityId = $(element).attr("activityid");
                that.status = $(element).attr("status");
                that.sendRequest(that.activityId, that.status);
            },

            //剩余时间
            renderSecondkillList: function (nowTime, endTime) {
                var that = this;
                var nowtime = parseFloat(nowTime);
                var endtime = parseFloat(endTime);
                that.juli = endtime - nowtime; //剩余时间

            },

            countDown: function () {
                var that = this;
                var hours;
                var minutes;
                var seconds;

                hours = Math.floor(that.juli / 3600);
                minutes = Math.floor((that.juli % 3600) / 60);
                seconds = Math.floor(that.juli % 60);

                if (hours < 10) hours = '0' + hours;
                if (minutes < 10) minutes = '0' + minutes;
                if (seconds < 10) seconds = '0' + seconds;

                $(".time-title-count-1").empty().append("本场结束还剩<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
                --that.juli;

                if (that.juli == 0) {
                    window.location.reload();
                }
            },

            sendRequest: function (activityId, status) {
                var that = this;
                var param = {
                    "activityId": activityId,
                    "page": that.pageIndex,
                    "pageSize": 10
                };
                var api = new LHAPI({
                    url: that.URL + "/mobile-web-market/ws/mobile/v1/activity/timelimitList",
                    //url: "http://app.lehumall.com/mobile-web-market/ws/mobile/v1/activity/timelimitList",
                    data: JSON.stringify(param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            var BOXLIST = data.response.seckillListVO;
                            that.totalPageNum = data.response.totalPage;
                            if (BOXLIST == "") {
                                $(".loading-date").hide();
                                return false;
                            }
                            var HTML = "";
                            for (var i = 0; i < BOXLIST.length; i++) {
                                //状态为1
                                if (status == 1) {
                                    HTML += "<div class='time-sale-box'  data-goodsid = '" + BOXLIST[i].goodsId + "' data-goodsItemId = '" + BOXLIST[i].goodsItemId + "' ><a  href='javascript:void (0)'  class='time-sale-img'>";

                                    if (parseFloat(BOXLIST[i].total) >= 1) {

                                        HTML += "<img class='lazyload'  data-img='" + that.HTTP_NO(BOXLIST[i].imgUrl) + "' src='images/goods_back.png'>";

                                    } else if (parseFloat(BOXLIST[i].total) == 0) {

                                        HTML += "<img class='lazyload'  style='opacity:.7;' data-img='" + that.HTTP_NO(BOXLIST[i].imgUrl) + "' src='images/goods_back.png'><b><img src='images/qiangwan.png'/></b>"

                                    }

                                    HTML += "</a><a  href='javascript:void (0)'  class='time-sale-title'>" + BOXLIST[i].name + "</a><div class='time-sale-msg'><a  href='javascript:void (0)'  class='time-sale-ruler'>";
                                    if (BOXLIST[i].goodsSpecName) {
                                        var goodsSpecName = BOXLIST[i].goodsSpecName;
                                        var goodsrulers = [];
                                        goodsrulers = goodsSpecName.split('+');
                                        for (var j = 0; j < goodsrulers.length; j++) {
                                            HTML += "<span>" + goodsrulers[j] + "</span>";
                                        }
                                    }
                                    HTML += "</a><em class='time-sale-price'>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em>";


                                    if (parseFloat(BOXLIST[i].total) >= 1) {

                                        var TOTAL = BOXLIST[i].total;
                                        var INITTOTAL = BOXLIST[i].originalTotal;

                                        var TOTALWIDTH = (parseFloat(TOTAL) / parseFloat(INITTOTAL) * 100) + "%";

                                        HTML += "<div class='time-sale-btn'><span><em class='time-sale-tab'>还剩" + BOXLIST[i].total + "件</em><em class='time-sale-process' style='width: " + TOTALWIDTH + "'></em></span><a  href='javascript:void (0)'   data-goodsid = '" + BOXLIST[i].goodsId + "' data-goodsItemId = '" + BOXLIST[i].goodsItemId + "' class='time-sale-bt'>立即抢</a></div></div></div>";

                                    }
                                    else if (parseFloat(BOXLIST[i].total) == 0) {
                                        HTML += "<div class='time-sale-btn'><a  href='javascript:void (0)'  class='time-sale-ct'>已结束</a></div></div></div>";
                                    }
                                }
                                //状态为2
                                if (status == 2) {

                                    HTML += "<div class='time-sale-box'  data-goodsid = '" + BOXLIST[i].goodsId + "' data-goodsItemId = '" + BOXLIST[i].goodsItemId + "'><a  href='javascript:void (0)'  class='time-sale-img'><img class='lazyload'  data-img='" + that.HTTP_NO(BOXLIST[i].imgUrl) + "' src='images/goods_back.png'></a><a  href='javascript:void (0)'  class='time-sale-title'>" + BOXLIST[i].name + "</a><div class='time-sale-msg'><a  href='javascript:void (0)'  class='time-sale-ruler'>";

                                    if (BOXLIST[i].goodsSpecName) {
                                        var goodsSpecName = BOXLIST[i].goodsSpecName;
                                        var goodsrulers = [];
                                        goodsrulers = goodsSpecName.split('+');
                                        for (var j = 0; j < goodsrulers.length; j++) {
                                            HTML += "<span>" + goodsrulers[j] + "</span>";
                                        }
                                    }
                                    HTML += "</a><em class='time-sale-price'>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><span><em class='time-sale-tab'>还剩" + BOXLIST[i].total + "件</em></span><a  href='javascript:void (0)'  class='time-sale-st'>即将开始</a></div></div></div>"
                                }

                                //状态为3
                                if (status == 3) {
                                    HTML += "<div class='time-sale-box'  data-goodsid = '" + BOXLIST[i].goodsId + "' data-goodsItemId = '" + BOXLIST[i].goodsItemId + "'><a  href='javascript:void (0)'  class='time-sale-img'>";

                                    if (BOXLIST[i].total == 0) {

                                        HTML += "<img class='lazyload'  style='opacity:.7;' data-img='" + that.HTTP_NO(BOXLIST[i].imgUrl) + "' src='images/goods_back.png'><b><img src='images/qiangwan.png'/></b>"

                                    } else if (BOXLIST[i].total >= 1) {

                                        HTML += "<img  class='lazyload'  data-img='" + that.HTTP_NO(BOXLIST[i].imgUrl) + "' src='images/goods_back.png'>";
                                    }

                                    HTML += "</a><a  href='javascript:void (0)'  class='time-sale-title'>" + BOXLIST[i].name + "</a><div class='time-sale-msg'><a  href='javascript:void (0)'  class='time-sale-ruler'>";

                                    if (BOXLIST[i].goodsSpecName) {
                                        var goodsSpecName = BOXLIST[i].goodsSpecName;
                                        var goodsrulers = [];
                                        goodsrulers = goodsSpecName.split('+');
                                        for (var j = 0; j < goodsrulers.length; j++) {
                                            HTML += "<span>" + goodsrulers[j] + "</span>";
                                        }
                                    }

                                    HTML += "</a><em class='time-sale-price'>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><a  href='javascript:void (0)'  class='time-sale-ct'>已结束</a></div></div></div>";
                                }

                            }
                            if (that.pageIndex == that.totalPageNum) {
                                that.nlist_no();
                            }

                            if (that.clear) {
                                $(".time-sale-main").append(HTML);
                            }
                            else {
                                $(".time-sale-main").show().empty().append(HTML);
                                that.clear = true;
                            }

                            //图片懒加载
                            $.imgLazyLoad();

                        }
                        else {
                            util.tip(data.msg);
                            $(".loading-date").css("display", "none");
                        }
                    })
                    .fail(function (error) {
                        $(".loading-date").css("display", "none");
                        util.tip("服务器错误！");
                    })
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

                    var topValue = 0;
                    var interval = null;

                    //解决页面滚动出现事件穿透Bug
                    //实时监听浏览器滚动条状态
                    if (interval == null) {
                        interval = setInterval(test, 300);
                        topValue = $(window).scrollTop();
                        that.TOUCH = true;
                    }

                    function test() {
                        // 判断此刻到顶部的距离是否和1秒前的距离相等
                        if ($(window).scrollTop() == topValue) {
                            clearInterval(interval);
                            interval = null;
                            that.TOUCH = false;
                        }
                    };


                    var srollPos = $(window).scrollTop(); //滚动条距顶部距离(页面超出窗口的高度)

                    if (that.pageIndex >= that.totalPageNum) {
                        return;
                    }

                    totalheight = parseFloat($(window).height()) + parseFloat(srollPos); //滚动条当前位置距顶部距离+浏览器的高度

                    if (($(document).height() == totalheight)) {

                        that.pageIndex++;
                        that.sendRequest(that.activityId, that.status);
                    } else {
                        if (($(document).height() - totalheight) <= range) { //页面底部与滚动条底部的距离<range

                            if (huadong) {
                                huadong = false;
                                that.pageIndex++;
                                that.sendRequest(that.activityId, that.status);
                            }
                        } else {

                            huadong = true;
                        }
                    }
                });
            },

            //判断图片是否为http或者https
            HTTP_NO: function (img) {
                if (img.indexOf('http://') > -1) {
                    return img.replace(/http/, 'https')
                }
                else {
                    return img;
                }
            },

            //判断商品是否存在
            nlist_no: function () {
                $(".loading-date").css("display", "none");
                $(".nlist_nomore").css("display", "block");
            },

            //去商品详情
            ".time-sale-box click": function (element, event) {

                var that = this;
                if (that.TOUCH) {
                    return false;
                }

                //app外打开
                var param = can.deparam(window.location.search.substr(1));
                if (!param.hyfrom) {
                    $('.app-mask').show();
                    $('.app-native').show();
                    return false;
                }

                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                this.toDetail(goodsid, goodsitemid);
            },

            //app外打开关闭
            ".app-native-cancel click": function () {
                //  $('body').removeClass('voerHid');
                $('.app-mask').hide();
                $('.app-native').hide();
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
                var that = this;
                var jsonParams = {
                    'funName': 'shareHandler',
                    'params': {
                        "shouldShare": 1,
                        "shareTitle": '限时折扣限量抢购中',
                        "shareUrl": that.URL + '/front/timeLimit.html',
                        "shareImage": that.URL + '/front/images/Shortcut_114_114.png',
                        "shareContent": '小伙伴们，我在汇银乐虎参加限时折扣秒杀中.....'
                    },
                };
                LHHybrid.nativeFun(jsonParams);
            },

            /*去除header*/
            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.tabs').css('top', '0');
                    $('.time-sale-main').css('margin-top', '1.6rem');
                    return false;
                }
            },

            '.back click': function () {
                history.go(-1);
            }
        });

    });
 
