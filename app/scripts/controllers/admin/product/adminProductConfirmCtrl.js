"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductConfirmCtrl', function ($scope, $stateParams, $location,$http,adminProductService,adminProductModel) {
        debugger;
        var STATE = adminProductModel.STATE;
        $scope.product = adminProductModel.value;

        //redirect to search page if user access from address bar
        if(adminProductModel.state != STATE.CONFIRM)
            $location.path('/admin/product/search');

        //back to edit product page
        $scope.editProduct = function(){
            adminProductModel.state = STATE.EDIT;
            $location.path('/admin/product/edit');
        };

        //save
        $scope.saveProduct = function(){

            adminProductService.saveOrUpdateProduct($scope.product).then(function(){
                adminProductModel.state = STATE.COMPLETE;
                $location.path('/admin/product/complete');
            });
        };
        //reset state if user click on hyperlink;
        adminProductModel.state = STATE.NONE;

    });
});


