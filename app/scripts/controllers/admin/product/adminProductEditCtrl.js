"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($scope, $stateParams, $location,$http,adminProductService) {

        $scope.product = {};

        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.cats = data.cat;
            $scope.status = data.status;
        });
        //if exist product id
        if ($stateParams.productId) {
            adminProductService.getProduct($stateParams.productId)
                          .then(function (data) {
                              $scope.product = data;
                          });
        }else{
            var productTemp = adminProductService.getProductModel();
            if( productTemp != null ){
                $scope.product = productTemp;
            }
        }

        $scope.goToSearchForm = function(){
            $location.path('/admin/product/search');
        };

        $scope.changeToConfirmView = function(){
            adminProductService.setProductModel($scope.product);
            var confirmUrl = '/admin/product/confirm';
            $location.path(confirmUrl);
        }









    });
});


