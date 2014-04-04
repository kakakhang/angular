"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductCompleteCtrl', function ($scope, $stateParams, $location,$http,adminProductService) {
        //redirect to search page if user access from address bar
        var product = adminProductService.getProductModel();
        if(product == null)
            $location.path('/admin/product/search');
        //release product temp in memory  after update.
        adminProductService.setProductModel(null);


    });
});


