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
                    'services/admin/adminGeneralService',
                    'services/admin/adminValue',
                    'services/admin/adminConstant',
				    'factories/admin/formState'
                ]
            },
			'adminLogin': {
				path : '/admin/login',
                templateUrl: eshopApp.config.viewDir + 'admin/login.html',				
                dependencies: [
					'controllers/admin/adminLoginCtrl'
                ]
            },			
			'adminHome': {
				parent: 'admin',
				path: '/index',
                templateUrl: eshopApp.config.viewDir + 'admin/general/index.html',
                dependencies: [
                    'controllers/admin/general/adminHomeCtrl'
                ]
            },
            'adminGeneralInfo': {
                parent: 'admin',
                path: '/general/shopinfo',
                templateUrl: eshopApp.config.viewDir + 'admin/general/shop_info.html',
                dependencies: [
                    'controllers/admin/general/adminShopInfoCtrl'
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
			'adminCategory': {
			    parent: 'admin',
			    path: '/product/category',
			    templateUrl: eshopApp.config.viewDir + 'admin/product/category.html',
			    dependencies: [
                    'controllers/admin/product/adminProductCategoryCtrl'
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
				path: '/product/add',
                templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
                dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
                    'controllers/admin/product/adminProductSearchPopUpCtrl',
                    'directives/imageUpload'
                ]
            },
			'adminProductEdit': {
				parent: 'admin',
				path: '/product/edit/{productId}',
                templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
                dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
                    'controllers/admin/product/adminProductSearchPopUpCtrl',
                    'directives/imageUpload'
                ]
			},
			'adminProductEditOnMemory': {
			    parent: 'admin',
			    path: '/product/edit',
			    templateUrl: eshopApp.config.viewDir + 'admin/product/edit.html',
			    dependencies: [
                    'controllers/admin/product/adminProductEditCtrl',
			        'controllers/admin/product/adminProductSearchPopUpCtrl',
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
