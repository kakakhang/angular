"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;
    
    adminModule.lazy.controller('adminProductSearchCtrl', function ($scope, $http, adminProductService) {

		init();
		//btn search click
		$scope.search = function(){
              $scope.form.currentPage = 1;
              adminProductService.searchProduct($scope.form).then(
                function(data){
                    $scope.form.currentPage = 0;
                    $scope.form.total= data.count;
                    $scope.products = data.products;
              });
		};
        $scope.searchPageProducts = function(text, page){
            $scope.form.currentPage = page;
            adminProductService.searchProduct($scope.form).then(
                function(data){
                    $scope.products = data.products;
                });
        };

		function init(){
		    adminProductService.getCategoryAndStatus()
								.then(function(data) {
									$scope.cats = data.cat;
									$scope.status = data.status;
								});
			$scope.form = {};

            //$scope.imagePath = eshopApp.config.imagePath;
			$scope.form.display_mode =1;
			$scope.products = [];

            $scope.form.total= 0;
            $scope.form.pageSize=3;

            $scope.pageSizes = [
                {value:1, text:'1'},
                {value:2, text:'2'},
                {value:3, text:'3'},
                {value:4, text:'4'},
            ];
		};
	});
});


