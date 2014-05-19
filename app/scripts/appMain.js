"use strict" ;
require.config({
    baseUrl: 'scripts', // the root path to use for all module lookups
    waitSeconds: 200,
	// Paths config is relative to the baseUrl
    // Never includes a ".js" extension since
    // Paths config could be for a directory
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        jqueryUi: '../lib/jquery-ui/ui/jquery-ui',
        angular: '../lib/angular/angular',
        angularUiDate: '../lib/angular-ui-date/src/date',
        angularUiTree: '../lib/angular-ui-tree/dist/angular-ui-tree.min',
        angularUiSortable: '../lib/angular-ui-sortable/sortable.min',
        angularUiSelect2 : '../lib/angular-ui-select2/src/select2',
        angularUiUtils: '../lib/angular-ui-utils/ui-utils.min',
        angularBootstrap: '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
        select2 : '../lib/select2/select2.min',
        uiRouter: '../lib/angular-ui-router/release/angular-ui-router.min',
        jqueryLoadMask : '../lib/jquery-loadmask/jquery.loadmask.min',
        helpers: './helpers/eshop.helpers',
        config: './configs/eshop.configs',
        adminModule: './modules/adminModule',
        interceptors: './modules/interceptors/interceptors',
        commonModule: './modules/commonModule',
        directiveDefinition: './directives/directiveDefinition',
    },
    shim: {
        "angular":{
            deps: ['jquery']
        },
        "select2":{
            deps: ['jquery']
        },
        "uiRouter":{
            deps : ['angular']
        },
        "jqueryUi":{
            deps : ['jquery']
        },
        "angularUiDate":{
            deps : ['jqueryUi','angular']
        },
        "angularUiSortable": {
            deps: ['angular', 'jquery', 'jqueryUi']
        },
        "angularUiTree": {
            deps: ['angular', 'jquery']
        },
        "angularBootstrap": {
            deps : ['angular']
        },
        "angularUiUtils":{
            deps: ['angular']
        },
        "angularUiSelect2":{
            deps: ['jquery', 'select2', 'angular']
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
