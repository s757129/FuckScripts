// ==UserScript==
// @name         C语言中文网移除VIP与广告
// @namespace    https://github.com/s757129/Tampermonkey
// @version      0.0.2
// @author       s757129
// @include      *://c.biancheng.net*
// @icon         http://c.biancheng.net/favicon.ico
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @grant        GM_addStyle
// @grant        unsafeWindow
// @description  【0.0.2】/1.蒙查查修复一些问题/2.修改脚本名称与描述
// @description  【0.0.1】/1.阻止新建标签页/2.移除顶栏VIP相关内容/3.移除文中引流广告/4.移除文中VIP相关内容/5.精简旧版首页/6.移除部分页脚内容/7.新版首页直接跳转至旧版首页
// ==/UserScript==

(function () {
    'use strict';

    // 阻止新建标签页
    $('a').removeAttr("target")

    // 移除顶部VIP相关栏
    $('#topbar').remove();

    // 移除顶栏个人中心图标
    $('.user-info').remove();

    // 移除文中关注引流
    $('#arc-append').remove();
    $('#ad-bottom-weixin').remove();

    // 移除部分页脚信息
    $('div.left').remove();
    $('img.right').remove();

    // 移除VIP相关内容
    $('.vip').remove();
    $('.glyphicon-usd').parent().remove();
    $('#ad-arc-top').remove();
    $('blockquote').remove();
    if($('.tip-box').val("高级教程"))
    {
        $('.tip-box').remove();
    }

    // 新版首页直接跳转至旧版首页
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
