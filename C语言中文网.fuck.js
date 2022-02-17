// ==UserScript==
// @name         去他のC语言中文网
// @namespace    https://github.com/s757129/Tampermonkey
// @version      1.0.0
// @description  try to take over the world!!
// @author       柒伍七
// @include      http*://c.biancheng.net*
// @include      http*://vip.biancheng.net*
// @icon         http://c.biancheng.net/favicon.ico
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @resource     btnui https://cdn.staticfile.org/Buttons/2.0.0/css/buttons.min.css
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
    'use strict';

    var setvip = 0; // 🌈 设置是否显示付费内容（显示"1"，隐藏"0"）默认隐藏

    //unsafeWindow
    unsafeWindow.GM_addStyle = GM_addStyle;
    unsafeWindow.GM_getValue = GM_getValue;
    unsafeWindow.GM_setValue = GM_setValue;
    unsafeWindow.GM_getResourceText = GM_getResourceText;

    //加载css资源
    GM_addStyle(GM_getResourceText('btnui'));

    //隐藏广告
    GM_addStyle('#top-banner,#q2a-fudao,#product-type li a[href*="fudao"],#nav-main li a[href*="fudao"],#arc-append,blockquote,#ad-arc-top,#ad-bottom-weixin{display:none; !important}');
    //HTML注释
    $('*').contents().each(function () {
        if(this.nodeType === Node.COMMENT_NODE) {
            $(this).remove();
        }
    });

    //新版首页直接跳转至旧版首页
    var localhref = unsafeWindow.location;
    if(localhref.href.indexOf('c.biancheng.net/cpp')!=-1) {
        localhref.replace("/");
    }
    //阻止新建标签页
    $('a').removeAttr("target");

    //菜单
    let main = {
        //隐藏付费内容
        isviphide() {
            //文章
            $('.vip').hide();
            $('.glyphicon-usd').parent().hide();
            if($('.tip-box').val("高级教程")) {
                $('.tip-box').hide();
            }
            //顶栏
            GM_addStyle('#topbar,.user-info,#nav-main li a[href*="vip.biancheng.net"]{display:none; !important}');
        }
    };
    //判断是否隐藏
    GM_setValue('isvip',setvip);
    switch (GM_getValue('isvip')){
    case 0:
        main.isviphide();
        break;
    case 1:
        break;
    }

    //美化
    $('.channel-num').attr('class','channel-num button button-circle');
    GM_addStyle('.channel-num{font-weight:bold;box-shadow:rgba(15, 66, 76, 0.25) 0px 0px 7px 3px;}');
    GM_addStyle('#tutorial-title{color:#121212;font-size:1.99em;font-weight:bold;}');
    GM_addStyle('h1,#product-type li,#nav-main li,.channel-num+a,#contents dt{font-weight:bold;}');
    GM_addStyle('#product-type li,#nav-main li{font-size:1.01em;}');
    GM_addStyle('#tutorial .t-type{font-size:1.23em;}');

})();
