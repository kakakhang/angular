eshopApp.controller('AdminLoginCtrl', function ($scope,$http,$location) {
    $scope.login = function(){

         $scope.error = '';
         $http({
            url: 'http://localhost/angular/api/checkLogin',
            method: "POST",
            data: $scope.user,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function (data, status, headers, config) {
                if(data == 0)
                  $scope.error = 'Email or password wrong';
                else 
                  console.log(data);
          }).error(function (data, status, headers, config) {
                $location.url('/admin/login');
        });

    }
});
