"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductCompleteCtrl', function ($scope, $stateParams, $location,$http,adminProductModel) {
        var STATE = adminProductModel.STATE;
        //redirect to search page if user access from address bar
       // var product = adminProductService.getProductModel();
        if(adminProductModel.state != STATE.COMPLETE)
            $location.path('/admin/product/search');
        //release product temp in memory  after update.
        adminProductModel = null;
    });
});


