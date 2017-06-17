//页面rem
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      var clientWidth = $(".nwrapper").width();
      /*if (!clientWidth) return;*/
      docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';

    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);



window.onload = function() {
  //淡入
  $("body").css("visibility", "visible");
  $("body").addClass("jbox");
};