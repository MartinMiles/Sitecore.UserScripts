// ==UserScript==
// @name         Launchpad redirects to shell (Sitecore Desktop)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        */sitecore/client/Applications/Launchpad*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

     window.location.href = "/sitecore/shell/default.aspx";
})();