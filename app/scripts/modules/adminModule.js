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
		    debugger;
        var adminModule = angular.module('adminModule', ['ng','ui.router', 'commonModule']);

        /**
         * function to load a given css file
        */
        var moduleConfiguration = function($stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider,$locationProvider) {

            //lazy load controller & service & directive..
            adminModule.lazy = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
                value: $provide.value,
                constant: $provide.constant
            };

            // Config state for angular module
            if (eshopApp.helpers.isNotUndefined(adminModuleStates.states)) {
                angular.forEach(adminModuleStates.states, function(state, stateName) {

                    var stateConfig = {
                        url: state.path,
                        templateUrl: state.templateUrl,
                        resolve: dependencyResolver(state.dependencies)
                    };

                    //set parent state
                    if (eshopApp.helpers.isNotUndefined(state.parent)) {
                        stateConfig.parent = state.parent;
                    }

                    $stateProvider.state(stateName, stateConfig);
                });
            }

            // Other path not in rule will show default page
            $stateProvider.state("otherwise", {
                url: "*path",
                templateUrl: "/views/error.html"
            });
            $locationProvider.html5Mode(true);
            //Register interceptors
            $httpProvider.interceptors.push(interceptors.loadingOverlay);

        };
        moduleConfiguration.$inject = ["$stateProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "$httpProvider","$locationProvider"];

        // Set up configuration for module
        adminModule.config(moduleConfiguration);


		// Build nav title base on config ex: Product > Search 
		var buildNavTitle = function (scope, location, navTitle) {
            eshopApp.helpers.buildNavTitleArray(eshopApp.config.navigationBarInfo, null, navTitle);
            scope.navTitle = navTitle[location.path()];
            debugger;

        };
        
        //Build Navigation bar in admin site
        var buildNavBar = function(scope, sceService) {
            var adminNavBarHtml = eshopApp.helpers.renderConfigurationToNavBar(eshopApp.config.navigationBarInfo);
            scope.adminNavBar = sceService.trustAsHtml(adminNavBarHtml);
        };

        //Get display navigation tile on change state (url|route)
        var getNavTitle = function (location, navTitle) {
            var path =  location.path();
            var patt1 = new RegExp("\/\\d+$", "g");
            var result = path.match(patt1);
            if (result) {
                return navTitle[path.replace(result[0], "")];
            } else {
                return navTitle[path];
            }
        };

        var moduleRunner = function(scope, locationService, sceService) {
            var navTitle = {};
            // Build nav title base on config ex: Product > Search
            buildNavTitle(scope, locationService, navTitle);

            // Build nav bar 
            buildNavBar(scope, sceService);

            /* 
             * Fire event state change to change navigation title
             * find the request  path that exist number of the last . we assumme this is parameter
             * ex: product/edit/3
             *     get navigation title of product/edit
             *     replace  product/edit/3 to product/edit
             */
            scope.$on('$stateChangeSuccess', function () {
                scope.navTitle = getNavTitle(locationService, navTitle);

                if(locationService.path() == '/admin'){
                    locationService.path('/admin/index');
                }
            });

            scope.scrollTop = function(){
                $('body').scrollTop(0);
            };
            scope.imagePath = eshopApp.config.imagePath;
            scope.pageSizes = [
                {value:1, text:'1'},
                {value:2, text:'2'},
                {value:3, text:'3'},
                {value:4, text:'4'},
            ];
            scope.itemsPerPage =3;
        };
        moduleRunner.$inject = ["$rootScope", "$location", "$sce"];

        adminModule.run(moduleRunner);
		
		return adminModule;
	}
	
);
