// ==UserScript==
// @name         Pre-load Sitecore Content Editors with desired items expanded
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This script loads 6 Content Editor windows in Sitecore and preloads each with specified items
// @author       Martin Miles
// @match        */sitecore/shell/default.aspx*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    //////////////////////////////////////
    //
    // Settings and steps definitions
    //
    //////////////////////////////////////

    const settings = { enableLogging: false, interval: 50 };

    const items = {
        content: "{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}",
        content_tenant: "{E7BC1B20-5D55-4200-8716-AB562277CC63}",
        content_site: "{BBFE7416-3F03-48EC-BE66-95C3BC522538}",
        content_site_home: "{FD737D08-1E15-4105-BF20-2EDDCF49C7EC}",
        content_site_data: "{74F2ABD1-C1B1-4DFE-9439-2FFC69B39A07}",
        content_site_presentation: "{BCC0FA8B-DBAC-44B9-9235-379DC5510D88}",
        content_site_presentation_renderingVariants: "{5F846535-3B72-4F10-A0CB-ECA5C9C4A327}",

        layout: "{EB2E4FFD-2761-4653-B052-26A64D385227}",
        renderings: "{32566F0E-7686-45F1-A12F-D7260BD78BC3}",
        feature: "{DA61AD50-8FDB-4252-A68F-B4470B1C9FE8}",
        renderings_tenant: "{E81E8A6A-C1C4-476E-B522-55EB53E2F1C1}",
        renderings_tenant_components: "{DA8FE51C-AD80-4E8A-A258-46F3ED3EA2D9}",

        media: "{3D6658D8-A0BF-4E75-B3E2-D050FABCF4E1}",
        media_project: "{90AE357F-6171-4EA9-808C-5600B678F726}",
        media_project_tenant: "{1E7ACD3F-6ED4-468C-9979-BA590A44AC4C}",
        media_project_tenant_site: "{CB39EE5D-4DA3-4C59-87B5-40A9D71EB928}",

        templates: "{3C1715FE-6A13-4FCF-845F-DE308BA9741D}",
        templates_project: "{825B30B4-B40B-422E-9920-23A1B6BDA89C}",
        templates_project_tenant: "{DEB2E8E9-ABEA-4A9C-9062-B41E2266F95A}",
        templates_project_tenant_site: "{1581DC44-6C91-4C6F-9B47-03A75EE317B8}"
    };

    const steps = [
        items.content,
        items.content_tenant,
        items.content_site,
        items.content_site_home,

        items.content,
        items.content_tenant,
        items.content_site,
        items.content_site_data,

        items.content,
        items.content_tenant,
        items.content_site,
        items.content_site_presentation,
        items.content_site_presentation_renderingVariants,

        items.layout,
        items.renderings,
        items.feature,
        items.renderings_tenant,
        items.renderings_tenant_components,

        items.media,
        items.media_project,
        items.media_project_tenant,
        items.media_project_tenant_site,

        items.templates,
        items.templates_project,
        items.templates_project_tenant,
        items.templates_project_tenant_site

    ].reverse();

    function execute() {

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
    }



    //////////////////////////////////////
    //
    // Actual business logic comes below
    //
    //////////////////////////////////////

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
        }, settings.interval);
    });

    var startPromise = function (val) {
        log('start Promise');
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
            }, settings.interval);
        });
    }

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
            }, settings.interval);
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
            }, settings.interval);
        });
    }

    var clickId = function (args) {

        var id = "Tree_Glyph_" + processGuid(steps.pop());
        log('clickId: ' + id);

        return new Promise(function (resolve, reject) {
            var checkExist = setInterval(function () {

                var wnd = args && args.iframeWindow ? args.iframeWindow : window;

                if (findElement(wnd, id) != null) {

                    var element = findElement(wnd, id);

                    if (element.src.includes('_collapsed.')) {
                        element.click();
                    }

                    clearInterval(checkExist);

                    log('clickId resolved');
                    resolve({ iframeWindow: wnd, id: id });
                }
            }, settings.interval);
        });
    }

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
                }, settings.interval);

            }
        });
    }

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

    execute();
})();