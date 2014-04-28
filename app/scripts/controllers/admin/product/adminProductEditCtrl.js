"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($timeout,$scope, $stateParams, $location,$http,adminProductService) {
        /*-----------------INITIAL----------------------------*/
        $scope.submitted = false;
        $scope.product = {};
        $scope.cats = [];
        //get datasource of category and product status
        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.status = data.status;
            eshopApp.helpers.convertSelect2Option($scope.cats,data.cat,'category_id','category_name');

        });
        //set up select2 options. (multi select directive)
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
                adminProductService.setProductModel(null);
            }
        }

        /*-----------------EVENTS----------------------------*/
        $scope.goToSearchForm = function(){
            $location.path('/admin/product/search');
        };
        /*Submitted = true let intput-validation aware that form has submitted to display error correctly*/
        $scope.changeToConfirmView = function () {
            $scope.submitted = true;               // magic here 
            if ($scope.form1.$valid) {             // form1 is the name attribute of html form  
                adminProductService.setProductModel($scope.product);
                $location.path('/admin/product/confirm');
            }
            return;
        };
    
/*
       

        $scope.dateOptions = {
            changeYear: true,
            changeMonth: true,
            showButtonPanel: true,
            yearRange: '1900:-0'
        };
        $scope.scopeVar = "Base scope value";

        $scope.myDate = "Thursday, 11 October, 2012";
*/







    });
});


