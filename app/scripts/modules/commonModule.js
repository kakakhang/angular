"use strict";

define( ['config','helpers','jquery','angular'],
    function () {

		// Define module angular 
		var adminModule = angular.module('adminModule', ['ui.router'] );

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


            $httpProvider.interceptors.push(function($q) {
                return {
                    'request': function(config) {
                      //  $('body').append('<div class="overlay"></div>');
                        // do something on success
                        //console.log(config);
                        if(config.headers.LoadOverlay == '1'){
                            $('body').append('<div class="overlay"></div>');
                        }
                        return config || $q.when(config);
                        // same as above
                    },

                    'response': function(response) {
                        // same as above
                        if(response.config.headers.LoadOverlay == '1'){
                            setTimeout(function(){$('.overlay').remove();},10000);
                        }
                        //   $('.overlay').remove();
                       // console.log(response);
                        return response || $q.when(response);
                    }
                };
            });

		});
	
		adminModule.run( function( $rootScope, $location, $sce){

			// Build nav title base on config ex: Product > Search 
			var navTitle = {};
			eshopApp.helpers.buildNavTitleArray(eshopApp.config.navigationBarInfo,null,navTitle);
			$rootScope.navTitle = navTitle["#"+$location.path()];
			
			// Build nav bar 
			var adminNavBarHtml = eshopApp.helpers.renderConfigurationToNavBar(eshopApp.config.navigationBarInfo);
			$rootScope.adminNavBar = $sce.trustAsHtml(adminNavBarHtml);
		
		   /* 
			* Fire event state change to change navigation title
			* find the request  path that exist number of the last . we assumme this is parameter
			* ex: product/edit/3
			*     get navigation title of product/edit
			*     replace  product/edit/3 to product/edit
			*/
			$rootScope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState, formParams){
				var path = "#" + $location.path();
				var patt1 = new RegExp("\/\\d+$","g");
				var result = path.match(patt1);
				if(result){
					$rootScope.navTitle = navTitle[path.replace(result[0],"")];
				}else{
					$rootScope.navTitle = navTitle[path];
				}
			});


		});
		
		return adminModule;
	}
	
);
