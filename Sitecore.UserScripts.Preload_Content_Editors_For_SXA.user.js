// ==UserScript==
// @name         Temporal opens
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
    // Settings and definitions
    //
    //////////////////////////////////////
    const settings = { enableLogging: false, interval: 50 };
    const items = {

        rules: "/sitecore/system/Settings/Rules",

        content: "{0DE95AE4-41AB-4D01-9EB0-67441B7C2450}",
        content_tenant: "{CA11AB1E-0000-0000-0000-447881795777}",
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

    //////////////////////////////////////
    //
    // Scenario to be run
    //
    //////////////////////////////////////
    async function execute() {
        var args;

        await clickStart();
        await loadContentEditor();
        args = await getContentEditor();
        searchValue(args, items.rules);
        args = await expand(args, "{1057C235-C5C0-4EB7-8F77-EA51EB9E20EE}");

        await clickStart();
        await loadContentEditor();
        args = await getContentEditor();
        args = await expand(args, items.content);
        args = await expand(args, items.content_tenant);
        args = await expand(args, items.content_site);
        args = await expand(args, items.content_site_home);
        args = await selectItem(args, items.content_site_home);

        args = await clickStart(args);
        args = await loadContentEditor(args);
        args = await getContentEditor(args);
        args = await expand(args, items.content);
        args = await expand(args, items.content_tenant);
        args = await expand(args, items.content_site);
        args = await expand(args, items.content_site_data);
        args = await selectItem(args, items.content_site_data);

        args = await clickStart(args);
        args = await loadContentEditor(args);
        args = await getContentEditor(args);
        args = await expand(args, items.content);
        args = await expand(args, items.content_tenant);
        args = await expand(args, items.content_site);
        args = await expand(args, items.content_site_presentation);
        args = await expand(args, items.content_site_presentation_renderingVariants);
        args = await selectItem(args, items.content_site_presentation_renderingVariants);

        args = await clickStart(args);
        args = await loadContentEditor(args);
        args = await getContentEditor(args);
        args = await expand(args, items.layout);
        args = await expand(args, items.renderings);
        args = await expand(args, items.feature);
        args = await expand(args, items.renderings_tenant);
        args = await expand(args, items.renderings_tenant_components);
        args = await selectItem(args, items.renderings_tenant_components);

        args = await clickStart(args);
        args = await loadContentEditor(args);
        args = await getContentEditor(args);
        args = await expand(args, items.media);
        args = await expand(args, items.media_project);
        args = await expand(args, items.media_project_tenant);
        args = await expand(args, items.media_project_tenant_site);
        args = await selectItem(args, items.media_project_tenant_site);

        args = await clickStart(args);
        args = await loadContentEditor(args);
        args = await getContentEditor(args);
        args = await expand(args, items.templates);
        args = await expand(args, items.templates_project);
        args = await expand(args, items.templates_project_tenant);
        args = await expand(args, items.templates_project_tenant_site);
        args = await selectItem(args, items.templates_project_tenant_site);
    }


    //////////////////////////////////////
    //
    // Actual business logic comes below
    //
    //////////////////////////////////////
    var clickStart = function (args) {
        return new Promise(function (resolve, reject) {

            log('start Promise');
            if (args) { log(args); }

            var id = "StartButton";
            var interval1 = setInterval(function () {
                if (findElement(window, id) != null) {

                    var start = findElement(window, id);
                    start.click();

                    clearInterval(interval1);

                    log('clickStart resolved');
                    resolve(args);
                }
            }, settings.interval);
        });
    }

    var loadContentEditor = function (args) {
        return new Promise(function (resolve, reject) {
            log('loadContentEditor');
            if (args) { log(args); }

            var css = "scStartMenuLeftOption";
            var interval = setInterval(function () {
                if (findElement(window, css, true)) {
                    var ce = findElement(window, css, true);
                    ce.click();
                    clearInterval(interval);

                    log('loadContentEditor resolved');
                    resolve(args);
                }
            }, settings.interval);
        });
    }

    var getContentEditor = function (args) {
        return new Promise(function (resolve, reject) {

            log('getContentEditor');
            if (args) { log(args); }

            var cssA = "scActiveApplication";
            var cssI = "scInactiveApplication";

            var initialCount = getCountOfClass(cssA) + getCountOfClass(cssI);

            var interval = setInterval(function () {

                if (initialCount !== getCountOfClass(cssA) + getCountOfClass(cssI)) {

                    let found = getLastByClass(cssA, document);
                    let iframeWindow = getIframeWindow(found);


                    if (iframeWindow.document.readyState == 'complete' && findElement(iframeWindow, 'scFlexColumnContainer', true)) {
                        clearInterval(interval);

                        log('getContentEditor resolved: ' + found.id);
                        resolve({ iframeWindow: iframeWindow, id: null });
                    }
                }
            }, settings.interval);
        });
    }

    var expand = function (args, guid) {

        args.id = "Tree_Glyph_" + processGuid(guid);
        log('expand: ' + args.id);

        return new Promise(function (resolve, reject) {
            var checkExist = setInterval(function () {

                var wnd = args.iframeWindow;

                let element = findElement(wnd, args.id);
                if (element != null) {

                    if (element.src.includes('_collapsed.')) {

                        clearInterval(checkExist);

                        element.click();

                        log('expand resolved.');
                        resolve(args);
                    }
                }
            }, settings.interval);
        });
    }

    var selectItem = function (args, guid) {
        return new Promise(function (resolve, reject) {

            var id = "Tree_Node_" + processGuid(guid);
            log('selectItem: ' + guid);

            if (args && findElement(args.iframeWindow, id) != null) {

                var element = findElement(args.iframeWindow, id);
                element.click();

                var interval = setInterval(function () {

                    if (element.classList.contains('scContentTreeNodeActive')) {
                        clearInterval(interval);

                        log('selectItem resolved');
                        resolve(args);
                    }
                }, settings.interval);
            }
        });
    }

    var searchValue = function (args, term) {
        return new Promise(function (resolve, reject) {
            log('searchValue: ' + term);

            if (args) {
                let wnd = args.iframeWindow;

                var searchbox = findElement(wnd, "TreeSearch");

                if (searchbox) {
                    searchbox.focus();
                    searchbox.value = term;

                    var searchButton = findElement(wnd, 'scSearchButton', true);
                    if (searchButton) {
                        searchButton.click();

                        var checkSelected = setInterval(function () {

                            var result = getByClassAndValue('scSearchCategory', 'Direct Hit', wnd.document);
                            if (result) {
                                clearInterval(checkSelected);

                                result.nextSibling.firstChild.click();

                                let closeButton = wnd.document.querySelector('#SearchHeader a');
                                closeButton.click();

                                log('searchValue resolved');
                                resolve(args);
                            }
                        }, settings.interval);
                    }
                }
            }
        });
    }


    //////////////////////////////////////
    //
    // Some helpind functions
    //
    //////////////////////////////////////
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

    function getFirstByClass(className, _document) {
        var elements = _document.getElementsByClassName(className);
        if (elements.length > 0) {
            return elements[0];
        }
        return null;
    }

    function getByClassAndValue(className, value, _document) {
        var elements = _document.getElementsByClassName(className);
        for (let element of elements) {
            if (element.innerHTML.trim() == value) {
                return element;
            }
        }
        return null;
    }

    function getLastByClass(className, _document) {
        var elements = _document.getElementsByClassName(className);
        if (elements.length > 0) {
            return elements[elements.length - 1];
        }
        return null;
    }

    function findElement(wdw, id, searchByClass) {

        var found = [];

        var el;
        if (searchByClass) {
            el = getFirstByClass(id, wdw.document);
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

    // Runs the scenario
    execute();
})();