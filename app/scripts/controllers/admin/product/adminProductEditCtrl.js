"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($timeout,$scope, $stateParams, $location,$http,adminProductService) {

        $scope.product = {};
        $scope.tags = [];


        adminProductService.getCategoryAndStatus().then(function (data) {

            $scope.cats = data.cat;
            $scope.status = data.status;
            eshopApp.helpers.convertSelect2Option($scope.tags,data.cat,'category_id','category_name');
        });





         $scope.select2Options = {
          data:  $scope.tags
         };



        $scope.list_of_string = [];


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
            console.log( $scope.list_of_string );
            $location.path('/admin/product/search');
        };

        $scope.changeToConfirmView = function(){
            adminProductService.setProductModel($scope.product);
            $location.path('/admin/product/confirm');
        };

        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            yearRange: '1900:-0'
        };
       // $scope.list_of_string =  [{category_id:0,tag:'enhancement'}];
       // var data=[{category_id:0,tag:'enhancement'},{category_id:1,tag:'bug'},{category_id:2,tag:'duplicate'},{category_id:3,tag:'invalid'},{category_id:4,tag:'wontfix'}];
        $scope.scopeVar = "Base scope value";

        $scope.myDate = "Thursday, 11 October, 2012";







    });
});


