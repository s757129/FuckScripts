// ==UserScript==
// @name         C语言中文网移除VIP与广告
// @namespace    https://github.com/s757129/Tampermonkey
// @version      0.2.1
// @description  🌈移除C语言中文网广告，支持显示与隐藏付费内容，默认隐藏...
// @author       s757129
// @include      *c.biancheng.net*
// @include      *vip.biancheng.net*
// @icon         http://c.biancheng.net/favicon.ico
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
// @resource     btnui https://www.bootcss.com/p/buttons/css/buttons.css
// @grant        unsafeWindow
// @grant        GM_log
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @run-at       document-start
// @note         2022/01/23 0.2.1 新增显示与隐藏付费内容滴功能
// @note         2022/01/20 0.1.0 新增和修改一些然并卵滴东西
// @note         2022/01/19 0.0.2 蒙查查滴修复一些问题
// @note         2022/01/19 0.0.1 乱七八糟滴初版发布
// ==/UserScript==

(function () {
    'use strict';

    /* * * * * * * * * * */
    unsafeWindow.GM_log = GM_log;
    unsafeWindow.GM_addStyle = GM_addStyle;
    unsafeWindow.GM_getResourceText = GM_getResourceText;
    unsafeWindow.GM_registerMenuCommand = GM_registerMenuCommand;
    /* * * * * * * * * * */


    // 加载buttons.css资源
    GM_addStyle(GM_getResourceText('btnui'));
    /* * * * * * * * * * */


    // 新版首页直接跳转至旧版首页
    var localhref = unsafeWindow.location;
    if(localhref.href.indexOf('c.biancheng.net/cpp')!=-1)
    {
        localhref.replace("/");
    }
    /* * * * * * * * * * */


    // 移除旧版首页广告
    $('#top-banner').remove();
    $('#q2a-fudao').remove();
    $('li a[href*="fudao.biancheng.net"]').remove();
    /* * * * * * * * * * */


    // 移除HTML注释广告
    $('*').contents().each(function () {
        if(this.nodeType === Node.COMMENT_NODE){
            $(this).remove();
        }
    });
    /* * * * * * * * * * */


    // 移除文中广告
    $('#arc-append').remove();
    $('#ad-bottom-weixin').remove();
    $('#ad-arc-top').remove();
    $('blockquote').remove();
    /* * * * * * * * * * */


    // 移除页脚
    $('#footer').remove();
    /* * * * * * * * * * */


    // 阻止新建标签页
    $('a').removeAttr("target");
    $('.pc-yes a').removeAttr("target");
    /* * * * * * * * * * */


    // 显示与隐藏VIP付费内容
    let main = {
        // 隐藏VIP付费内容
        isviphide() {
            // 隐藏VIP付费文章
            $('.vip').hide();
            $('.glyphicon-usd').parent().hide();
            if($('.tip-box').val("高级教程"))
            {
                $('.tip-box').hide();
            }
            // 隐藏顶栏VIP相关内容
            $('#nav-main li a[href*="vip.biancheng.net"]').hide();
            $('#topbar').hide();
            $('.user-info').hide();
        },
        // 显示VIP付费内容
        isvipshow() {
            // 显示VIP付费文章
            $('.vip').show();
            $('.glyphicon-usd').parent().show();
            if($('.tip-box').val("高级教程"))
            {
                $('.tip-box').show();
            }
            // 显示顶栏VIP相关内容
            $('#nav-main li a[href*="show.php"]').show();
            $('#topbar').show();
            $('.user-info').show();
        },
    };
    /* * * * * * * * * * */


    // 右下角悬浮按钮
    var isvip,returntop;
    var selectbody = document.querySelector("body");
    var docgetbody = document.getElementsByTagName("body")[0];
    // 切换模式功能
    isvip = document.createElement("button");
    isvip.className = "button button-raised button-border button-circle button-large";
    docgetbody.setAttribute("vip","false");
    isvip.title = "显示付费内容";
    selectbody.appendChild(isvip);
    isvip.innerHTML = "$";
    isvip.style = "position:fixed;bottom:99px;right:23px;font-size:1.78em;font-weight:bold;cursor:pointer;";
    isvip.onclick = function () {
        if(docgetbody.getAttribute('vip') == "false") {
            docgetbody.setAttribute('vip','true')
            isvip.title = "隐藏付费内容";
            main.isvipshow();
        } else {
            docgetbody.setAttribute('vip','false')
            isvip.title = "显示付费内容";
            main.isviphide();
        }
    };
    main.isviphide();
    // 回到顶部功能
    returntop = document.createElement("button");
    returntop.className = "button button-raised button-border button-circle button-large";
    returntop.title = "回到顶部";
    selectbody.appendChild(returntop);
    returntop.innerHTML = "￪";
    returntop.style = "position:fixed;bottom:29px;right:23px;font-size:2.89em;font-weight:bold;cursor:pointer;";
    returntop.onclick = function(){scroll(0,0);};
    /* * * * * * * * * * */


    // 零基础油猴脚本开发
    $('.read-num').html(`<div id="ggnbdiv">
    <button type="button" id="ggnbbtn" class="button-small button-border button-rounded button-primary" style="cursor:pointer;" title="自己动手,丰衣足食!李恒道哥哥牛逼!">
    <img src="https://space.bilibili.com/favicon.ico" style="height:18px;width:18px;transform:translate(-7px,3px)" />
    油猴开发</button></div>`);
    $('#ggnb').click(function () {
        unsafeWindow.open("https://space.bilibili.com/1037793830");
    })
    // button样式
    GM_addStyle(`
    #ggnbbtn {
    width: 12.3em; !important
    font-size: 13px; !important
    padding: 1px 10px; !important
    letter-spacing: 3px; !important
    }`)
    // div偏移
    GM_addStyle(`
    #ggnbdiv {
    transform: translate(-36px,-13px)
    }`)
    /* * * * * * * * * * */


    // 给那个标题加个样式
    GM_addStyle(`
    #tutorial-title {
    color: #121212; !important
    font-size: 2.22em; !important
    font-weight: bold; !important
    }`);
    /* * * * * * * * * * */


    // 没什么用的打印
    GM_log('自己动手,\n丰衣足食!\n李恒道哥哥牛逼!\n哥哥好棒!哥哥加油!哥哥冲鸭!\n我这一辈子为哥哥痴,为哥哥狂,为哥哥哐哐撞大墙!');
    /* * * * * * * * * * */

})();
