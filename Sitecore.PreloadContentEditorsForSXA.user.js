// ==UserScript==
// @name         Shell opens tabs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *rssbplatform.dev.local/sitecore/shell/default.aspx*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    ///////////////////////////
    //
    //   Promise implementation
    //
    ///////////////////////////

    const settings = { enableLogging: false };

    const items = {
        content: "{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}",
        content_tenant: "{3E49489A-45F6-4FDC-BC53-CA40592AE944}",
        content_site: "{6B81532B-FCF4-461A-9964-C82980AE2933}",
        content_site_home: "{8CCB4C5D-B4A2-4476-91AA-275E9D1FB05B}",
        content_site_data: "{D1F7AC1A-9A4F-4009-A9F4-F8012C25FD9D}",
        content_site_presentation: "{2273EE5A-C314-4453-A2F4-69AD28B5B252}",
        content_site_presentation_renderingVariants: "{A9A0A0B7-C16F-49C9-BDBB-4CCFFC15124A}",

        layout: "{EB2E4FFD-2761-4653-B052-26A64D385227}",
        renderings: "{32566F0E-7686-45F1-A12F-D7260BD78BC3}",
        feature: "{DA61AD50-8FDB-4252-A68F-B4470B1C9FE8}",
        renderings_tenant: "{CD3E1C5B-DF68-439B-8AA3-055FE2FD7D42}",
        renderings_tenant_components: "{A69A614C-11BC-4052-949F-54978988F653}",

        media: "{3D6658D8-A0BF-4E75-B3E2-D050FABCF4E1}",
        media_project: "{90AE357F-6171-4EA9-808C-5600B678F726}",
        media_project_tenant: "{32F3AB79-540A-4BE2-A454-BCFE0A118A04}",
        media_project_tenant_site: "{030C8CA1-DA99-46B1-80D1-58188DAC3C9B}",

        templates: "{3C1715FE-6A13-4FCF-845F-DE308BA9741D}",
        templates_project: "{825B30B4-B40B-422E-9920-23A1B6BDA89C}",
        templates_project_tenant: "{5DFF2A9E-2824-4C17-94ED-02817A99F553}",
        templates_project_tenant_site: "{B0CB1FFC-5293-4583-A7CC-923B1A9009CB}"
    };

    var ids = [
        items["content"],
        items["content_tenant"], 
        items["content_site"], 
        items["content_site_home"],

        items["content"],
        items["content_tenant"],
        items["content_site"],
        items["content_site_data"],

        items["content"],  
        items["content_tenant"], 
        items["content_site"], 
        items["content_site_presentation"],  
        items["content_site_presentation_renderingVariants"], 

        items["layout"], 
        items["renderings"], 
        items["feature"], 
        items["renderings_tenant"], 
        items["renderings_tenant_components"], 

        items["media"], 
        items["media_project"], 
        items["media_project_tenant"], 
        items["media_project_tenant_site"], 

        items["templates"], 
        items["templates_project"], 
        items["templates_project_tenant"], 
        items["templates_project_tenant_site"]

    ].reverse();

    var start = new Promise(function (resolve, reject) {
        log('Click Start');

        var id = "StartButton";
        var interval1 = setInterval(function () {
            if (findElement(window, id) != null) {

                var start = findElement(window, id);
                start.click();

                clearInterval(interval1);
                resolve();
            }
        }, 300);
    });

    var loadContentEditor = function (val) {
        return new Promise(function (resolve, reject) {
            log('loadContentEditor');

            var css = "scStartMenuLeftOption";
            var interval2 = setInterval(function () {
                if (findElement(window, css, true)) {
                    var ce = findElement(window, css, true);
                    ce.click();
                    clearInterval(interval2);

                    log('loadContentEditor resolved');
                    resolve();
                }
            }, 100);
        });
    }

    var getContentEditor = function (val) {

        return new Promise(function (resolve, reject) {
            log('getContentEditor');
            var cssA = "scActiveApplication";
            var cssI = "scInactiveApplication";

            var initialCount = getCountOfClass(cssA) + getCountOfClass(cssI);

            var interval = setInterval(function () {

                if (initialCount !== getCountOfClass(cssA) + getCountOfClass(cssI)) {

                    var found = getLastByClass(cssA);
                    //ce.click();
                    clearInterval(interval);

                    log('getContentEditor resolved: ' + found.id);
                    resolve({ iframeWindow: getIframeWindow(found), id: null });

                    //resolve(getIframeWindow(found));
                }
            }, 100);
        });
    }

    // receives optional iframe window parameter
    var clickId = function (args) {

        var id = "Tree_Glyph_" + processGuid(ids.pop());
        log('clickId: ' + id);

        return new Promise(function (resolve, reject) {
            var checkExist = setInterval(function () {

                var wnd = args && args.iframeWindow ? args.iframeWindow : window;

                if (findElement(wnd, id) != null) {

                    var element = findElement(wnd, id);
                    element.click();
                    clearInterval(checkExist);

                    log('clickId resolved');
                    resolve({ iframeWindow: wnd, id: id });
                }
            }, 100);
        });
    }

    // receives optional iframe window parameter
    var selectItem = function (args) {

        log('selectItem - args.iframeWindow: ' + args.iframeWindow);
        args.id = args.id.replace(new RegExp('Glyph', 'g'), 'Node');
        log('selectItem - args.id: ' + args.id);

        return new Promise(function (resolve, reject) {

            if (findElement(args.iframeWindow, args.id) != null) {

                var element = findElement(args.iframeWindow, args.id);
                element.click();

                var checkSelected = setInterval(function () {

                    if (element.classList.contains('scContentTreeNodeActive')) {
                        clearInterval(checkSelected);

                        log('selectItem resolved');
                        resolve();
                    }
                }, 100);

            }
        });
    }

    var selectTab = function (val) {
        //log('received from the first promisse: ' + val)
        return new Promise(function (resolve, reject) {
            log('selectTab');

            //var interval2 = setInterval(function () {

            setTimeout(function () {
                var tab = findElement(window, 'scInactiveApplication', true);

                if (tab) {
                    //tab.childNodes[0].click();

                    log('selectTab resolved');
                    resolve();
                }
            }, 1500);
            //}, 100);
        });
    }

    var wait = function (val) {

        return new Promise(function (resolve, reject) {
            log('wait');
            setTimeout(function () {
                log('wait resolved');
                resolve();
            }, 500);
        });
    }

    var startPromise = function (val) {
        log('startPromise');
        return new Promise(function (resolve, reject) {
            var id = "StartButton";
            var interval1 = setInterval(function () {
                if (findElement(window, id) != null) {

                    var start = findElement(window, id);
                    start.click();

                    clearInterval(interval1);

                    log('startPromise resolved');
                    resolve();
                }
            }, 300);
        });
    }

    start
        .then(loadContentEditor)
        .then(getContentEditor)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(selectItem)

        .then(startPromise)
        .then(loadContentEditor)
        .then(getContentEditor)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(selectItem)

        .then(startPromise)
        .then(loadContentEditor)
        .then(getContentEditor)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(selectItem)

        .then(startPromise)
        .then(loadContentEditor)
        .then(getContentEditor)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(selectItem)

        .then(startPromise)
        .then(loadContentEditor)
        .then(getContentEditor)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(selectItem)

        .then(startPromise)
        .then(loadContentEditor)
        .then(getContentEditor)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(clickId)
        .then(selectItem)

    function getIframeWindow(td) {
        var frameName = td.id.replace("startbar_application_", "");
        return document.getElementById(frameName).contentWindow;
    }

    function processGuid(guid) {
        return guid
            .replace("{", "")
            .replace("}", "")
            .replace(new RegExp('-', 'g'), '');
    } 

    function getCountOfClass(className) {
        var elements = document.getElementsByClassName(className);
        return elements.length;
    }

    function getFirstByClass(className) {
        var elements = document.getElementsByClassName(className);
        if (elements.length > 0) {
            return elements[0];
        }

        return null;
    }

    function getLastByClass(className) {
        var elements = document.getElementsByClassName(className);
        if (elements.length > 0) {
            return elements[elements.length - 1];
        }

        return null;
    }

    function findElement(wdw, id, searchByClass) {

        var found = [];

        var el;
        if (searchByClass) {
            el = getFirstByClass(id);
        } else {
            el = wdw.document.getElementById(id);
        }

        if (el) { found.push(el); }

        for (var i = wdw.frames.length - 1; i >= 0; i--) {
            var elementFromIframe = findElement(wdw.frames[i].window, id, searchByClass);
            if (elementFromIframe) { found.push(elementFromIframe); }
        }

        return found.length > 0 ? found.pop() : null;
    }

    function log(val) {

        if (settings.enableLogging) {
            console.log(val);
        }
    }
})();