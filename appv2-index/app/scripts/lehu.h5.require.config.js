requirejs.config({
	// urlArgs: "v=1.0",
	baseUrl: '/',
	shim: {
		'modeecb': {
			deps: ['tripledes'],
			exports: "modeecb"
		}
	},
	paths: {
		"can": "http://www.google.com/bower_components/canjs/amd/can",
		"zepto": "http://www.google.com/zepto",
		"zeptoalone": "scripts/common/zepto.min",
		"zepto.cookie": "http://www.google.com/zepto.cookie",
		"underscore": "http://www.google.com/bower_components/underscore/underscore-min",
		"fastclick": "http://www.google.com/fastclick",
		"md5": "http://www.google.com/bower_components/blueimp-md5/js/md5.min",
		"underscore.string": "http://www.google.com/bower_components/underscore.string/dist/underscore.string.min",
		"store": "http://www.google.com/bower_components/store/dist/store",
		"text": "../bower_components/text/text",
		"placeholders": "bower_components/Placeholders/build/placeholders",
		"moment": "bower_components/momentjs/min/moment.min",
		"moment-zh-cn": "bower_components/momentjs/locale/zh-cn",

		"lehu.h5.framework.comm": "http://www.google.com/app/scripts/framework/lehu.h5.framework.comm",
		"lehu.h5.business.config": "http://www.google.com/app/scripts/config/lehu.h5.business.config",
		"lehu.h5.api": "http://www.google.com/app/scripts/framework/lehu.h5.api",
		"lehu.h5.framework.global": "scripts/common/lehu.h5.framework.global",

		"lehu.hybrid": "http://www.google.com/scripts/util/lehu.hybrid",
		"lehu.helpers": "http://www.google.com/scripts/util/lehu.helpers",
		"lehu.util": "http://www.google.com/scripts/util/lehu.util.fn",
		"lehu.env.switcher": "http://www.google.com/scripts/util/lehu.env.switcher",
		"lehu.bridge": "http://www.google.com/scripts/util/lehu.bridge",

		'lehu.h5.header.header': 'scripts/header/lehu.h5.header.header',
		'lehu.h5.header.footer': 'scripts/header/lehu.h5.header.footer',
		'lehu.h5.header.download': 'scripts/header/lehu.h5.header.download',

		"lehu.h5.page.login": "scripts/page/lehu.h5.page.login",
		"lehu.h5.page.register": "scripts/page/lehu.h5.page.register",
		"lehu.h5.page.registerhelp": "scripts/page/lehu.h5.page.registerhelp",
		"lehu.h5.page.userhelp": "scripts/page/lehu.h5.page.userhelp",
		"lehu.h5.page.forgetpassword": "scripts/page/lehu.h5.page.forgetpassword",
		"lehu.h5.page.coupon": "scripts/page/lehu.h5.page.coupon",
		"lehu.h5.page.carousel": "scripts/page/lehu.h5.page.carousel",
		"lehu.h5.page.activityreduce": "scripts/page/lehu.h5.page.activityreduce",
		"lehu.h5.page.activitydonate": "scripts/page/lehu.h5.page.activitydonate",
		"lehu.h5.page.activityreducelist": "scripts/page/lehu.h5.page.activityreducelist",
		"lehu.h5.page.activitydonatelist": "scripts/page/lehu.h5.page.activitydonatelist",
		"lehu.h5.page.graphicDetail": "scripts/page/lehu.h5.page.graphicDetail",
		"lehu.h5.page.servers": "scripts/page/lehu.h5.page.servers",
		"lehu.h5.page.timeLimit": "scripts/page/lehu.h5.page.timeLimit",
		"lehu.h5.page.headlines": "scripts/page/lehu.h5.page.headlines",
		"lehu.h5.page.stores": "scripts/page/lehu.h5.page.stores",
		"lehu.h5.page.graphicdetails": "scripts/page/lehu.h5.page.graphicdetails",
		"lehu.h5.page.coupondetail": "scripts/page/lehu.h5.page.coupondetail",
		"lehu.h5.page.orderlist": "scripts/page/lehu.h5.page.orderlist",
		"lehu.h5.page.orderDetails": "scripts/page/lehu.h5.page.orderDetails",
		"lehu.h5.page.introduce": "scripts/page/lehu.h5.page.introduce",
		"lehu.h5.page.goodslist": "scripts/page/lehu.h5.page.goodslist",
		"lehu.h5.page.activitysummer": "scripts/page/lehu.h5.page.activitysummer",
		"lehu.h5.page.activity818": "scripts/page/lehu.h5.page.activity818",
		"lehu.h5.page.list": "scripts/page/lehu.h5.page.list",
		"lehu.h5.page.activity1": "scripts/page/lehu.h5.page.activity1",

 
		"lehu.h5.component.login": "scripts/component/lehu.h5.component.login",
		"lehu.h5.component.register": "scripts/component/lehu.h5.component.register",
		"lehu.h5.component.forgetpassword": "scripts/component/lehu.h5.component.forgetpassword",
		"lehu.h5.component.coupon": "scripts/component/lehu.h5.component.coupon",
		"lehu.h5.component.carousel": "scripts/component/lehu.h5.component.carousel",
		"lehu.h5.component.activityreduce": "scripts/component/lehu.h5.component.activityreduce",
		"lehu.h5.component.activitydonate": "scripts/component/lehu.h5.component.activitydonate",
		"lehu.h5.component.servers": "scripts/component/lehu.h5.component.servers",
		"lehu.h5.component.timeLimit": "scripts/component/lehu.h5.component.timeLimit",
		"lehu.h5.component.headlines": "scripts/component/lehu.h5.component.headlines",
		"lehu.h5.component.coupondetail": "scripts/component/lehu.h5.component.coupondetail",
		"lehu.h5.component.orderlist": "scripts/component/lehu.h5.component.orderlist",
		"lehu.h5.component.orderDetails": "scripts/component/lehu.h5.component.orderDetails",
		"lehu.h5.component.list": "scripts/component/lehu.h5.component.list",
		"lehu.h5.component.activity1": "scripts/component/lehu.h5.component.activity1",
 

		"template_page_registerhelp": "templates/page/lehu.h5.page.registerhelp.mustache",
		"template_page_userhelp": "templates/page/lehu.h5.page.userhelp.mustache",

		"template_header_footer": "templates/header/lehu.h5.header.footer.mustache",
		"template_header_header": "templates/header/lehu.h5.header.header.mustache",
		"template_header_download": "templates/header/lehu.h5.header.download.mustache",

		"template_components_login": "templates/components/lehu.h5.components.login.mustache",
		"template_components_register": "templates/components/lehu.h5.components.register.mustache",
		"template_components_forgetpassword": "templates/components/lehu.h5.components.forgetpassword.mustache",
		"template_components_coupon": "templates/components/lehu.h5.components.coupon.mustache",
		"template_components_carousel": "templates/components/lehu.h5.components.carousel.mustache",
		"template_components_activityreduce": "templates/components/lehu.h5.components.activityreduce.mustache",
		"template_components_activitydonate": "templates/components/lehu.h5.components.activitydonate.mustache",
		"template_components_servers": "templates/components/lehu.h5.components.servers.mustache",
		"template_components_timeLimit": "templates/components/lehu.h5.components.timeLimit.mustache",
		"template_components_headlines": "templates/components/lehu.h5.components.headlines.mustache",
		"template_components_stores": "templates/components/lehu.h5.components.stores.mustache",
		"template_components_graphicdetails": "templates/components/lehu.h5.components.graphicdetails.mustache",
		"template_components_activityreducelist": "templates/components/lehu.h5.components.activityreducelist.mustache",
		"template_components_activitydonatelist": "templates/components/lehu.h5.components.activitydonatelist.mustache",
		"template_components_coupondetail": "templates/components/lehu.h5.components.coupondetail.mustache",
		"template_components_orderlist": "templates/components/lehu.h5.components.orderlist.mustache",
		"template_components_orderDetails": "templates/components/lehu.h5.components.orderDetails.mustache",
		"template_components_introduce": "templates/components/lehu.h5.components.introduce.mustache",
		"template_components_goodslist": "templates/components/lehu.h5.components.goodslist.mustache",
		"template_components_activitysummer": "templates/components/lehu.h5.components.activitysummer.mustache",
		"template_components_activity818": "templates/components/lehu.h5.components.activity818.mustache",
		"template_components_list": "templates/components/lehu.h5.components.list.mustache",
		"template_components_activity1": "templates/components/lehu.h5.components.activity1.mustache",

		'lehu.utils.busizutil': 'scripts/utils/lehu.utils.busizutil',

 
		"swipe": "scripts/vendor/swipe",
		"slide": "scripts/vendor/slide",
		"imgLazyLoad": "scripts/vendor/zepto.picLazyLoad.min",
		"iScroll": "scripts/vendor/iscroll",
 

		// 3des加密
		'tripledes': '../bower_components/cryptojslib/rollups/tripledes',
		'modeecb': '../bower_components/cryptojslib/components/mode-ecb'
	}
});