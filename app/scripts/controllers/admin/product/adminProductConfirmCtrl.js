"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductConfirmCtrl', function ($scope, $stateParams, $location,$http,adminProductService) {


        $scope.product = adminProductService.getProductModel();


    });
});


