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
                if(HOST.indexOf("http://") == -1){
                    HOST = "http://" + HOST;
                }
                this.URL = HOST;
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

                var params = {
                    "toPage":1,
                    "pageRows":20
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/promotion/donateList',
                    data: JSON.stringify(params),
                    method: 'post'
                });
                api.sendRequest()
                    .done(function(data) {
                        if(data.code == 1){
                            var CONTENT = data.response;
                            if(CONTENT == "" ){
                                return false;
                            }
                            var html = "";
                            for(var i = 0; i< CONTENT.length; i++){
                                html += '<div class="fullgive_adList"><img class="lazyload" src="images/big_goods_back.png"  data-img="https://img11.360buyimg.com/jshopm/s640x260_jfs/t4816/166/2569546069/92243/9c24ffa1/5903161fN235bee6b.jpg!q70.jpg"  data-activityId="' + CONTENT[i].activityId  + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '"><p>' + CONTENT[i].activityName + '</p></div>';
                            }
                            $('.fullgive_ads').empty().append(html);

                            //图片懒加载
                            $.imgLazyLoad()
                        }
                    })
                    .fail(function(error) {
                        util.tip("服务器错误！");
                    });
                new LHFooter();
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.hyfrom);
                if (param.hyfrom) {
                    $('.header').hide();
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

        new RegisterHelp('#content');
        var param = can.deparam(window.location.search.substr(1));
        new LHFooter();
        if(!param.hyfrom){
            new LHDownload();
        }
    });