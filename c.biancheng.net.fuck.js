// ==UserScript==
// @name         C语言中文网移除VIP与广告
// @namespace    https://github.com/s757129/Tampermonkey
// @version      0.2.2
// @description  💪 移除C语言中文网广告，支持显示与隐藏付费内容，默认隐藏 ...
// @author       s757129
// @include      *c.biancheng.net*
// @include      *vip.biancheng.net*
// @icon         http://c.biancheng.net/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @resource     btnui https://www.bootcss.com/p/buttons/css/buttons.css
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_log
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceText
// @note         2022/01/23 1.2.1 修复了一些已知问题
// @note         2022/01/23 1.2.0 支持显示与隐藏付费内容
// @note         2022/01/20 1.1.0 新增了一些样式内容
// @note         2022/01/19 1.0.1 修复了一些已知问题
// @note         2022/01/19 1.0.0 初版发布
// ==/UserScript==

(function () {
    'use strict';

    /* * * setting * * */
    var setvip = 0; // 🌈 设置是否显示付费内容（否"0"，是"1"）默认隐藏
    /* * * * * * * * * * */


    /* * * spy * * */
    unsafeWindow.GM_log = GM_log;
    unsafeWindow.GM_addStyle = GM_addStyle;
    unsafeWindow.GM_getValue = GM_getValue;
    unsafeWindow.GM_setValue = GM_setValue;
    unsafeWindow.GM_getResourceText = GM_getResourceText;
    /* * * * * * * * * * */


    /* * * 资源 * * */
    GM_addStyle(GM_getResourceText('btnui'));
    /* * * * * * * * * * */


    /* * * 广告 * * */
    GM_addStyle('#top-banner,#q2a-fudao,#product-type li a[href*="fudao"],#nav-main li a[href*="fudao"],#arc-append,blockquote,#ad-arc-top,#ad-bottom-weixin,#footer{display:none; !important}');
    // 新版首页直接跳转至旧版首页
    var localhref = unsafeWindow.location;
    if(localhref.href.indexOf('c.biancheng.net/cpp')!=-1) {
        localhref.replace("/");
    }
    // 阻止新建标签页
    $('a').removeAttr("target");
    // HTML注释
    $('*').contents().each(function () {
        if(this.nodeType === Node.COMMENT_NODE) {
            $(this).remove();
        }
    });
    /* * * * * * * * * * */


    /* * * 会员 * * */
    let main = {
        // 隐藏
        isviphide() {
            // 文章
            $('.vip').hide();
            $('.glyphicon-usd').parent().hide();
            if($('.tip-box').val("高级教程")) {
                $('.tip-box').hide();
            }
            // 顶栏
            GM_addStyle('#topbar,.user-info,#nav-main li a[href*="vip.biancheng.net"]{display:none; !important}');
        }
    };
    // 判断
    GM_setValue('isvip',setvip);
    switch (GM_getValue('isvip')){
    case 0:
        main.isviphide();
        break;
    case 1:
        break;
    }
    /* * * * * * * * * * */


    /* * * 悬浮按钮 * * */
    var night,returntop;
    var selectbody = document.querySelector("body");
    // 油猴脚本开发指南教程目录
    night = document.createElement("div");
    night.className = "button button-raised button-border button-circle button-large";
    night.title = "菊花开了";
    selectbody.appendChild(night);
    night.innerHTML = "✿";
    night.style = "position:fixed;bottom:101px;right:23px;font-size:1.78em;font-weight:bold;box-shadow:rgba(15, 66, 76, 0.25) 0px 0px 7px 3px;cursor:pointer;";
    night.onclick = function () {unsafeWindow.open("https://bbs.tampermonkey.net.cn/thread-184-1-1.html");};
    // 返回到当前页面顶部
    returntop = document.createElement("button");
    returntop.className = "button button-raised button-border button-circle button-large";
    returntop.title = "回到顶部";
    selectbody.appendChild(returntop);
    returntop.innerHTML = "￪";
    returntop.style = "position:fixed;bottom:29px;right:23px;font-size:2.89em;font-weight:bold;box-shadow:rgba(15, 66, 76, 0.25) 0px 0px 7px 3px;cursor:pointer;";
    returntop.onclick = function(){scroll(0,0);};
    /* * * * * * * * * * */


    /* * * 美化 * * */
    $('.channel-num').attr('class','channel-num button button-circle');
    GM_addStyle('.channel-num{font-weight:bold;box-shadow:rgba(15, 66, 76, 0.25) 0px 0px 8px 3px;}');
    GM_addStyle('#tutorial-title{color:#121212;font-size:1.99em;font-weight:bold;}');
    GM_addStyle('h1,#product-type li,#nav-main li,.channel-num+a,#contents dt{font-weight:bold;}');
    GM_addStyle('#product-type li,#nav-main li{font-size:1.01em;}');
    GM_addStyle('#tutorial .t-type{font-size:1.23em;}');
    /* * * * * * * * * * */


    /* * * 打印 * * */
    GM_log('自己动手,\n丰衣足食.\n李恒道哥哥牛逼!\n哥哥好棒!哥哥加油!哥哥冲鸭!\n我这一辈子为哥哥痴,为哥哥狂,为哥哥哐哐撞大墙!');
    /* * * * * * * * * * */

})();
