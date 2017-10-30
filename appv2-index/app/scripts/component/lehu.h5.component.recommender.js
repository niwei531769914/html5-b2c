define('lehu.h5.component.recommender', [
		'zepto',
		'can',
		'lehu.h5.business.config',
		'lehu.util',
		'lehu.h5.api',
		'lehu.hybrid',
		'md5',
		'store',

		'lehu.utils.busizutil',

		'text!template_components_recommender'
	],

	function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store, busizutil, template_components_recommender) {
		'use strict';

		return can.Control.extend({

			param: {},

			/**
			 * @override
			 * @description 初始化方法
			 */
			init: function() {
				this.initData();
				var params = can.deparam(window.location.search.substr(1));
				this.from = params.from;
				var renderList = can.mustache(template_components_recommender);
				var html = renderList(this.options);
				this.element.html(html);

				this.bindEvent();
			},

			bindEvent: function() {
				var that = this;

				this.userNameLength = 0;
				this.captchaLength = 0;

				$('.txt-phone').on('keyup', function() {
					that.userNameLength = this.value.length;
					that.enableLogin();
				});

				$('.txt-sms-captcha').on('keyup', function() {
					that.captchaLength = this.value.length;
					that.enableLogin();
				})
			},

			enableLogin: function() {
				if(this.userNameLength && this.captchaLength) {
					$('.btn-login').removeClass('btn-disabled');
				} else {
					$('.btn-login').addClass('btn-disabled');
				}
			},

			initData: function() {
				this.URL = busizutil.httpgain();

				//获取当前时间戳
				this.timeStamp = Date.parse(new Date());
			},

			countdown: function(time) {
				var that = this;
				setTimeout(function() {
					if(time > 0) {
						time--;
						that.element.find('.btn-retransmit').text(time + 's后重发').addClass('btn-retransmit-disabled');
						that.countdown.call(that, time);
					} else {
						that.element.find('.btn-retransmit').text('获取验证码').removeClass('btn-retransmit-disabled');
					}
				}, 1000);
			},

			checkmobile: function(mobile) {
				if(!mobile) {
					return false;
				}
				return /^1\d{10}$/.test(mobile);
			},

			'.txt-phone focus': function($element, event) {
				$(".item-tips").css("display", "none");
			},

			'.txt-sms-captcha focus': function($element, event) {
				$(".item-tips").css("display", "none");
			},

			".reg-protocol i click": function(element, event) {
				$(".reg-protocol").toggleClass('reg-protocol-selected');
			},

			'.btn-retransmit click': function(element, event) {

				if(element.hasClass("btn-retransmit-disabled")) {
					return false;
				}
				var that = this;
				var userName = $(".txt-phone").val();

				if(userName == "") {
					$(".err-msg").text("手机号码不能为空").parent().css("display", "block");
					return false;
				}

				if(!that.checkmobile(userName)) {
					$(".err-msg").text("手机号码格式错误").parent().css("display", "block");
					return false;
				}

				this.param = {
					'phoneCode': userName,
					'timeStamp': that.timeStamp
				};

				var api = new LHAPI({
					url: that.URL + '/mobile-web-user/ws/mobile/v1/user/getIdentifyingCode?sign=' + that.encription(this.param),
					data: JSON.stringify(this.param),
					method: 'post'
				});
				api.sendRequest()
					.done(function(data) {
						if(data.code == 1) {
							that.countdown.call(that, 60);
							$(".item-tips").css("display", "none");
						} else {
							$(".err-msg").text(data.msg).parent().css("display", "block");
						}
					})
					.fail(function(error) {
						$(".err-msg").text("短信验证码发送失败").parent().css("display", "block");
					})
			},

			'.btn-login click': function(element, event) {
				var that = this;

				if(element.hasClass('btn-disabled')) {
					return false;
				}

				var userName = $(".txt-phone").val();
				var captcha = $(".txt-sms-captcha").val();

				if(userName == "") {
					$(".err-msg").text("手机号码不能为空!").parent().css("display", "block");
					return false;
				}
				if(captcha == "") {
					$(".err-msg").text("验证码不能为空!").parent().css("display", "block")
					return false;
				}

				if(!that.checkmobile(userName)) {
					$(".err-msg").text("手机号码格式错误!").parent().css("display", "block");
					return false;
				}

				this.param = {
					'phoneCode': userName,
					'identifyingcode': captcha,
					'phoneToken': '',
					'origin': '5',
					'timeStamp': that.timeStamp
				};

				var api = new LHAPI({
					url: that.URL + '/mobile-web-user/ws/mobile/v1/user/register?sign=' + that.encription(this.param),
					data: JSON.stringify(this.param),
					method: 'post'
				});
				api.sendRequest()
					.done(function(data) {
						if(data.code == 1) {
							location.href = 'login.html?hyfrom=' + escape(that.from);
						} else {
							$(".err-msg").text(data.msg).parent().css("display", "block");
						}
					})
					.fail(function(error) {
						$(".err-msg").text('推荐人登录失败').parent().css("display", "block");
					})
			},

			'.back click': function() {
				history.go(-1);
			}

		});

	});