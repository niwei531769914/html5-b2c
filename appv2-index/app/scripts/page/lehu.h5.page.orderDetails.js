define('lehu.h5.page.orderDetails', [
		'can',
		'zepto',
		'fastclick',
		'lehu.util',
		'lehu.h5.framework.comm',
		'lehu.h5.business.config',
		'lehu.hybrid',

		'lehu.h5.header.footer',
		'lehu.h5.header.download',

		'lehu.h5.component.orderDetails'
	],

	function(can, $, Fastclick, util, LHFrameworkComm, LHConfig, LHHybrid, LHFooter, LHDownload, LHorderDetails) {
		'use strict';

		Fastclick.attach(document.body);

		var OrderDetails = can.Control.extend({

			/**
			 * [init 初始化]
			 * @param  {[type]} element 元素
			 * @param  {[type]} options 选项
			 */
			init: function(element, options) {
				var param = can.deparam(window.location.search.substr(1));
				if(!param.hyfrom) {
					// new LHDownload(null,{
					//     "position":"bottom"
					// });
					//new LHDownload();
				}
				new LHFooter();

				var orderDetails = new LHorderDetails("#content");
			}
		});

		new OrderDetails('#content');
	});