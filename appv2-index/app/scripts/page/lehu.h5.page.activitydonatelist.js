define('lehu.h5.page.activitydonatelist', [
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

        'text!template_components_activitydonatelist'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,imgLazyLoad,
        LHFooter,LHDownload,
        template_page_activitydonatelist) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function() {
                var HOST = window.location.host;
                if(HOST.indexOf("https://") == -1){
                    HOST = "https://" + HOST;
                }
                this.URL = HOST;
                // this.URL = 'http://121.196.208.98:28080';
                // //this.URL = 'http://mobile.vision-world.cn:8080';

                //数组图片
                this.IMGURL = [
                    {img: 'http://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170629/201706291155064967.jpg'},
                    {img: 'http://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170629/20170629115637945.jpg'},
                    {img: 'http://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170629/201706291155572104.jpg'}
                ];
            },

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                this.initData();

                var renderList = can.mustache(template_page_activitydonatelist);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

                var param = can.deparam(window.location.search.substr(1));

                if(param.hyfrom == 'app'){
                    if(util.isMobile.iOS()){
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "汇银乐虎全球购-满赠活动"
                            }
                        }
                        LHHybrid.nativeFun(jsonParams);
                    }
                }

                var params = {
                    "toPage":1,
                    "pageRows":20
                };

                var api = new LHAPI({
                    url:  that.URL + '/mobile-web-market/ws/mobile/v1/promotion/donateList',
                    data: JSON.stringify(params),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        $('.nlist_loading').hide();
                        if(data.code == 1){
                            var CONTENT = data.response;
                            if(CONTENT == "" ){
                                $(".nlist_no_activity").show();
                                return false;
                            }
                            var html = "";
                            for (var i = 0; i < CONTENT.length; i++) {
                                html += '<div class="fullgive_adList">';
                                if ( i <= parseInt(that.IMGURL.length - 1)) {
                                    html += '<img class="lazyload"  src="images/big_goods_back.png"  data-img="' + that.IMGURL[i].img + '"  data-activityId="' + CONTENT[i].activityId + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '">';
                                }
                                else {
                                    html += '<img class="lazyload"  src="images/big_goods_back.png"  data-img="http://lehumall.b0.upaiyun.com/upload/image/admin/2017/20170615/201706151949379959.jpg" data-activityId="' + CONTENT[i].activityId + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '">';
                                }

                                html += '<p>' + CONTENT[i].activityName + '</p></div>';
                            }
                            $('.fullgive_ads').empty().append(html);

                            //图片懒加载
                            $.imgLazyLoad()
                        }
                    })
                    .fail(function(error) {
                        $('.nlist_loading').hide();
                        util.tip("服务器错误！");
                    });
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                if (param.hyfrom  || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.fullgive_ad').css('top',0);
                    return false;
                }
            },

            '.fullgive_adList img click': function (element,event) {
                var ACTIVITY = element.attr('data-activityId');
                var STOREACTIVITY = element.attr('data-storeActivityId');

                var param = can.deparam(window.location.search.substr(1));
                if(param.hyfrom == "app"){
                    window.location.href = "activitydonate.html?hyfrom=app&activityId=" + ACTIVITY +"&storeActivityId=" + STOREACTIVITY;
                }
                else {
                    window.location.href = "activitydonate.html?activityId=" + ACTIVITY +"&storeActivityId=" + STOREACTIVITY;
                }

                return false;
            },

            '.back click': function() {
                    history.go(-1);
            }
        });
        var param = can.deparam(window.location.search.substr(1));

        // if(!param.hyfrom){
        //     new LHDownload();
        // }
        //new LHFooter();
        new RegisterHelp('#content');

    });