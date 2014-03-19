"use strict";
/*  Set up lazy 
	In traditional way :
				angular.module('app').controller('SomeLazyController', function($scope){
					$scope.key = '...';
				});
	if you were to try to register a new controller with an already bootstrapped --> through exception 
	No need to load controller and service before define 
*/
define( ['appStates', 'services/dependencyResolver', 'angular','uiRouter'],
    function( appStates, dependencyResolver ) {
		// Define module angular 
		var eshopApp = angular.module( 'eshopApp', ['ui.router'] );
		// Set up configuration for module
		eshopApp.config( function(  $stateProvider, $locationProvider, $controllerProvider, $compileProvider,
									$filterProvider, $provide, $httpProvider,$urlRouterProvider ) {
			//lazy load controller & service & directive..
			eshopApp.lazy = {
				controller: $controllerProvider.register,
				directive: $compileProvider.directive,
				filter: $filterProvider.register,
				factory: $provide.factory,
				service: $provide.service
			};			
			// Config state for angular module
			if ( appStates.states !== undefined ) {
				angular.forEach( appStates.states, function( state, stateName ) {
					var stateConfig = {	url : state.path,
										templateUrl: state.templateUrl,
										resolve: dependencyResolver(state.dependencies)
									};
					//set parent state
					if( state.parent !== undefined ){
						stateConfig.parent = state.parent
					}
					$stateProvider.state( stateName,stateConfig );
				});
			}
			// Other path not in rule will show default page
			$stateProvider.state( "otherwise", {
				url: "*path",
				templateUrl: "views/error.html"
			});
		});
		
		return eshopApp;
	}
);
