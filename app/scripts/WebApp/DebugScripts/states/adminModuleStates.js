/**
 * Define state for angular application module angular ui router
 */
"use strict";
define(['config'], function () {
    return {
        states: {
			'admin': {
				path : '/admin',
                templateUrl: eshopApp.config.viewDir + 'admin/main_frame.html',				
                dependencies: [
                    'services/admin/adminProductService'
                ]
            },
			'adminLogin': {
				path : '/admin/login',
                templateUrl: eshopApp.config.viewDir + 'admin/login.html',				
                dependencies: [
					'controllers/admin/adminLoginCtrl'
                ]
            },			
			'adminBasic': {
				parent: 'admin',
				path: '/index',
                templateUrl: eshopApp.config.viewDir + 'admin/basic/index.html',
                dependencies: [
                    'controllers/admin/mainCtrl'
                ]
            },
			'adminProduct': {
				parent: 'admin',
				path: '/product',
                templateUrl: eshopApp.config.viewDir + 'admin/product/index.html',
                dependencies: [
                    'controllers/admin/product/adminProductSearchCtrl',
                    'directives/checklistModel'
                ]
            },
			'adminProductSearch': {
				parent: 'admin',
				path: '/product/search',
                templateUrl: eshopApp.config.viewDir + 'admin/product/index.html',
                dependencies: [
                    'controllers/admin/product/adminProductSearchCtrl',
                     'directives/checklistModel'
                ]
            },
			'adminProductAdd': {
				parent: 'admin',
				path: '/product/edit',
                templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
                dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
                     'directives/checklistModel'
                ]
            },
			'adminProductEdit': {
				parent: 'admin',
				path: '/product/edit/{productId}',
                templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
                dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
                     'directives/checklistModel'
                ]
            }          
        }
    };
});
