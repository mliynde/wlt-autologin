// ==UserScript==
// @name         wlt autologin
// @namespace    http://tampermonkey.net/
// @version      v0.2
// @description  Login the wlt automatically
// @author       Photon
// @match        http://wlt.ustc.edu.cn/cgi-bin/*
// @match        https://www.msn.cn/zh-cn
// @icon         http://wlt.ustc.edu.cn/favicon.ico
// @icon         https://www.msn.cn/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // 关闭页面并返回操作结果
    function closePage() {
        if (window.opener) {
            window.close();
            return true; // 返回 true 表示成功关闭页面
        } else {
            alert('请手动关闭此页面。');
            return false; // 返回 false 表示未能关闭页面
        }
    }

    const JS_NAME = '[wlt autologin]';

    // 获取整个 URL
    const currentUrl = window.location.href;

    // 检查 URL 是否为 https://www.msn.cn/zh-cn
    if (currentUrl === 'https://www.msn.cn/zh-cn') {
        const result = closePage();
        if (!result) {
            console.log(JS_NAME, '请手动关闭页面')
        }
    }

    // 检查 URL 中是否已经包含参数
    const urlParams = new URLSearchParams(window.location.search);
    const setdefault = urlParams.get('setdefault') || '';
    if (setdefault) { // 用户点击“ 退出登录 ”时会显示 setdefault 参数，以此作为判断依据
        const message = JS_NAME + ' ' + '检测到退出登录，不执行登录操作\n';
        console.log(message);
    } else if (urlParams.has('url') && urlParams.has('dip')) {
        // 自动点击“一键上网”按钮
        const oneClickButton = document.querySelector('input[name="set"][value="一键上网"]');
        if (oneClickButton) {
            oneClickButton.click();
        }
    }
    else{
        console.log(JS_NAME, '未执行命令');
    }
})();
