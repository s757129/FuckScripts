// ==UserScript==
// @name         去他の油猴中文网
// @namespace    https://github.com/s757129/Tampermonkey
// @version      1.0.1
// @description  屏蔽油猴中文网广告加菊部美化
// @author       柒伍七
// @include      *://bbs.tampermonkey.net.cn*
// @icon         https://bbs.tampermonkey.net.cn/favicon.ico
// @run-at       document-start
// @grant        unsafeWindow
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    //unsafeWindow
    unsafeWindow.GM_addStyle = GM_addStyle;

    //fuckStyle
    let fuckStyle = `
.comiis_nv_pop,.a_f,.a_p { display: none; !important }
.mn { width: 100%;height: 100%;left: 0; top:0; right:0; bottom: 0;margin: auto; }
    `;

    //载入资源
    GM_addStyle(fuckStyle);

})();
