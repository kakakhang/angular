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
                    'services/admin/adminProductService',
                    'services/admin/adminProductModel'
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
                    'controllers/admin/product/adminProductSearchCtrl'
                ]
            },
			'adminProductSearch': {
				parent: 'admin',
				path: '/product/search',
                templateUrl: eshopApp.config.viewDir + 'admin/product/index.html',
                dependencies: [
                    'controllers/admin/product/adminProductSearchCtrl'
                ]
            },
			'adminProductAdd': {
				parent: 'admin',
				path: '/product/edit',
                templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
                dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
                    'directives/imageUpload'
                ]
            },
			'adminProductEdit': {
				parent: 'admin',
				path: '/product/edit/{productId}',
                templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
                dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
                    'directives/imageUpload'
                ]
            },
            'adminProductConfirm': {
                parent: 'admin',
                path: '/product/confirm',
                templateUrl: eshopApp.config.viewDir + 'admin/product/confirm.html',
                dependencies: [
                    'controllers/admin/product/adminProductConfirmCtrl'
                ]
            },
            'adminProductComplete': {
                parent: 'admin',
                path: '/product/complete',
                templateUrl: eshopApp.config.viewDir + 'admin/product/complete.html',
                dependencies: [
                    'controllers/admin/product/adminProductCompleteCtrl'
                ]
            }
        }
    };
});
