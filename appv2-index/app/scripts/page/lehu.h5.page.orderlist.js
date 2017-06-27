define('lehu.h5.page.orderlist', [
		'can',
		'zepto',
		'fastclick',
		'lehu.util',
		'lehu.h5.framework.comm',
		'lehu.h5.business.config',
		'lehu.hybrid',

		'lehu.h5.header.footer',
        'lehu.h5.header.download',
		'lehu.h5.component.orderlist'
	],

	function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHFooter, LHDownload ,LHOrderList) {
		'use strict';

		Fastclick.attach(document.body);

		var OrderList = can.Control.extend({

			/**
			 * [init 初始化]
			 * @param  {[type]} element 元素
			 * @param  {[type]} options 选项
			 */
			init: function(element, options) {

                var param = can.deparam(window.location.search.substr(1));


                new LHFooter();

				var orderList = new LHOrderList("#content");

			}
		});

		new OrderList('#content');
	});