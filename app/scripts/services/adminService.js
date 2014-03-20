"use strict";

define(['adminModule','config','helpers'], function(adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.service('adminService', function($http, $settings,$scope) {
		
		this.init = function(){
			// Build nav title base on config ex: Product > Search 
			var navTitle = {};
			eshopApp.helpers.buildNavTitleArray(eshopApp.config.navigationBarInfo,null,navTitle);
			$scope.navTitle = navTitle["#"+$location.path()];
			
			// Build nav bar 
			var adminNavBarHTML = eshopApp.helpers.renderConfigurationToNavBar(eshopApp.config.navigationBarInfo);
			$scope.adminNavBar = $sce.trustAsHtml(adminNavBarHTML);
			
		   /* 
			* Fire event state change to change navigation title
			* find the request  path that exist number of the last . we assumme this is parameter
			* ex: product/edit/3
			*     get navigation title of product/edit
			*     replace  product/edit/3 to product/edit
			*/
			$scope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState, formParams){
				var path = "#" + $location.path();
				var patt1 = new RegExp("\/\\d+$","g");
				var result = path.match(patt1);
				if(result){
					$scope.navTitle = navTitle[path.replace(result[0],"")];
				}else{
					$scope.navTitle = navTitle[path];
				}
			});
		};		
    });
});
