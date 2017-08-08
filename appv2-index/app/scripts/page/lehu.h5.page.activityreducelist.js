define('lehu.h5.page.activityreducelist', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        "imgLazyLoad",

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'text!template_components_activityreducelist'
    ],

    function (can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI, ImgLazyLoad,
              LHFooter, LHDownload,
              template_page_activityreducelist) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function () {
                var HOST = window.location.host;
                if(HOST.indexOf("https://") == -1){
                    HOST = "https://" + HOST;
                }
                this.URL = HOST;

                //数组图片
                this.IMGURL = [
                    {img: 'images/activityreducelist/WechatIMG305.jpeg'},
                    {img: 'images/activityreducelist/WechatIMG316.jpeg'},
                    {img: 'images/activityreducelist/WechatIMG303.jpeg'},
                    {img: 'images/activityreducelist/WechatIMG302.jpeg'},
                    {img: 'https://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170718/201707181622555571.jpg'},
                    {img: 'images/activityreducelist/WechatIMG304.jpeg'},
                ];
            },

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function (element, options) {
                var that = this;

                this.initData();

                var renderList = can.mustache(template_page_activityreducelist);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

                var param = can.deparam(window.location.search.substr(1));

                if (param.hyfrom == 'app') {
                    if (util.isMobile.iOS()) {
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "汇银乐虎全球购-满减活动"
                            }
                        }
                        LHHybrid.nativeFun(jsonParams);
                    }
                }
                var params = {
                    "toPage": 1,
                    "pageRows": 20
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/promotion/reduceList',
                    data: JSON.stringify(params),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function (data) {
                        $('.nlist_loading').hide();
                        if (data.code == 1) {
                            var CONTENT = data.response;
                            if (CONTENT == "") {
                                $(".nlist_no_activity").show();
                                return false;
                            }
                            var html = "";
                            for (var i = 0; i < CONTENT.length; i++) {
                                html += '<div class="fullgive_adList">';
                                if ( i <= parseInt(that.IMGURL.length - 1)) {
                                    html += '<img class="lazyload"  src="images/big_goods_back.png"  data-img="' + that.IMGURL[i].img + '" data-activityId="' + CONTENT[i].activityId + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '">';
                                }
                                else {
                                    html += '<img class="lazyload"  src="images/big_goods_back.png"  data-img="https://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170718/201707181622555571.jpg" data-activityId="' + CONTENT[i].activityId + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '">';
                                }

                                html += '<p>' + CONTENT[i].activityName + '</p></div>';
                            }
                            $('.fullgive_ads').empty().append(html);
                            //图片懒加载
                            $.imgLazyLoad({
                                effect: "fadeIn"
                            })
                        }
                    })
                    .fail(function (error) {
                        $('.nlist_loading').hide();
                        util.tip("服务器错误！");
                    });
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));

                if (param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.fullgive_ad').css('top', 0);
                    return false;
                }
            },

            '.fullgive_adList img click': function (element, event) {
                var ACTIVITY = element.attr('data-activityId');
                var STOREACTIVITY = element.attr('data-storeActivityId');

                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom == "app") {
                    window.location.href = "activityreduce.html?hyfrom=app&activityId=" + ACTIVITY + "&storeActivityId=" + STOREACTIVITY;
                }
                else {
                    window.location.href = "activityreduce.html?activityId=" + ACTIVITY + "&storeActivityId=" + STOREACTIVITY;
                }

                return false;
            },

            '.back click': function () {
                history.go(-1);
            }
        });

        var param = can.deparam(window.location.search.substr(1));

        // if (!param.hyfrom) {
        //     new LHDownload();
        // }
      //  new LHFooter();
        new RegisterHelp('#content');

    });