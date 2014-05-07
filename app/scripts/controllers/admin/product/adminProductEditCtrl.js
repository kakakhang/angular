"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductEditCtrl', function ($timeout, $scope, $stateParams, $location, $http, adminProductService, formState, ADMIN_FORM_STATE,ADMIN_FORM_TYPE) {
        $scope.submitted = false;
        $scope.product = {display_mode:1};
        $scope.cats = [];
        var state = new formState(ADMIN_FORM_TYPE.PRODUCT);
        
        adminProductService.getCategoryAndStatus().then(function (data) {
            $scope.status = data.status;
            eshopApp.helpers.convertSelect2Option($scope.cats,data.cat,'id','text');

        });

        $scope.categoryDataSource = {
            data:  $scope.cats
        };


        if (state.getState() == ADMIN_FORM_STATE.EDIT) {
            $scope.product = state.getValue();
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
                state.setStateValue(ADMIN_FORM_STATE.CONFIRM, $scope.product);
                $location.path('/admin/product/confirm');
            }
            return;
        };

        state.setState(ADMIN_FORM_STATE.NONE);

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


