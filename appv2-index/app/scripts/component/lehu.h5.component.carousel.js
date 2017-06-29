define('lehu.h5.component.carousel', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',

        'imgLazyLoad',
        'lehu.utils.busizutil',

        'text!template_components_carousel'
    ],

    function ($, can, LHConfig, util, LHAPI, LHHybrid,
              imagelazyload, busizutil,
              template_components_carousel) {
        'use strict';

        var $lottery;
        var $units;

        var lottery = {
            index: 0, //当前转动到哪个位置
            count: 0, //总共有多少个位置
            timer: 0, //setTimeout的ID，用clearTimeout清除
            speed: 200, //初始转动速度
            times: 0, //转动次数
            cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
            prize: -1, //中奖位置
            init: function (id) {
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    $lottery = $("#" + id);
                    $units = $lottery.find(".lottery-unit");
                    this.obj = $lottery;
                    this.count = $units.length;
                    // $lottery.find(".lottery-unit-" + this.index).addClass("active");
                }
                ;
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                var lottery = this.obj;
                $(lottery).find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                ;
                $(lottery).find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            },
            stop: function (index) {
                this.prize = index;
                return false;
            }
        };

        function roll(lotteryIndex, tip) {
            lottery.times += 1;
            lottery.roll();
            if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
                clearTimeout(lottery.timer);
                lottery.prize = -1;
                lottery.times = 0;
                click = false;
                setTimeout(function () {
                    if (tip == "很遗憾您没有中奖~") {
                        $('.pop_lost').show();
                    }
                    else {
                        $('.pop_win').show();
                        $('.pop_win_name').append(tip);
                    }
                }, 500);
                $(".lottery-bt").removeClass("disable");
            } else {
                if (lottery.times < lottery.cycle) {
                    lottery.speed -= 10;
                } else if (lottery.times == lottery.cycle) {
                    var index = lotteryIndex;
                    // var index = Math.random() * (lottery.count) | 0;
                    lottery.prize = index;
                } else {
                    if (lottery.times > lottery.cycle + 10 && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == lottery.index + 1)) {
                        lottery.speed += 110;
                    } else {
                        lottery.speed += 20;
                    }
                }
                if (lottery.speed < 40) {
                    lottery.speed = 40;
                }
                ;

                lottery.timer = setTimeout(function () {
                    roll(lotteryIndex, tip);
                }, lottery.speed);
            }
            return false;
        }

        var click = false;

        return can.Control.extend({

            param: {},

            helpers: {
                hasnodata: function (data, options) {
                    if (!data || data.length == 0) {
                        return options.fn(options.contexts || this);
                    } else {
                        return options.inverse(options.contexts || this);
                    }
                },

                "lehu-lottery": function (list, index) {
                    var lottery = list[index];
                    // 谢谢参与
                    if (lottery.prizeType == 1) {
                        return "<p class='lottery-bg00  lottery-unit-" + index + "'><img src='images/carousel/pic_thanks.png' style='display: block; margin: 0 auto; width: .4rem; height: .4rem; margin-top: .6rem; margin-bottom: .2rem'> <i>" + lottery.prizeName  +"</i></p>";
                    } else if (lottery.prizeType == 2) { // 优惠券

                        if (lottery.lhqType == 1) {
                            return "<p class='lottery-bg01 lottery-unit-" + index + "'><em><img src='images/carousel/ic_product.png'>乐虎券</em><i>" + lottery.prizeName + "</i><span>￥" + lottery.condition2 + "<b>现金券</b></span></p>";
                        } else if (lottery.lhqType == 2) {
                            return "<p class='lottery-bg01 lottery-unit-" + index + "'><em><img src='images/carousel/ic_product.png'>乐虎券</em><i>" + lottery.prizeName + "</i><span><b>满</b>" + lottery.condition1 + "<b>减</b>" + lottery.condition2 + "</span></p>";
                        }
                    } else {
                        return "<p class='lottery-bg00  lottery-unit-" + index + "'><img src='images/carousel/pic_thanks.png' style='display: block; margin: 0 auto; width: .4rem; height: .4rem; margin-top: .6rem; margin-bottom: .2rem'> <i>谢谢参与</i></p>";
                    }
                }
            },

            /**
             * @override
             * @description 初始化方法
             */
            init: function () {
                this.luckId = "";
                this.initData();
                this.render();

                var params = can.deparam(window.location.search.substr(1));
                //app登录
                if(params.hyfrom == 'app'){

                    //    IOS存userid和token
                    if (util.isMobile.iOS()) {
                        this.localStronge();
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "汇银乐虎全球购-大抽奖"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }
                }
            },

            initData: function () {
                // var HOST = window.location.host;
                // if(HOST.indexOf("http://") == -1){
                //     HOST = "http://" + HOST;
                // }
                // this.URL = HOST;
                this.URL = 'http://121.196.208.98:28080';
                //this.URL = 'http://mobile.vision-world.cn:8080';
                this.URLF = 'http://121.196.208.98:28080';
                //this.URLF = 'http://front.vision-world.cn:8080';
            },

            render: function () {

                this.user = busizutil.getUserId();
                var param = can.deparam(window.location.search.substr(1));
                var params = {};

                if (this.user) {
                    params.userId = this.user.userId;

                } else {
                    params.userId = "";

                }
                var that = this;

                var api = new LHAPI({
                    url: that.URL + "/mobile-web-market/ws/mobile/v1/luck/getLuckActivity",
                    data: JSON.stringify(params),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {

                        if (data.code !== 1) {
                            var html = "<div style='width: 100%; height: auto; float: left; display: none; text-align: center; font-size: .28rem'><img src= 'images/no_activity.png' style=' width: 2.4rem; height: auto margin: 1.2rem auto .48rem; display: block' />暂时没有活动哦～</div> ";
                            $(".dial_bj").css("background", "#ffffff");
                            $(".nwrapper").empty().append(html);
                            return false;
                        }

                        // 中奖纪录
                        that.options.zhongJiangJiLu = data.response.recordList;

                        // 奖品
                        that.options.luckProbabilityList = data.response.prizeList;

                        //判断当抽奖奖品少于8个，自动添加谢谢参与
                        if (that.options.luckProbabilityList.length < 8) {
                            var length = 8 - that.options.luckProbabilityList.length;
                            for (var i = 0; i < length; i++) {
                                that.options.luckProbabilityList.push({
                                    "prizeName": "谢谢参与",
                                    "prizeType": 1
                                })
                            }
                        }

                        // 剩余次数规则
                        that.options.data = new can.Map({
                            "lasttimes": data.response.drawableTimes,
                            "bgImgUrl": data.response.bgImgUrl
                        });

                        // luck_id
                        that.luckId = data.response.id;

                        var renderList = can.mustache(template_components_carousel);
                        var html = renderList(that.options, that.helpers);
                        that.element.html(html);
                        $('.dial_footer ul').append(data.response.activeRule);
                        lottery.init('lottery');
                        that.scrollZhongjiangjilu();
                        //  去除导航事件
                        that.deleteNav();

                        if (!that.user) {
                            $("#nologin").show();
                            $("#alreadylogin").hide();
                        } else {
                            $("#nologin").hide();
                            $("#alreadylogin").show();
                        }

                        if(param.hyfrom == 'app'){
                            //    分享
                            if (util.isMobile.Android() || util.isMobile.iOS()) {
                                that.share();
                            }

                        }

                    })
                    .fail(function (error) {
                        util.tip(error.msg);
                    });

            },

            scrollZhongjiangjilu: function () {
                /*信息滚动*/
                var $this = $(".dial_msg_box");
                var scrollTimer = setInterval(function () {
                    scrollNews($this);
                }, 2000);

                function scrollNews(obj) {
                    var $self = obj.find("ul:first");
                    var lineHeight = $self.find("li:first").height();
                    $self.animate({
                        "margin-top": -lineHeight + "px"
                    }, 400, function () {
                        $self.css({
                            "margin-top": "0px"
                        }).find("li:first").appendTo($self);
                    })
                };
            },

            getLottery: function () {
                var that = this;
                $(".lottery-bt").addClass("disable");
                $('.pop_win_name').empty();
                this.param = {
                    "userId": this.user.userId,
                    "strToken": this.user.token,
                    "strUserId": this.user.userId,
                    "luckActiveId": this.luckId
                };
                var api = new LHAPI({
                    url: that.URL + "/mobile-web-market/ws/mobile/v1/luck/drawLuck",
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
                        //如果返回code不等于1
                        if (data.code !== 1) {
                            util.tip(data.msg, 3000);
                            setTimeout(function () {
                                $(".lottery-bt").removeClass("disable");
                            }, 3000)
                            return false;
                        }

                        //重置抽奖次数
                        that.options.data.attr("lasttimes", that.options.data.lasttimes - 1);

                        var lotteryIndex = -1;
                        var lotteryInfo = null;
                        var tip = ""; //中奖信息

                        if (data.response.prizeId > 0 ) {
                            for (var i = 0; i < that.options.luckProbabilityList.length; i++) {
                                if (that.options.luckProbabilityList[i].id == data.response.prizeId) {
                                    if (that.options.luckProbabilityList[i].prizeType == 2) {
                                        lotteryIndex = i;
                                        lotteryInfo = that.options.luckProbabilityList[i];
                                        tip = "恭喜您获得" + lotteryInfo.prizeName;
                                        break;
                                    }
                                    else if (that.options.luckProbabilityList[i].prizeType == 1) {
                                        lotteryIndex = i;
                                        lotteryInfo = that.options.luckProbabilityList[i];
                                        tip = "很遗憾您没有中奖~";
                                        break;
                                    }
                                }
                            }
                        }
                        else if (data.response.prizeId == -1) {
                            for (var i = 0; i < that.options.luckProbabilityList.length; i++) {
                                if (that.options.luckProbabilityList[i].prizeType == 1) {
                                    lotteryIndex = i;
                                    lotteryInfo = that.options.luckProbabilityList[i];
                                    tip = "很遗憾您没有中奖~";
                                    break;
                                }
                            }
                        }
                        else { //谢谢参与
                            for (var i = 0; i < that.options.luckProbabilityList.length; i++) {
                                if (that.options.luckProbabilityList[i].prizeType == 1) {
                                    lotteryIndex = i;
                                    lotteryInfo = that.options.luckProbabilityList[i];
                                    tip = "很遗憾您没有中奖~";
                                    break;
                                }
                            }
                        }
                        // 滚动抽奖
                        if (click) {
                            return false;
                        } else {
                            lottery.speed = 100;
                            roll(lotteryIndex, tip);
                            click = true;
                            return false;
                        }
                    })
                    .fail(function (error) {
                        util.tip("服务器错误！", 3000);
                    });
            },

            "#lottery a click": function () {
                var that = this;
                if ($(".lottery-bt").hasClass("disable")) {
                    return false;
                }
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
                this.getLottery();
            },

            "#login click": function (element, event) {
                var param = can.deparam(window.location.search.substr(1));

                if (param.hyfrom) {
                    var jsonParams = {
                        'funName': 'login',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                    return false;

                } else {
                    location.href = "login.html?hyfrom=carousel.html";
                    return false;

                }
            },

            //抽奖进入我的乐虎券
            '.pop_win_coupons click': function () {
                var jsonParams = {
                    'funName': 'back_coupons',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },
            //弹窗消失
            '.pop_win a click': function () {
                $('.pop_win').hide();
            },
            '.pop_lost a click': function () {
                $('.pop_lost').hide();
            },

            //分享
            share: function () {
                var that = this;
                var jsonParams = {
                    'funName': 'shareHandler',
                    'params': {
                        "shouldShare": 1,
                        "shareTitle": '汇银乐虎全球购-幸运大转盘',
                        "shareUrl": that.URLF + '/front/carousel.html',
                        "shareImage": that.URLF + '/front/images/Shortcut_114_114.png',
                        "shareContent": '汇银乐虎全球购，幸运大转盘，奖品抽到你手软！',
                        "luckActiveId": that.luckId
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

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    return false;
                }
            },

            '.back click': function () {
                history.go(-1);
            }
        });

    });