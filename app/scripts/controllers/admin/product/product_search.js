/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12/1/13
 * Time: 9:56 PM
 * To change this template use File | Settings | File Templates.
 */
eshopApp.controller('ProductSearchCtrl', function ($scope,$http) {

    init();
    //btn search click
    $scope.search = function(){
        var jsonData = JSON.stringify($scope.form);
        var request = encodeURIComponent(jsonData);
        $http({
            url: eshopApp.config.api_end_point + '/product/search/'+request,
            method: "GET"
        }).success(function (data, status, headers, config) {
                $scope.products = data;
        }).error(function (data, status, headers, config) {
                console.log('data: '+ data + ' status: '+ status);
        });
    };


    function init(){
        //init combo box and check list
        $http({
            url: eshopApp.config.api_end_point + "/productSearchCondition",
            method: "GET"
        }).success(function(data, status, headers, config) {
                $scope.cats = data.cat;
                $scope.status = data.status;
            }).
            error(function(data, status, headers, config) {
                console.log('data: '+ data + ' status: '+ status);
            });
        $scope.form = {};
        $scope.form.display_mode =1;
        $scope.products = [];

    };
});