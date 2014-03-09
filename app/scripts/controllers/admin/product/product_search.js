/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12/1/13
 * Time: 9:56 PM
 * To change this template use File | Settings | File Templates.
 */
eshopApp.controller('ProductSearchCtrl', function ($scope,$http) {
    $http({
        url: eshopApp.config.api_end_point + "/productSearchCondition",
        method: "GET"
    }).success(function(data, status, headers, config) {
            $scope.cats = data.cat;
            $scope.status = data.status;
    }).
    error(function(data, status, headers, config) {
           console.log('Load error!');
    });
});