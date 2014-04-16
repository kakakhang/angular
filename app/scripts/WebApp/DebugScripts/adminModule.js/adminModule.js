"use strict";
/*  Set up lazy 
	In traditional way :
				angular.module('app').controller('SomeLazyController', function($scope){
					$scope.key = '...';
				});
	if you were to try to register a new controller with an already bootstrapped --> through exception 
	No need to load controller and service before define 
*/
define(['./modules/states/adminModuleStates',
        './services/dependencyResolver',
        'interceptors',
        'uiRouter',
        'commonModule'],
    function (adminModuleStates, dependencyResolver, interceptors) {

		// Define module angular 
        var adminModule = angular.module('adminModule', ['ui.router', 'commonModule']);

		// Set up configuration for module
		adminModule.config( function(  $stateProvider, $controllerProvider, $compileProvider,
									$filterProvider, $provide,$httpProvider) {

			//lazy load controller & service & directive..
			adminModule.lazy = {
				controller: $controllerProvider.register,
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				factory: $provide.factory,
				service: $provide.service
			};

			// Config state for angular module
			if ( eshopApp.helpers.isNotUndefined( adminModuleStates.states ) ) {
				angular.forEach( adminModuleStates.states, function( state, stateName ) {

					var stateConfig = {	url : state.path,
										templateUrl: state.templateUrl,
										resolve: dependencyResolver(state.dependencies)
									  };

					//set parent state
					if( eshopApp.helpers.isNotUndefined( state.parent ) ) {
					    stateConfig.parent = state.parent;
					}

					$stateProvider.state( stateName,stateConfig );
				});
			}

			// Other path not in rule will show default page
			$stateProvider.state( "otherwise", {
				url: "*path",
				templateUrl: "views/error.html"
			});
		    
            //Register interceptors
			$httpProvider.interceptors.push(interceptors.loadingOverlay);
		});	


		// Build nav title base on config ex: Product > Search 
		var buildNavTitle = function (scope, location, navTitle) {
            eshopApp.helpers.buildNavTitleArray(eshopApp.config.navigationBarInfo, null, navTitle);
            scope.navTitle = navTitle["#" + location.path()];
        };
        
        //Build Navigation bar in admin site
        var buildNavBar = function(scope, sceService) {
            var adminNavBarHtml = eshopApp.helpers.renderConfigurationToNavBar(eshopApp.config.navigationBarInfo);
            scope.adminNavBar = sceService.trustAsHtml(adminNavBarHtml);
        };

        //Get display navigation tile on change state (url|route)
        var getNavTitle = function (location, navTitle) {
            var path = "#" + location.path();
            var patt1 = new RegExp("\/\\d+$", "g");
            var result = path.match(patt1);
            if (result) {
                return navTitle[path.replace(result[0], "")];
            } else {
                return navTitle[path];
            }
        };

        adminModule.run( function( $rootScope, $location, $sce){
            var navTitle = {};
            // Build nav title base on config ex: Product > Search 
            buildNavTitle($rootScope, $location, navTitle);
			
			// Build nav bar 
            buildNavBar($rootScope, $sce);
		
		   /* 
			* Fire event state change to change navigation title
			* find the request  path that exist number of the last . we assumme this is parameter
			* ex: product/edit/3
			*     get navigation title of product/edit
			*     replace  product/edit/3 to product/edit
			*/
			$rootScope.$on('$stateChangeSuccess', function() {
			    $rootScope.navTitle = getNavTitle($location, navTitle);
			});


		});
		
		return adminModule;
	}
	
);
