"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($timeout,$scope, $stateParams, $location,$http,adminProductService) {
        $scope.submitted = false;
        $scope.product = {};
        $scope.cats = [];

        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.status = data.status;
            eshopApp.helpers.convertSelect2Option($scope.cats,data.cat,'category_id','category_name');

        });

        $scope.categoryDataSource = {
            data:  $scope.cats
        };
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
        
        $scope.changeToConfirmView = function () {
            $scope.submitted = true;        // magic 
            if ($scope.form1.$valid) {
                adminProductService.setProductModel($scope.product);
                $location.path('/admin/product/confirm');
            }
            return;
        };
    
       

        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            yearRange: '1900:-0'
        };
        $scope.scopeVar = "Base scope value";

        $scope.myDate = "Thursday, 11 October, 2012";







    });
});


