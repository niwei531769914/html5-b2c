define(
  'lehu.hybrid', [
    'zepto',
    'can',
    'underscore',
    'md5',
    'store',
    'lehu.util',
  ],

  function($, can, _, md5, store, LHUtil) {
    'use strict';

    var param = can.deparam(window.location.search.substr(1));

    var setupWebViewJavascriptBridge = function(callback) {
      if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
      }
      if (window.WVJBCallbacks) {
        return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
        document.documentElement.removeChild(WVJBIframe)
      }, 0)
    };

    //获得URL地址
    var getUrl = function() {
      var url = {};

      //南京服务端地址
      url.SERVER_URL_NJ = "http://172.16.201.68:8082/";

      if (LHUtil.isMobile.Android() && window.JSInterface) {
        url.SERVER_URL = JSInterface.getServerUrl();
        url.IMAGE_URL = JSInterface.getImageUrl();
      } else {
        // url.SERVER_URL = "http://app.lehumall.com/";
        var host = window.location.host;
        if (host.indexOf("http://") == -1) {
          host = "http://" + host;
        }
        url.SERVER_URL = host + "/";
        url.IMAGE_URL = "http://lehumall.b0.upaiyun.com/";
      }

      return url;
    }

    // 运行native代码
    var nativeFun = function(params) {

      if (LHUtil.isMobile.Android()) {
        params = JSON.stringify(params);
        JSInterface.nativeFunction(params);
      } else if (LHUtil.isMobile.iOS()) {

          // 新版本
          setupWebViewJavascriptBridge(function(bridge) {

            bridge.callHandler(params.funName, params.params, function responseCallback(responseData) {
              // alert("调用新版本bridge成功");
              console.log("JS received response:", responseData)
            })
          })
      }
    };

    return {
      "getUrl": getUrl,
      "nativeFun": nativeFun
    }

  });