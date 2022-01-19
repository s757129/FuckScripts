// ==UserScript==
// @name         C语言中文网隐藏VIP去广告
// @namespace    https://github.com/s757129/Tampermonkey
// @version      0.0.1
// @description  * try to take over the world!
// @author       s757129
// @include      *://c.biancheng.net*
// @icon         http://c.biancheng.net/favicon.ico
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

(function () {
    'use strict';

    // 阻止新建标签页
    $('a').removeAttr("target")

    // 移除顶部VIP栏
    $('#topbar').remove();

    // 移除个人中心图标
    $('.user-info').remove();

    // 移除文中关注引流
    $('#arc-append').remove();
    $('#ad-bottom-weixin').remove();

    // 移除部分页脚信息
    $('div.left').remove();
    $('img.right').remove();

    // 隐藏VIP功能
    $('.vip').remove();
    //$('a[href*="view/vip"]').parent().remove();
    $('.glyphicon').parent().remove();
    $('#ad-arc-top').remove();
    $('blockquote').remove();
    if($('.tip-box').val("高级教程"))
    {
        $('.tip-box').remove();
    }

    // 新版首页直接跳转
    var localhref = unsafeWindow.location;
    if(localhref.href.indexOf('c.biancheng.net/cpp')!=-1)
    {
        localhref.replace("/");
    }

    // 精简旧版首页
    $('#top-banner').remove();
    $('#q2a-fudao').remove();
    $('#nav-main li a[href*="show.php"]').remove();
    $('#nav-main li a[href*="fudao"]').remove();

    // 虽然但是改个样式
    GM_addStyle('#tutorial-title{font-size:2.22em; font-weight:bold; color:#121212; !important}')

})();

console.log("try to take over the world!")
