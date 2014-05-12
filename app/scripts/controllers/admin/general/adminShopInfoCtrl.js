"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminShopInfoCtrl', function ($scope,adminGeneralService) {
        $scope.shopinfo = {};
        adminGeneralService.getShopInfo().then(function (data) {
            $scope.shopinfo = data;
        });

        $scope.updateShopInfo = function(){
            adminGeneralService.updateShopInfo($scope.shopinfo);
        }
    });
});


