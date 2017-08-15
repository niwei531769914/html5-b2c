define('lehu.h5.page.activity818', [
<<<<<<< HEAD
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

        'text!template_components_activity818'
    ],

    function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI, imgLazyLoad, LHFooter, LHDownload, template_components_activity818) {
        'use strict';

        Fastclick.attach(document.body);

        var Activity818 = can.Control.extend({

            /**
             * [init 初始化]
             * @param  {[type]} element 元素
             * @param  {[type]} options 选项
             */
            init: function(element, options) {
                var that = this;

                var renderList = can.mustache(template_components_activity818);
                var html = renderList(this.options);
                this.element.html(html);

                //img图片懒加载
                $.imgLazyLoad();

                //去除导航
                this.deleteNav();

                var param = can.deparam(window.location.search.substr(1));

                if(param.hyfrom == 'app') {
                    if(util.isMobile.iOS()) {
                        //标题
                        var jsonParams = {
                            'funName': 'title_fun',
                            'params': {
                                "title": "818周年大庆"
                            }
                        };
                        LHHybrid.nativeFun(jsonParams);
                    }
                }
            },

            deleteNav: function() {
                var param = can.deparam(window.location.search.substr(1));
                if(param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
                    $('.header').hide();
                    $('.fullgive_ad').css('margin-top', 0);
                    return false;
                }
            },

            //进入领券中心
            '.coupon click': function() {
                window.location.href = 'coupon.html?hyfrom=app';
            },

            //进入商品详情页
            '.coupon1 , .goods-list-item , .activity-list-item , .time-limit-item click': function(element, event) {

                var GOODSID = element.attr('data-goodsid');
                var GOODSITEMID = element.attr('data-goodsitemid');

                console.log(GOODSID);
                console.log(GOODSITEMID);

                var jsonParams = {
                    'funName': 'goods_detail_fun',
                    'params': {
                        'goodsId': GOODSID,
                        'goodsItemId': GOODSITEMID
                    }
                };
                LHHybrid.nativeFun(jsonParams);

            },

            '.back click': function() {
                history.go(-1);
            }
        });

        new LHFooter();
        new Activity818('#content');

    });
=======
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

		'text!template_components_activity818'
	],

	function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHAPI, imgLazyLoad, LHFooter, LHDownload, template_components_activity818) {
		'use strict';

		Fastclick.attach(document.body);

		var Activity818 = can.Control.extend({

			/**
			 * [init 初始化]
			 * @param  {[type]} element 元素
			 * @param  {[type]} options 选项
			 */
			init: function(element, options) {
				var that = this;

				var renderList = can.mustache(template_components_activity818);
				var html = renderList(this.options);
				this.element.html(html);

				//img图片懒加载
				$.imgLazyLoad();

				//去除导航
				this.deleteNav();

				var param = can.deparam(window.location.search.substr(1));

				if(param.hyfrom == 'app') {
					if(util.isMobile.iOS()) {
						//标题
						var jsonParams = {
							'funName': 'title_fun',
							'params': {
								"title": "818周年大庆"
							}
						};
						LHHybrid.nativeFun(jsonParams);
					}
				}
			},

			deleteNav: function() {
				var param = can.deparam(window.location.search.substr(1));
				if(param.hyfrom || util.isMobile.QQ() || util.isMobile.WeChat()) {
					$('.header').hide();
					$('.fullgive_ad').css('margin-top', 0);
					return false;
				}
			},

			//进入领券中心
			'.coupon click': function() {
				window.location.href = 'coupon.html?hyfrom=app';
			},

			//进入商品详情页
			'.coupon1 , .goods-list-item , .activity-list-item , .time-limit-item click': function(element, event) {
				console.log(2);
				var GOODSID = element.attr('data-goodsid');
				var GOODSITEMID = element.attr('data-goodsitemid');

				console.log(GOODSID);
				console.log(GOODSITEMID);

				var jsonParams = {
					'funName': 'goods_detail_fun',
					'params': {
						'goodsId': GOODSID,
						'goodsItemId': GOODSITEMID
					}
				};
				LHHybrid.nativeFun(jsonParams);

			},

			'.back click': function() {
				history.go(-1);
			}
		});

		new LHFooter();
		new Activity818('#content');

	});
>>>>>>> 3c12fdc9b9389a5044646cbca1269486dc16fe35
