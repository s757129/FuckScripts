// ==UserScript==
// @name         去他のC语言中文网
// @namespace    s757129
// @version      1.1.1
// @description  屏蔽C语言中文网广告加菊部美化
// @author       柒伍七
// @match        *://c.biancheng.net/*
// @match        *://m.biancheng.net/*
// @match        *://vip.biancheng.net/*
// @icon         http://c.biancheng.net/favicon.ico
// @require      https://unpkg.com/jquery@3.6.0/dist/jquery.js
// @require      https://unpkg.com/sweetalert2@11.4.7/dist/sweetalert2.min.js
// @resource     SwalCSS https://unpkg.com/sweetalert2@11.4.7/dist/sweetalert2.min.css
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceText
// @grant        GM_registerMenuCommand
// @homepage     https://github.com/s757129/FuckScripts
// @license      MIT
// ==/UserScript==
 
(function () {
    'use strict';
 
    //unsafeWindow
    unsafeWindow.GM_addStyle = GM_addStyle;
    unsafeWindow.GM_getValue = GM_getValue;
    unsafeWindow.GM_setValue = GM_setValue;
    unsafeWindow.GM_getResourceText = GM_getResourceText;
    unsafeWindow.GM_registerMenuCommand = GM_registerMenuCommand;
 
    //使用旧版首页
    var localhref = unsafeWindow.location;
    if(localhref.href.indexOf('c.biancheng.net/cpp')!=-1) {
        localhref.replace("/");
    }
    if(localhref.href.indexOf('m.biancheng.net/cpp')!=-1) {
        localhref.replace("/");
    }
 
    //菜单
    let main = {
 
        //隐藏已知广告
        hidead() {
            GM_addStyle('#top-banner,#q2a-fudao,#product-type li a[href*="fudao"],#nav-main li a[href*="fudao"],#arc-append,blockquote,#ad-arc-top,#ad-bottom-weixin{display:none; !important}');
            //HTML注释
            $('*').contents().each(function () {
                if(this.nodeType === Node.COMMENT_NODE) {
                    $(this).remove();
                }
            });
        },
 
        //隐藏会员中心
        hidevip() {
            GM_addStyle('#topbar,.user-info,#nav-main li a[href*="vip.biancheng.net"]{display:none; !important}');
        },
 
        //隐藏付费内容
        hidecost() {
            $('.vip').hide();
            $('.glyphicon-usd').parent().hide();
            if($('.tip-box').val("高级教程")) {
                $('.tip-box').hide();
            }
        },
 
        //阻止新建标签
        disabledblank() {
            $('a').removeAttr("target");
        },
 
        //还原默认样式
        revertcss() {
            //自定义样式
            let NewStyle = `
#tutorial-title{ color: #121212;font-size: 1.99em;font-weight: bold; }
h1,#product-type li,#nav-main li,.channel-num+a,#contents dt{ font-weight: bold; }
#product-type li,#nav-main li{ font-size: 1.01em; }
#tutorial .t-type{ font-size:1.23em; }
            `;
            //载入资源
            GM_addStyle(NewStyle);
        },
 
    };
 
    //判断配置
    if (GM_getValue('setting_hide_ad')) {
        main.hidead();
    };
    if (GM_getValue('setting_hide_vip')) {
        main.hidevip();
    };
    if (GM_getValue('setting_hide_cost')) {
        main.hidecost();
    };
    if (GM_getValue('setting_disabled_blank')) {
        main.disabledblank();
    };
    if (GM_getValue('setting_revert_css')) {
    } else {
        main.revertcss();
    };
 
    //默认配置
    let value = [{
        name: 'setting_hide_ad',
        value: true
    }, {
        name: 'setting_hide_vip',
        value: true
    }, {
        name: 'setting_hide_cost',
        value: true
    }, {
        name: 'setting_disabled_blank',
        value: true
    }, {
        name: 'setting_revert_css',
        value: false
    }];
    value.forEach((v) => {
        GM_getValue(v.name) === undefined && GM_setValue(v.name, v.value);
    });
 
    //设置
    GM_registerMenuCommand('⚙️ 设置', () => {
 
        //CSS
        let SwalStyle = `
.setting-container { z-index: 99999; !important }
.setting-label { display: flex;align-items: center;justify-content: space-between;letter-spacing:2px;margin:11px 22px; }
.switch-btn { cursor: pointer;width: 45px;height: 28px;position: relative;border: 1px solid #dfdfdf;background-color: #fdfdfd;box-shadow: #dfdfdf 0 0 0 0 inset;border-radius: 15px;background-clip: content-box;display: inline-block;-webkit-appearance: none;user-select: none;outline: none; }
.switch-btn:before {content: '';width: 25px;height: 25px;position: absolute;top: 0;left: 0;border-radius: 20px;background-color: #fff;box-shadow: 0 1px 3px rgba(0, 0, 0, .4); }
.switch-btn:checked { border-color: #7066e0;box-shadow: #7066e0 0 0 0 16px inset;background-color: #7066e0; }
.switch-btn:checked:before { left: 18px; }
.switch-btn.switch-btn-animbg { transition: background-color ease .4s; }
.switch-btn.switch-btn-animbg:before { transition: left .3s; }
.switch-btn.switch-btn-animbg:checked { box-shadow: #dfdfdf 0 0 0 0 inset;background-color: #7066e0;transition: border-color .4s, background-color ease .4s; }
.switch-btn.switch-btn-animbg:checked:before { transition: left .3s; }
		`;
 
        //HTML
        let Swalhtml = `
<label class="setting-label">隐藏已知广告<input id="hide_ad" ${GM_getValue('setting_hide_ad') ? 'checked' : ''} type="checkbox" class="switch-btn switch-btn-animbg" /></label>
<label class="setting-label">隐藏会员中心<input id="hide_vip" ${GM_getValue('setting_hide_vip') ? 'checked' : ''} type="checkbox" class="switch-btn switch-btn-animbg" /></label>
<label class="setting-label">隐藏付费内容<input id="hide_cost" ${GM_getValue('setting_hide_cost') ? 'checked' : ''} type="checkbox" class="switch-btn switch-btn-animbg" /></label>
<label class="setting-label">阻止新建标签<input id="disabled_blank" ${GM_getValue('setting_disabled_blank') ? 'checked' : ''} type="checkbox" class="switch-btn switch-btn-animbg" /></label>
<label class="setting-label">还原默认样式<input id="revert_css" ${GM_getValue('setting_revert_css') ? 'checked' : ''} type="checkbox" class="switch-btn switch-btn-animbg" /></label>
    	`;
 
        //载入资源
        GM_addStyle(GM_getResourceText('SwalCSS'));
        GM_addStyle(SwalStyle);
 
        //SweetAlert2
        Swal.fire({
            icon: 'info',
            title: '<strong>自定义配置</strong>',
            html: Swalhtml,
            showCloseButton: true,
            confirmButtonText: '保存',
            footer: '<div style="text-align: center;font-size: 1em;">一起学习 <a href="https://bbs.tampermonkey.net.cn/thread-184-1-1.html" target="_blank" style="color:#7066e0;">油猴脚本开发</a> 吧，此脚本免费开源，Powered by <a href="https://github.com/s757129" target="_blank" style="color:#7066e0;font-weight:bold;">柒伍七</a></div>',
        }).then((result) => {
            result.isConfirmed && history.go(0);
        });
 
        //Checkbox
        document.getElementById('hide_ad').addEventListener('change', (e) => {
            GM_setValue('setting_hide_ad', e.target.checked);
        });
        document.getElementById('hide_vip').addEventListener('change', (e) => {
            GM_setValue('setting_hide_vip', e.target.checked);
        });
        document.getElementById('hide_cost').addEventListener('change', (e) => {
            GM_setValue('setting_hide_cost', e.target.checked);
        });
        document.getElementById('disabled_blank').addEventListener('change', (e) => {
            GM_setValue('setting_disabled_blank', e.target.checked);
        });
        document.getElementById('revert_css').addEventListener('change', (e) => {
            GM_setValue('setting_revert_css', e.target.checked);
        });
 
    });
 
})();
