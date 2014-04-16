"use strict" ;
require.config({
    baseUrl: 'scripts', // the root path to use for all module lookups
    waitSeconds: 200,
	// Paths config is relative to the baseUrl
    // Never includes a ".js" extension since
    // Paths config could be for a directory
    paths: {
        jquery: ['../lib/jquery/jquery.min'],
        angular: ['../lib/angular/angular'],
		uiRouter: ['../lib/angular-ui-router/release/angular-ui-router.min'],
        jqueryLoadMask : ['../lib/jquery-loadmask/jquery.loadmask.min'],
		helpers: ['./helpers/eshop.helpers'],
        config: ['./configs/eshop.configs'],      
        adminModule: ['./modules/adminModule'],
        interceptors: ['./modules/interceptors/interceptors'],
        commonModule: ['./modules/commonModule'],
        directiveDefinition: ['./directives/directiveDefinition'],
    },
    shim: {
		"uiRouter":{
			deps : ['angular']
		},
		"jqueryLoadMask": {
		    deps: ['jquery']
        },
        'config': {
            deps: ['jquery']
        },
        'helpers': {
            deps: ['jquery']
        },
    }
});

require(['adminModule'], function () {
	// Manual boostrapp application 
    angular.bootstrap(document, ['adminModule']);  
});
