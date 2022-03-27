// ==UserScript==
// @name         去他の粤工程校园网
// @namespace    https://github.com/s757129/Tampermonkey
// @version      1.0.2
// @description  自动登录粤工程西区宿舍校园网
// @author       柒伍七
// @include      http*://10.10.0.76*
// @icon         https://www.gdep.edu.cn/__local/1/78/44/67DBBD0E4AF7849771AEBA0A69A_8F5875B0_45D51.jpg?e=.jpg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    //设置
    var userid = "账号";
    var passwd = "密码";
    
    //你有对象么？
    document.querySelector('#userid').value=userid;
    document.querySelector('#passwd').value=passwd;
    
    //延迟点击登录按钮
    setTimeout("document.querySelector('#loginsubmit').click();",99);

})();
