"use strict" ;

require.config({	
	
    baseUrl: 'scripts', // the root path to use for all module lookups
    waitSeconds: 10,
	// Paths config is relative to the baseUrl
    // Never includes a ".js" extension since
    // Paths config could be for a directory
    paths: {
        jquery: ['http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min','../bower_components/jquery/jquery.min'],
        angular: ['http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min','../bower_components/angular/angular'],
		uiRouter: ['../bower_components/angular-ui-router/release/angular-ui-router.min'],		
		jqueryLoadMask : ['../bower_components/jquery-loadmask/jquery.loadmask.min'],
        config: ['./configs/eshop.configs'],
        helpers: ['./helpers/eshop.helpers'],
    },
    shim: {
		"uiRouter":{
			deps : ['angular']
		},        
        'config': {
            deps: ['jquery']
        },
        'helpers': {
            deps: ['jquery']
        },
    }
});

require(['appModule'], function() {
	// Manual boostrapp application 
    angular.bootstrap(document, ['eshopApp']);  
});
