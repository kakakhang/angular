"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;
    
    adminModule.lazy.controller('adminProductSearchCtrl', function ($scope, $http, adminProductService) {

		init();
		//btn search click
		$scope.search = function(){
			var jsonData = JSON.stringify($scope.form);
			var request = encodeURIComponent(jsonData);
			/*$(document.body).mask("Loading...");*/
			$http({
				url: eshopApp.config.apiEndPoint + '/product/search/'+request,
				method: "GET"
			}).success(function (data, status, headers, config) {
					$scope.products = data;
				/*	$(document.body).unmask();*/
			}).error(function (data, status, headers, config) {
					console.log('data: '+ data + ' status: '+ status);
			});
		};


		function init(){
		    adminProductService.getCategoryAndStatus()
								.then(function(data) {
									$scope.cats = data.cat;
									$scope.status = data.status;
								});
			$scope.form = {};
			$scope.form.display_mode =1;
			$scope.products = [];
		};
	});
});


