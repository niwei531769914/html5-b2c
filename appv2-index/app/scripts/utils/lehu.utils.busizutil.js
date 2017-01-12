'use strict';

define('lehu.utils.busizutil', [
  'zepto',
  'can',
  'underscore',
  'md5',
  'store',

  'tripledes',
  'modeecb',

  'lehu.h5.business.config'
], function($, can, _, md5, store,
  tripledes, modeecb,
  config) {

  /**
   * 接口加密key
   */
  var KEY = "abc123wm456de789";
  var DES3_KEY = "eimseimseim@wm100$#365#$";
  var DES3_IV = "20141109";

  var encription = function(params) {
    var paramStr = getSignDataString(params);
    params["mKey"] = paramStr;
  }

  var getSignDataString = function(params) {
    var that = this;
    var arr = [];

    // 将Map变成Array，使用key=value的方式进行拼接
    _.each(params, function(value, key) {
      arr.push(key);
    });

    // 以ascii进行排序
    arr.sort();

    var result = [];
    _.each(arr, function(item) {
      result.push(des3(params[item]));
    })

    // 将队列拼接成String
    var str = result.join('');
    str = str + KEY;

    // 做md5加密
    return md5(str);
  }

  var des3 = function(str) {
    var keyHex = CryptoJS.enc.Utf8.parse(DES3_KEY);
    var encrypted = CryptoJS.TripleDES.encrypt(str, keyHex, {
      iv: CryptoJS.enc.Utf8.parse(DES3_IV),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    console.log(encrypted.toString());
    return encrypted.toString();
  };

  /**
   * 获取密码强度  
   * @param password
   * @return 1弱  2中  3强
   */
  var getPasswordSafe = function(password) {
    if (!password) {
      return "1"
    }

    //数字，字母，特殊符号
    var hasNumber = 0;
    var hasZimu = 0;
    var hasOther = 0;

    var arr = password.split("");

    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      if (item >= '0' && item <= '9') {
        //0-9数字
        hasNumber = 1;
        continue;
      }

      //65-90, 97-122
      if ((item >= 'A' && item <= 'Z') || (item >= 'a' && item <= 'z')) {
        hasZimu = 1;
        continue;
      } else {
        //其他字符都算为特殊字符
        hasOther = 1;
      }
    }
    return "" + (hasNumber | hasZimu | hasOther);
  };

  var getUserId = function() {
    var param = can.deparam(window.location.search.substr(1));
    var userId = param.token;
    if (userId) {
      return userId;
    }

    var user = store.get("token");
    if (user) {
      userId = user.userId;
    }

    return userId;
  }

  return {
    encription: encription,
    getPasswordSafe: getPasswordSafe,
    getUserId: getUserId
  };

});