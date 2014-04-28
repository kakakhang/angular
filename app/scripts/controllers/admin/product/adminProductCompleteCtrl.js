"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductCompleteCtrl', function ($scope, $stateParams, $location, $http, formState, ADMIN_FORM_STATE, ADMIN_FORM_TYPE) {
        var state = new formState(ADMIN_FORM_TYPE.PRODUCT);
        //redirect to search page if user access from address bar
       // var product = adminProductService.getProductModel();
        if (state.getState() != ADMIN_FORM_STATE.COMPLETE)
            $location.path('/admin/product/search');
        //release product temp in memory  after update.
        state.setValue(null);
    });
});


