define('lehu.h5.page.activitydonatelist', [
        'can',
        'zepto',
        'fastclick',
        'lehu.util',
        'lehu.h5.framework.comm',
        'lehu.h5.business.config',
        'lehu.hybrid',
        'lehu.h5.api',

        'lehu.h5.header.footer',
        'lehu.h5.header.download',

        'text!template_components_activitydonatelist'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI,
        LHFooter,LHDownload,
        template_page_activitydonatelist) {
        'use strict';

        Fastclick.attach(document.body);

        var RegisterHelp = can.Control.extend({

            initData: function() {
                this.URL = LHHybrid.getUrl();
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
                    url: 'http://118.178.227.135/mobile-web-market/ws/mobile/v1/promotion/donateList',
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
                                html += '<div class="fullgive_adList"><img src="' + CONTENT[i].img + '"  data-url="' + CONTENT[i].url + '" data-activity="' + CONTENT[i].activityId  + '" data-storeActivityId="' + CONTENT[i].storeActivityId + '"><p>' + CONTENT[i].title + '</p></div>';
                            }
                            $('.fullgive_ads').empty().append(html);
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
                    return false;
                }
            },

            '.stores-list img click': function (element,event) {

                var ACTIVITY = element.attr('data-activityId');
                var STOREACTIVITY = element.attr('data-storeActivityId');

                window.location.href = "activitydonate.html?" + ACTIVITY +"&" + STOREACTIVITY;

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
        var param = can.deparam(window.location.search.substr(1));
        new LHFooter();
        if(param.from == "share"){
            new LHDownload(null,{
                "position":"bottom"
            });
        }
    });