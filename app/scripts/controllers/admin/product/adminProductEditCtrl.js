"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($timeout,$scope, $stateParams, $location,$http,adminProductService) {
        $scope.submitted = false;
        $scope.product = {};
        $scope.cats = [];
        var STATE = adminProductModel.STATE;

        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.status = data.status;
            eshopApp.helpers.convertSelect2Option($scope.cats,data.cat,'category_id','category_name');

        });

        $scope.categoryDataSource = {
            data:  $scope.cats
        };


        if(adminProductModel.state == STATE.EDIT){
            $scope.product = adminProductModel.value;
        }
        else{
            if ($stateParams.productId) {        //if exist product id
                adminProductService.getProduct($stateParams.productId)
                    .then(function (data) {
                        $scope.product = data;
                    });
            }
        }


        $scope.goToSearchForm = function(){
            $location.path('/admin/product/search');
        };
        
        $scope.changeToConfirmView = function () {
            $scope.submitted = true;        // magic 
            if ($scope.form1.$valid) {
                debugger;
                adminProductModel.init(STATE.CONFIRM,$scope.product);
/*                adminProductModel.state = STATE.CONFIRM;
                adminProductModel.value = $scope.product;*/
                $location.path('/admin/product/confirm');
            }
            return;
        };

        adminProductModel.state = STATE.NONE;

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


