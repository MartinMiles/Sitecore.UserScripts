// ==UserScript==
// @name         Multilist and Treelist values lookup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  When working with multilist / treelist items in Sitecore, simply hit ENTER on right-hand side selected item in order to preview it in new tab
// @author       Martin Miles
// @match        */sitecore/shell/default.aspx*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const settings = { mutation: { attributes: true, characterData: true, childList: true, subtree: true, attributeOldValue: true, characterDataOldValue: true } };

    var mutationObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {

            if (mutation.type == "attributes" && mutation.target.id.startsWith("startbar_application_") && mutation.target.className == "scActiveApplication") {
                var iframe = getIframeFromActiveTab(mutation.target);
                if (iframe) {
                    internalMutationObserver(iframe);
                }
            }
        });
    });

    mutationObserver.observe(document.documentElement, settings.mutation);

    function internalMutationObserver(iframe) {
        var innerObserver = new MutationObserver(function (innerMutations) {
            innerMutations.forEach(function (m) {

                var _el = m.target;
                if (_el.className == 'scEditorFieldMarkerBarCell') {

                    var labels = _el.parentElement.querySelectorAll('.scContentControlMultilistCaption');
                    labels.forEach(function (label) {
                        if (label.innerHTML == 'Selected') {
                            label.innerHTML = label.innerHTML + ' (hit ENTER on selected item for preview in a new tab)';
                        }
                    });

                    var selects = _el.parentElement.querySelectorAll('select');
                    selects.forEach(function (select) {
                        select.addEventListener("keypress", keyPressed);
                    });
                }
            });
        });

        // wire up internal mutation
        innerObserver.observe(iframe.contentDocument, settings.mutation);
    }

    function getIframeFromActiveTab(element) {
        let frameName = element.id.replace('startbar_application_', '');
        let iframe = document.querySelectorAll('iframe#' + frameName);
        if (iframe.length > 0) {
            return iframe[0];
        }

        return null;
    }

    function keyPressed(e) {
        if (e.keyCode == 13) {

            var selsectedValue = e.target.options[e.target.selectedIndex].value;

            var url = getUrl(selsectedValue);
            if (url) {
                openInNewTab(url);
            }

            return false;
        }
    }

    function getUrl(selsectedValue) {

        let guid;
        var parts = selsectedValue.split("|");
        if (parts.length === 2) {
            guid = parts[1];
        }
        else if (isGuid(selsectedValue)) {
            guid = selsectedValue;
        }

        return !guid ? guid : '/sitecore/shell/Applications/Content Editor?id='
            + guid + '&amp;vs=1&amp;la=en&amp;sc_content=master&amp;fo='
            + guid + '&ic=People%2f16x16%2fcubes_blue.png&he=Content+Editor&cl=0';
    }

    function isGuid(stringToTest) {
        if (stringToTest[0] === "{") {
            stringToTest = stringToTest.substring(1, stringToTest.length - 1);
        }
        var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
        return regexGuid.test(stringToTest);
    }

    function openInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
})();