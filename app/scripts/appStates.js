/**
 * Define state for angular application module angular ui router
 */
"use strict";
define([], function() {
    return {
        defaultRoutePath: '/',
        states: {
            'home': {
				path : '/',
                templateUrl: 'views/main.html',
                dependencies: [
                    'controllers/mainCtrl'
                ]
            },
			'admin': {
				path : '/admin',
                templateUrl: 'views/admin/main_frame.html',				
                dependencies: [
                    'controllers/admin/adminMainCtrl'
                ]
            },
			'adminLogin': {
				path : '/admin/login',
                templateUrl: 'views/admin/login.html',				
                dependencies: [
                    'controllers/admin/adminLoginCtrl'
                ]
            },			
			'adminBasic': {
				parent: 'admin',
				path: '/index',
                templateUrl: 'views/admin/basic/index.html',
                dependencies: [
                    'controllers/admin/MainCtrl'
                ]
            },
			'adminProduct': {
				parent: 'admin',
				path: '/product',
                templateUrl: 'views/admin/product/index.html',
                dependencies: [
                    'controllers/admin/ProductSearchCtrl'
                ]
            },
			'adminProductSearch': {
				parent: 'admin',
				path: '/product/search',
                templateUrl: 'views/admin/product/index.html',
                dependencies: [
                    'controllers/admin/ProductSearchCtrl'
                ]
            },
			'adminProductAdd': {
				parent: 'admin',
				path: '/product/edit',
                templateUrl: 'views/admin/product/edit.html',
                dependencies: [
                    'controllers/admin/ProductEditCtrl'
                ]
            },
			'adminProductEdit': {
				parent: 'admin',
				path: '/product/edit/{product_id}',
                templateUrl: 'views/admin/product/edit.html',
                dependencies: [
                    'controllers/admin/ProductEditCtrl'
                ]
            }          
        }
    };
});
