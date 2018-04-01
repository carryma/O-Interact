/**
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
requirejs.config({
   // Need to set baseUrl or nested view won't work because module location relative to current url.
   // Change to the correct baseUrl when deployed to site like: http://host/myApp
   baseUrl: window.location.href.split('#')[0].substring(0, window.location.href.split('#')[0].lastIndexOf('/')) + '/js',

   // Path mappings for the logical module names
   paths: 
   //injector:mainReleasePaths
   {
      'knockout': 'libs/knockout/knockout-3.4.0',
      'jquery': 'libs/jquery/jquery-3.1.1',
      'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
      'promise': 'libs/es6-promise/es6-promise',
      'hammerjs': 'libs/hammer/hammer-2.0.8',
      'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0.min',
      'ojs': 'libs/oj/v4.2.0/debug',
      'ojL10n': 'libs/oj/v4.2.0/ojL10n',
      'ojtranslations': 'libs/oj/v4.2.0/resources',
      'signals': 'libs/js-signals/signals',
      'text': 'libs/require/text',
      'customElements': 'libs/webcomponents/custom-elements.min'
   }
   //endinjector
   ,
   // Shim configurations for modules that do not expose AMD
   shim: {
      'jquery': {
         exports: ['jQuery', '$']
      },
      'jqueryui': {
         deps: ['jquery']
      }
   },
   // This section configures the i18n plugin. It is merging the Oracle JET built-in translation
   // resources with a custom translation file.
   // Any resource file added, must be placed under a directory named "nls". You can use a path mapping or you can define
   // a path that is relative to the location of this main.js file.
   config: {
      ojL10n: {
         merge: {
            //'ojtranslations/nls/ojtranslations': 'resources/nls/menu'
         }
      }
   }
});


/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'jquery',
'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojmenu', 'ojs/ojtoolbar', 'ojs/ojnavigationlist',
'ojs/ojoffcanvas', 'ojs/ojarraytabledatasource', 'ojs/ojmodule', 'ojs/ojrouter', 'text', 'ojs/ojcheckboxset', 'ojs/ojswitch'],
	function (oj, ko, $)
	{
		'use strict';
		// Set debug mode and log level
		// oj.Assert.forceDebug();
		// oj.Logger.option('level',  oj.Logger.LEVEL_INFO);

		// Router setup
		oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
		var router = oj.Router.rootInstance;
		router.configure({
			'home': {label: 'Home', 
								isDefault: true, 
								enter: function(){
										console.log('entered Home');
								}},
			'customers': {label: 'Customers',
										exit: function(){
											console.log('exited customers');
										}},
 		  'admin': {label: 'Admin', 
								canEnter: function(){
									return ko.dataFor(document.getElementById('switch')).isAdmin();
								}}	
		});
		 
		function ViewModel()
		{
			var self = this;

			// Media queries for repsonsive layouts
			var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
			self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
			var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
			self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);
			
			self.router = router;
			
			// Navigation setup
			var navData = [
			{name: 'Home', id: 'home',
			 iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
			{name: 'Customers', id: 'customers',
			 iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
			{name: 'Admin', id: 'admin',
			 iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-info-icon-24'}
			];
			self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

			// Drawer
			// Close offcanvas on medium and larger screens
			self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
			self.drawerParams = {
				displayMode: 'push',
				selector: '#navDrawer',
				content: '#pageContent'
			};
			// Called by navigation drawer toggle button and after selection of nav drawer item
			self.toggleDrawer = function() {
				return oj.OffcanvasUtils.toggle(self.drawerParams);
			}
			// Add a close listener so we can move focus back to the toggle button when the drawer closes
			$("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

			// Header
			// Application Name used in Branding Area
			self.appName = ko.observable("Router Demo");
			// User Info used in Global Navigation area
			self.userLogin = ko.observable("john.hancock@oracle.com");								
			
			self.selectHandler = function (event, ui) {
				if ( ('ojBeforeSelect' === event.type ) && event.detail.originalEvent) {
					// router takes care of changing the selection
					event.preventDefault();
					// Invoke go() with the selected item.
					self.router.go(event.detail.key);
				}
			};
			
			self.isAdmin = ko.observable(false);

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
		

		oj.Router.sync().then(
						function ()
						{
								ko.applyBindings(new ViewModel(), document.getElementById('globalBody'));
						},
						function (error)
						{
								oj.Logger.error('Error when starting router: ' + error.message);
						}
		);
	}
);