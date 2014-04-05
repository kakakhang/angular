"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;
    
    adminModule.lazy.controller('adminProductSearchCtrl', function ($scope, $http, adminProductService) {

		init();
		//btn search click
		$scope.search = function(){
              adminProductService.searchProduct($scope.form).then(
                function(data){
                    $scope.products = data;
              });
		};

		function init(){
		    adminProductService.getCategoryAndStatus()
								.then(function(data) {
									$scope.cats = data.cat;
									$scope.status = data.status;
								});
			$scope.form = {};
            $scope.imagePath = eshopApp.config.imagePath;
			$scope.form.display_mode =1;
			$scope.products = [];
		};
	});
});


