define('lehu.h5.page.vip', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        "imgLazyLoad",
        'lehu.utils.busizutil',
        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'text!template_components_vip'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,imgLazyLoad,busizutil,
             LHFooter,LHDownload,
             template_components_vip) {
        'use strict';

        Fastclick.attach(document.body);

        var Vip = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                var renderList = can.mustache(template_components_vip);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

                var param = can.deparam(window.location.search.substr(1));

                //    IOS存userid和token
                if (util.isMobile.iOS()) {
                    this.localStronge();
                    //标题
                    var jsonParams = {
                        'funName': 'title_fun',
                        'params': {
                            "title": "办理会员卡  享受折上折心"
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                }
            },

            '.vip-enter click': function () {
                var param = can.deparam(window.location.search.substr(1));
                //判断用户是否登录
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
                    }
                }

                var jsonParams = {
                    'funName': 'member_fun',
                    'params': {}
                };
                LHHybrid.nativeFun(jsonParams);
            },

            '.vip-goodsdetail click': function (element,event) {
                var goodsid = element.attr("data-goodsid");
                var goodsitemid = element.attr("data-goodsitemid");
                console.log(goodsid);
                console.log(goodsitemid);
                this.toDetail(goodsid, goodsitemid);
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

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom  || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    return false;
                }
            },

            //IOS userid和token 本地存储
            localStronge: function () {
                var jsonParams = {
                    'funName': 'localStronge',
                    'params': {}
                };

                LHHybrid.nativeRegister(jsonParams);
            },

            '.back click': function() {
                history.go(-1);
            }
        });

        new Vip('#content');

    });