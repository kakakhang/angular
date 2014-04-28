"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductConfirmCtrl', function ($scope, $stateParams, $location, $http, adminProductService, formState, ADMIN_FORM_STATE, ADMIN_FORM_TYPE) {

        var state = new formState(ADMIN_FORM_TYPE.PRODUCT);
        $scope.product = state.getValue();

        //redirect to search page if user access from address bar
        if (state.getState() != ADMIN_FORM_STATE.CONFIRM)
            $location.path('/admin/product/search');

        //back to edit product page
        $scope.editProduct = function(){
            state.setState(ADMIN_FORM_STATE.EDIT);
            $location.path('/admin/product/edit');
        };

        //save
        $scope.saveProduct = function(){

            adminProductService.saveOrUpdateProduct($scope.product).then(function(){
                state.setState(ADMIN_FORM_STATE.COMPLETE);
                $location.path('/admin/product/complete');
            });
        };
        //reset state if user click on hyperlink;
        state.setState(ADMIN_FORM_STATE.NONE);

    });
});


