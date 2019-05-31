// ==UserScript==
// @name         Sitecore autologin
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically logs into Sitecore, especially helpful on session timeouts
// @author       Martin Miles
// @match        */sitecore/login*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var login = document.getElementById('UserName');
    var password = document.getElementById('Password');
    var submit = document.getElementById('LogInBtn');

    login.value = 'admin';
    password.value = 'b';
    submit.click();
})();