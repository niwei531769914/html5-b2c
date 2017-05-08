define('lehu.h5.page.activityreducelist', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',
        "echo",

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'text!template_components_activityreducelist'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,echo,
        LHFooter,LHDownload,
        template_page_activityreducelist) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function() {
                var HOST = window.location.host;
                if(HOST.indexOf('118')>-1){
                    this.URL = 'http://118.178.227.135';
                }
                else {
                    this.URL = 'http://121.196.208.98:28080';
                }
            },

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                this.initData();

                var renderList = can.mustache(template_page_activityreducelist);
                var html = renderList(this.options);
                this.element.html(html);

                //去除导航
                this.deleteNav();

                var params = {
                    "toPage":1,
                    "pageRows":20
                };

                var api = new LHAPI({
                    url: that.URL + '/mobile-web-market/ws/mobile/v1/promotion/reduceList',
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
                                html += '<div class="fullgive_adList"><img  src="images/big_goods_back.png"  data-echo="https://img11.360buyimg.com/jshopm/s640x260_jfs/t4816/166/2569546069/92243/9c24ffa1/5903161fN235bee6b.jpg!q70.jpg"  data-url="' + CONTENT[i].url + '" data-activityId="' + CONTENT[i].activityId  + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '"><p>' + CONTENT[i].activityName + '</p></div>';
                            }
                            $('.fullgive_ads').empty().append(html);
                            //图片懒加载
                            echo.init({
                                offset: 100,
                                throttle: 6000,
                                unload: false,
                                callback: function (element, op) {
                                    console.log(element, 'has been', op + 'ed')
                                }
                            });
                        }
                    })
                    .fail(function(error) {
                        util.tip("服务器错误！");
                    });
                new LHFooter();
            },

            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.from);
                if (param.from == "app") {
                    $('.header').hide();
                    $('.fullgive_ad').css('top',0);
                    return false;
                }
            },

            '.fullgive_adList img click': function (element,event) {
                var ACTIVITY = element.attr('data-activityId');
                var STOREACTIVITY = element.attr('data-storeActivityId');

                var param = can.deparam(window.location.search.substr(1));
                if(param.from == "app"){
                    window.location.href = "activityreduce.html?from=app&activityId=" + ACTIVITY +"&storeActivityId=" + STOREACTIVITY;
                }
                else if(param.from == "share"){
                    window.location.href = "activityreduce.html?from=share&activityId=" + ACTIVITY +"&storeActivityId=" + STOREACTIVITY;
                }

                return false;
            },

            '.back click': function() {

                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_fun',
                        'params': {}
                    };
                    LHHybrid.nativeFun(jsonParams);
                    console.log('back_fun');
                } else {
                    history.go(-1);
                }
            }
        });

        new RegisterHelp('#content');
        new LHFooter();

        var param = can.deparam(window.location.search.substr(1));

        if(param.from == "share"){
            new LHDownload(null,{
                "position":"bottom"
            });
        }
    });