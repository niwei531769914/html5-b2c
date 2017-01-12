'use strict';

/**
 * @author jiyanliang
 * @class lehu.h5.framework.common
 * @description comm通信基类
 */
define([
    'zepto',
    'zepto.cookie',
    'can',
    'underscore',
    'md5',
    'store',
    'lehu.h5.business.config'
  ],

  function($, cookie, can, _, md5, store, LHBizConfig) {

    can.route.ready();

    var LHBaseComm = can.Construct.extend({

      /**
       * api的定义需要被每个子类复写
       * @type {Object}
       */
      api: {},

      /**
       * @override
       * @function init
       * @description 初始化方法
       * @param  {Object} data 传入的涌来提交服务端的数据
       */
      init: function(data) {
        this.setData(data);
      },

      /**
       * @function setData
       * @description 修改请求参数
       */
      setData: function(data) {
        this.url = data.url;
        this.data = data.data;
        this.method = data.method;
      },

      /**
       * @function sendRequest
       * @description 构建请求
       * @param {boolean} isForceUserLogin 是否需要强制用户登录
       * @return {Object} can.Deferred
       */
      sendRequest: function(isForceUserLogin, type) {

        //step1 构建ajax请求数据，放到baseCommon的全局变量中，可以支持多个请求一起发送
        var requestData = this.buildRequestData();

        var method = this.getMethod();

        //step2 发送请求,获得返回数据
        return this.request(requestData, method, isForceUserLogin);
      },

      buildRequestData: function() {
        return this.data;
      },

      getMethod: function() {
        return this.method;
      },

      /**
       * @function checkUserLogin
       * @description 检查用户是否登陆
       * @return {Boolean} 用户是否登陆
       */
      checkUserLogin: function() {
        // var csrf = window.localStorage ? window.localStorage.getItem('csrfToken') : $.jStorage.get('csrfToken');

        var csrf = store.get('csrfToken');
        return !!($.fn.cookie(LHBaseComm._aid + '_ct') && csrf);
      },

      /**
       * @function goToLogin
       * @description 跳转到登陆
       */
      goToLogin: function() {
        // 获取现在的pathname作为跳转的from依据
        // var path = window.location.pathname;
        var path = window.location.href;
        if (path !== LHBizConfig.setting.login) {
          window.location.href = "/login.html" + '?from=' + escape(path);
        }
      },

      /**
       * @function request
       * @param  {Map}     data             请求参数
       * @param  {Boolean} isForceUserLogin 是否需要强制登陆
       * @return {can.Deferred}
       */
      request: function(data, method, isForceUserLogin) {
        var def = can.Deferred();

        var that = this;

        var successCallback = function(response) {
          def.resolve(response);
        }

        var failCallback = function(error) {
          def.reject(error);
        }

        $.ajax({
            url: this.url,
            type: method || 'get',
            contentType: method == 'get' ? "text/x-json;charset=UTF-8" : "application/x-www-form-urlencoded; charset=UTF-8",
            data: data,
            success: function(response) {

              var result = JSON.parse(response);
              if (result.type === 1) {
                successCallback(result);
              } else if (result.type === 0) {
                failCallback(result);
              }
            },
            fail: function(error) {
              failCallback(error);
            }
          })
          .done(function(response) {
            var result = JSON.parse(response);
            if (response.type === 1) {
              successCallback(result);
            } else if (response.type === 0) {
              failCallback(result);
            }
          })
          .fail(function(error) {
            failCallback(error);
          });

        return def;
      },

      /**
       * @description 通过服务端接口每次从stat中返回的system在客户端中保留服务端时间
       * @return {Int} 服务端时间的时间戳
       */
      getServerTime: function() {
        return this.serverTime;
      },

      /**
       * @description 调用简单的ajax请求
       * @param  {Map} data 请求$.ajaxSetting
       * @return {Object} can.Deferred
       */
      ajax: function(data) {
        return can.ajax(data);
      }
    });

    return LHBaseComm;
  });