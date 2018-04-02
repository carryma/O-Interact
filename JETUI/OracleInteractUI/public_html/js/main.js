/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

function getPaths() {
    var npm = '../node_modules';
    var paths = {
        jquery: npm + '/jquery/dist/jquery.min',
        'jqueryui-amd': npm + '/jquery-ui/ui',
        promise: npm + '/es6-promise/dist/es6-promise',
        hammerjs: npm + '/hammerjs/hammer',
        css: npm + '/require-css/css',
        ojdnd: npm + '/@oracle/oraclejet/dist/js/libs/dnd-polyfill/dnd-polyfill-1.0.0',
        ojs: npm + '/@oracle/oraclejet/dist/js/libs/oj/debug',
        ojL10n: npm + '/@oracle/oraclejet/dist/js/libs/oj/ojL10n',
        ojtranslations: npm + '/@oracle/oraclejet/dist/js/libs/oj/resources',
        customElements: npm + '/@webcomponents/custom-elements/custom-elements.min',
        signals: npm + '/signals/dist/signals.min',
        knockout: npm + '/knockout/build/output/knockout-latest',
        text: npm + '/requirejs-text/text'
    };
    return paths;
}
requirejs.config(
        {
            baseUrl: 'js',

            // Path mappings for the logical module names
            // Update the main-release-paths.json for release mode when updating the mappings
            paths: getPaths(),
            // Shim configurations for modules that do not expose AMD
            shim:
                    {
                        'jquery':
                                {
                                    exports: ['jQuery', '$']
                                }
                    }
        }
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
    'ojs/ojmodule', 'ojs/ojrouter', 'ojs/ojnavigationlist', 'ojs/ojbutton', 'ojs/ojtoolbar'],
        function (oj, ko, app) { // this callback gets executed when all required modules are loaded

            $(function () {

                function init() {
                    oj.Router.sync().then(
                            function () {
                                // Bind your ViewModel for the content of the whole page body.
                                ko.applyBindings(app, document.getElementById('globalBody'));
                            },
                            function (error) {
                                oj.Logger.error('Error in root start: ' + error.message);
                            }
                    );
                }

                // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
                // event before executing any code that might interact with Cordova APIs or plugins.
                if ($(document.body).hasClass('oj-hybrid')) {
                    document.addEventListener("deviceready", init);
                } else {
                    init();
                }

            });

        }
);
