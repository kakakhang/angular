"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductConfirmCtrl', function ($scope, $stateParams, $location,$http,adminProductService) {

        $scope.product = adminProductService.getProductModel();

        //redirect to search page if user access from address bar
        if($scope.product == null)
            $location.path('/admin/product/search');

        //back to edit product page
        $scope.editProduct = function(){
            $location.path('/admin/product/edit');
        };

        $scope.imagePath = eshopApp.config.imagePath;

        //save
        $scope.saveProduct = function(){
            adminProductService.saveOrUpdateProduct($scope.product).then(function(){
                $location.path('/admin/product/complete');
            });
        };


    });
});


