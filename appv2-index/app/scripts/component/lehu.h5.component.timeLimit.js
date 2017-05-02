define('lehu.h5.component.timeLimit', [
		'zepto',
		'can',
		'lehu.h5.business.config',
		'lehu.util',
		'lehu.h5.api',
		'lehu.hybrid',
		'md5',
		'store',
		'imagelazyload',
		'lehu.utils.busizutil',
		'text!template_components_timeLimit'
	],

	function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store, imagelazyload, busizutil, template_components_timeLimit) {
		'use strict';
		return can.Control.extend({
			/**
			 * @override
			 * @description 初始化方法
			 */
			init: function() {
				var renderList = can.mustache(template_components_timeLimit);
				var html = renderList(this.options);
				this.element.html(html);
				//渲染页面
				this.render();

			//	去除导航条
				this.deleteNav();
			},
			render: function() {
				var that = this;
				//busizutil.encription(this.param);
				var api = new LHAPI({
					url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/activity/timelimitDiscount",
					data: {},
					method: 'post'
				});
				api.sendRequest()
					.done(function(data) {
						if(data.code == 1) {
							var TABLIST = data.response;
							var html = "";
							var activityId = "";
							var status = "";
							for(var i = 0; i < TABLIST.length; i++) {
								//判断抢购时间
								if(TABLIST[i].dateStr) {
									if(TABLIST[i].status == 1) {
										activityId = TABLIST[i].activityId;
										status = TABLIST[i].status
										html += " <a class='active' status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">正在抢购</a>";
									} else {
										html += " <a status = " + TABLIST[i].status + "  activityid = " + TABLIST[i].activityId + ">" + TABLIST[i].dateStr + "点场</a>";
									}
								};
							};
							$(".tabs").append(html);
 						};
 						 
						that.sendRequestNav(status);
						
						that.renderSecondkillList(data);
						
						that.countDown();
						
						// 执行倒计时
						that.timer = setInterval(function() {
							that.countDown();
						}, 1000);
						
						that.sendRequest(activityId, status);
						
					})
					.fail(function(error) {
						util.tip(error.msg);
					})
			},

			".tabs a click": function(element, event) {
				var that = this;
				$(".tabs .active").removeClass('active');
				element.addClass('active');
				that.sendRequest(event.target.getAttribute("activityid"), event.target.getAttribute("status"));
				that.sendRequestNav(event.target.getAttribute("status"));
			},

			renderSecondkillList: function(data) {
				if(data.response) {
					var TABLIST = data.response;
					for(var i = 0; i < TABLIST.length; i++) {
						if(TABLIST[i].status == 1) {
							var endtime = TABLIST[i].endTime;
							var nowtime = data.nowTime;
							this.shengyu = endtime - nowtime; //剩余时间
						}
					}
				}
			},

			countDown: function() {
				var hours;
				var minutes;
				var seconds;

				hours = Math.floor(this.shengyu / 3600);
				minutes = Math.floor((this.shengyu % 3600) / 60);
				seconds = Math.floor(this.shengyu % 60);

				if(hours < 10) hours = '0' + hours;
				if(minutes < 10) minutes = '0' + minutes;
				if(seconds < 10) seconds = '0' + seconds;

				$(".time-title-count-1").empty().append("本场结束还剩<em>" + hours + "</em>:<em>" + minutes + "</em>:<em>" + seconds + "</em>");
				--this.shengyu;

				if(this.shengyu < 0) {
					clearInterval(this.timer);
					window.location.reload();
				}
			},

			sendRequestNav: function(status) {

				if(status == 1) {

					$(".time-title-count-1").css("display", "block").siblings().css("display", "none");
				};

				if(status == 2) {

					$(".time-title-count-2").css("display", "block").siblings().css("display", "none");
				};

				if(status == 3) {

					$(".time-title-count-3").css("display", "block").siblings().css("display", "none");
				};
			},

			sendRequest: function(activityId, status) {
				var that = this;

				var param = {
					"activityId": activityId
				}
				var api = new LHAPI({
					url: "http://118.178.227.135/mobile-web-market/ws/mobile/v1/activity/timelimitList",
					data: JSON.stringify(param),
					method: 'post'
				});
				api.sendRequest()
					.done(function(data) {
						if(data.code == 1) {
							var BOXLIST = data.response;
							if(BOXLIST == "") {
								return false;
							}
							var HTML = "";
							for(var i = 0; i < BOXLIST.length; i++) {

								if(status == 1) {

									if(BOXLIST[i].status == 1) {

										HTML += "<div class='time-sale-box'><a href='' class='time-sale-img'><img src='" + BOXLIST[i].imgUrl + "'></a><a href='' class='time-sale-title'>" + BOXLIST[i].name + "</a>" +
											"<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><span><em class='time-sale-active'>还剩" + BOXLIST[i].total + "件</em></span><a href='javascript:;' class='time-sale-bt'>立即抢</a></div></div></div>"

									} else {

										HTML += "<div class='time-sale-box'><div class='time-sale-img'><img src='" + BOXLIST[i].imgUrl + "'><b><img src='images/673261975475219410.png'/></b></div><a href='' class='time-sale-title'>" + BOXLIST[i].name + "</a>" +
											"<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><a href='javascript:;' class='time-sale-ct'>已结束</a></div></div></div>"
									}
								};

								if(status == 3) {

									if(BOXLIST[i].total == 0) {

										HTML += "<div class='time-sale-box'><div class='time-sale-img'><img src='" + BOXLIST[i].imgUrl + "'><b><img src='images/673261975475219410.png'/></b></div><a href='' class='time-sale-title'>" + BOXLIST[i].name + "</a>" +
											"<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><a href='javascript:;' class='time-sale-ct'>已结束</a></div></div></div>"

									} else {

										HTML += "<div class='time-sale-box'><div class='time-sale-img'><img src='" + BOXLIST[i].imgUrl + "'></div><a href='' class='time-sale-title'>" + BOXLIST[i].name + "</a>" +
											"<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><a href='javascript:;' class='time-sale-ct'>已结束</a></div></div></div>"
									}

								};

								if(status == 2) {

									HTML += "<div class='time-sale-box'><a href='' class='time-sale-img'><img src='" + BOXLIST[i].imgUrl + "'></a><a href='' class='time-sale-title'>" + BOXLIST[i].name + "</a>" +
										"<div class='time-sale-msg'><em>限时购<i>¥" + BOXLIST[i].price + "</i><del>¥" + BOXLIST[i].originalPrice + "</del></em><div class='time-sale-btn'><span><em class='time-sale-tab'>还剩" + BOXLIST[i].total + "件</em></span><a href='javascript:;' class='time-sale-st'>即将开始</a></div></div></div>"
								};

								$(".swiper-slide").empty().append(HTML);
							};
						};
					})
					.fail(function(error) {
						util.tip(error.msg);
					})
			},
            deleteNav: function () {
                var param = can.deparam(window.location.search.substr(1));
                console.log(param.from);
                if (param.from == "app") {
                    $('.header').hide();
                    $('.tabs').css('top',0);
                    return false;
                }
            },

			'.back click': function() {

				if(util.isMobile.Android() || util.isMobile.iOS()) {
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

	});