define('lehu.h5.component.timeLimit', [
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
        'text!template_components_timeLimit'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid, md5, store, imagelazyload, busizutil, template_components_timeLimit) {
        'use strict';

        var DEFAULT_PAGE_INDEX = 1;
        var NODATA = false;

        return can.Control.extend({
            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                var renderList = can.mustache(template_components_timeLimit);
                var html = renderList(this.options);
                this.element.html(html);
                //渲染页面
                this.render();
                //    去除导航
                this.deleteNav();
            },
            render: function () {
                var that = this;
                var api = new LHAPI({
                    url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/activity/timelimitDiscount",
                    data: {},
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            var TABLIST = data.response;
                            var html = "";
                            var activityId = "";
                            var status = "";

                            if(TABLIST[0].status == 2) {
                                html += " <a class='active' status = " + TABLIST[0].status + "  activityid = " + TABLIST[0].activityId + ">" + TABLIST[0].dateStr + "点场</a>";
                                status = TABLIST[0].status;
                                activityId = TABLIST[0].activityId;
                                for(var j = 1; j < TABLIST.length; j++ ){
                                    html += " <a status = " + TABLIST[j].status + "  activityid = " + TABLIST[j].activityId + ">" + TABLIST[j].dateStr + "点场</a>";
                                }
                            }
                            else {
                                for (var i = 0; i < TABLIST.length; i++) {

                                    //判断抢购时间
                                    if (TABLIST[i].status == 1) {
                                        activityId = TABLIST[i].activityId;
                                        status = TABLIST[i].status;
                                        html += " <a class='active' status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">正在抢购</a>";
                                    } else {
                                        html += " <a status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">" + TABLIST[i].dateStr + "点场</a>";
                                    }
                                }

                                that.renderSecondkillList(data);
                                that.countDown();
                                that.sendRequestNav(status);
                                console.log(2);
                                // 执行倒计时
                                that.timer = setInterval(function () {
                                    that.countDown();
                                }, 1000);
                            }

                            //渲染时间点
                            $(".tabs").empty().append(html);
                        }

                        that.sendRequest(activityId, status);
                    })
                    .fail(function (error) {
                        util.tip(error.msg);
                    })
            },

            ".tabs a click": function (element, event) {
                var that = this;
                $(".tabs .active").removeClass('active');
                element.addClass('active');
                that.sendRequest($(element).attr("activityid"), $(element).attr("status"));
                that.sendRequestNav($(element).attr("status"));
            },

            //剩余时间
            renderSecondkillList: function (data) {
                //this.flag = false;
                if (data.response) {
                    var TABLIST = data.response;
                    for (var i = 0; i < TABLIST.length; i++) {
                        if (TABLIST[i].status == 1) {
                            // if ((i + 1) == TABLIST.length) {
                            //     this.flag = true;
                            // }
                            var endtime = TABLIST[i].endTime;
                            var nowtime = data.nowTime;
                            this.shengyu = endtime - nowtime; //剩余时间
                        }
                    }
                }
            },

            countDown: function () {
                var hours;
                var minutes;
                var seconds;

                hours = Math.floor(this.shengyu / 3600);
                minutes = Math.floor((this.shengyu % 3600) / 60);
                seconds = Math.floor(this.shengyu % 60);

                if (hours < 10) hours = '0' + hours;
                if (minutes < 10) minutes = '0' + minutes;
                if (seconds < 10) seconds = '0' + seconds;

                $(".time-title-count-1").empty().append("本场结束还剩<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
                --this.shengyu;

                if (this.shengyu < 0) {
                    window.location.reload();
                }
            },

            sendRequestNav: function (status) {
                if (status == 1) {
                    $(".time-title-count-1").css("display", "block").siblings().css("display", "none");
                    return false;
                }
                else if (status == 2) {
                    $(".time-title-count-2").css("display", "block").siblings().css("display", "none");
                    return false;
                }
                else if (status == 3) {
                    $(".time-title-count-3").css("display", "block").siblings().css("display", "none");
                    return false;
                }
            },

            sendRequest: function (activityId, status) {
                var param = {
                    "activityId": activityId
                }
                var api = new LHAPI({
                    url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/activity/timelimitList",
                    data: JSON.stringify(param),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        if (data.code == 1) {
                            var BOXLIST = data.response;
                            if (BOXLIST == "") {
                                return false;
                            }
                            var HTML = "";
                            for (var i = 0; i < BOXLIST.length; i++) {
                                //状态为1
                                if (status == 1) {
                                    HTML += "<div class='time-sale-box'><a href='javascript:;' class='time-sale-img'>";

                                    if (BOXLIST[i].status == 1) {

                                        HTML += "<img src='https://m.360buyimg.com/mobilecms/s220x220_jfs/t5077/364/539013828/497463/4efecbcb/590169d3N3983a719.jpg!q70.jpg'>";

                                    } else if(BOXLIST[i].status == 2) {

                                        HTML += "<img style='opacity: .7' src='https://m.360buyimg.com/mobilecms/s220x220_jfs/t5077/364/539013828/497463/4efecbcb/590169d3N3983a719.jpg!q70.jpg'><b><img src='images/qiangwan.png'/></b>"
                                    }

                                    HTML += "</a><a href='javascript:;' class='time-sale-title'>" + BOXLIST[i].name + "</a>" + "<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em>";

                                    if(BOXLIST[i].status == 1){
                                        HTML += "<div class='time-sale-btn'><span><em class='time-sale-active'>还剩" + BOXLIST[i].total + "件</em></span><a href='javascript:;' class='time-sale-bt'>立即抢</a></div></div></div>";
                                    }
                                    else if(BOXLIST[i].status == 2){
                                        HTML += "<div class='time-sale-btn'><a href='javascript:;' class='time-sale-ct'>已结束</a></div></div></div>";
                                    }

                                }

                                //状态为2
                                if (status == 2) {

                                    HTML += "<div class='time-sale-box'><a href='javascript:;' class='time-sale-img'><img src='https://m.360buyimg.com/mobilecms/s220x220_jfs/t5077/364/539013828/497463/4efecbcb/590169d3N3983a719.jpg!q70.jpg'></a><a href='' class='time-sale-title'>" + BOXLIST[i].name + "</a>" +
                                        "<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><span><em class='time-sale-tab'>还剩" + BOXLIST[i].total + "件</em></span><a href='javascript:;' class='time-sale-st'>即将开始</a></div></div></div>"
                                }

                                //状态为3
                                if (status == 3) {
                                    HTML += "<div class='time-sale-box'><a class='time-sale-img'>";

                                    if (  BOXLIST[i].total == 0) {
                                        console.log(2);

                                        HTML += "<img style='opacity:.7;' src='https://m.360buyimg.com/mobilecms/s220x220_jfs/t5077/364/539013828/497463/4efecbcb/590169d3N3983a719.jpg!q70.jpg'><b><img src='images/qiangwan.png'/></b>"

                                    } else if (  BOXLIST[i].total >= 1){
                                        console.log(3);
                                        HTML += "<img src='https://m.360buyimg.com/mobilecms/s220x220_jfs/t5077/364/539013828/497463/4efecbcb/590169d3N3983a719.jpg!q70.jpg'>";
                                    }

                                    HTML += "</a><a href='javascript:;' class='time-sale-title'>" + BOXLIST[i].name + "</a><div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><a href='javascript:;' class='time-sale-ct'>已结束</a></div></div></div>";
                                }

                                $(".swiper-slide").empty().append(HTML);
                            }

                        }
                    })
                    .fail(function (error) {
                        util.tip("服务器错误！");
                    })
            },

            //去商品详情
            ".time-sale-img,.time-sale-bt click": function (element, event) {
                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                this.toDetail(goodsitemid, goodsid);
            },

            toDetail: function (goodsitemid, goodsid) {
                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': goodsitemid,
                        'goodsItemId': goodsid
                    }
                };
                LHHybrid.nativeFun(jsonParams);
            },

            /*去除header*/
            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                //console.log(param.from);
                if (param.from == "app") {
                    $('.header').hide();
                    $('.tabs').css('top', '0');
                    $('.time-title').css('margin-top', '1.18rem');
                    return false;
                }
            },

            '.back click': function () {
                    history.go(-1);
            }
        });

    });