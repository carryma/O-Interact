/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your application specific code will go here
 */
define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource'],
        function (oj, ko) {
            function ControllerViewModel() {
                var self = this;

                // Media queries for repsonsive layouts
                var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
                self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

                // Router setup
                self.router = oj.Router.rootInstance;
                self.router.configure({
                    'navigation': {label: 'Navigation'},
                    'chat': {label: 'Chat'},
                    'customers': {label: 'Customers'},
                    'lottery': {label: 'Lottery'},
                    'vote': {label: 'Vote'},
                    'login': {label: 'Login', isDefault: true},
                    'largeScreen': {label: 'LargeScreen'}
                });
                oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

                // Navigation setup
                var navData = [
                    {name: 'Login', id: 'login',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'},
                    {name: 'Navigation', id: 'navigation',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
                    {name: 'Incidents', id: 'incidents',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
                    {name: 'Customers', id: 'customers',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
                    {name: 'Lottery', id: 'lottery',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'},
                    {name: 'LargeScreen', id: 'largeScreen',
                        iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
                ];
                self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

                // Header
                // Application Name used in Branding Area
                self.appName = ko.observable("Oracle-Interact");
                // User Info used in Global Navigation area
                self.userLogin = ko.observable("john.hancock@oracle.com");

                // Footer
                function footerLink(name, id, linkTarget) {
                    this.name = name;
                    this.linkId = id;
                    this.linkTarget = linkTarget;
                }
                self.footerLinks = ko.observableArray([
                    new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
                    new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
                    new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
                    new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
                    new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')
                ]);
            }

            return new ControllerViewModel();
        }
);
