define('lehu.h5.component.servers', [
        'zepto',
        'can',
        'lehu.h5.business.config',
        'lehu.util',
        'lehu.h5.api',
        'lehu.hybrid',
        'underscore',
        'md5',

        'imagelazyload',
        'tripledes',
        'modeecb',
        'lehu.utils.busizutil',

        'text!template_components_servers'
    ],

    function($, can, LHConfig, util, LHAPI, LHHybrid, _, md5,
             imagelazyload, tripledes, modeecb, busizutil,
             template_components_servers) {
        'use strict';

        return can.Control.extend({

            init: function() {

                this.initData();

                this.render();
            },

            initData: function() {
                this.URL = LHHybrid.getUrl();
                this.URL.SERVER_URL = 'http://app.lehumall.com/'
            },

            render: function() {
                var renderFn = can.view.mustache(template_components_servers);
                var html = renderFn(this.options.data, this.helpers);
                this.element.html(html);

            },

            '.back click': function() {
                // temp begin
                // 在app外部使用 点击返回 如果没有可返回则关闭掉页面
                var param = can.deparam(window.location.search.substr(1));
                if (!param.version) {
                    if (history.length == 1) {
                        window.opener = null;
                        window.close();
                    } else {
                        history.go(-1);
                    }
                    return false;
                }
                // temp end

                if (util.isMobile.Android() || util.isMobile.iOS()) {
                    var jsonParams = {
                        'funName': 'back_fun',
                        'params': {
                            'backurl':'index'
                        }
                    };
                    LHHybrid.nativeFun(jsonParams);
                    console.log('back_fun');
                } else {
                    history.go(-1);
                }
            },

        });
    });