define(['adminModule','config'], function(adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminLoginCtrl', function ($scope,$http,$location) {
		$scope.login = function(){
			 $scope.error = '';
			 $http({
				url: eshopApp.config.apiEndPoint + '/admin/login',
				method: "POST",
				data: $scope.user,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).success(function (data, status, headers, config) {
					var result = parseInt(data);
					if(result == 0){
						$scope.error = 'Email or password wrong';
					}
					else {
						console.log('Log in success!');
						$scope.error ='';
						$location.url('/admin/product/search');
					}
			  }).error(function (data, status, headers, config) {
					$location.url('/admin/login');
			});
		}
	});
});

