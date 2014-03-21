"use strict";

define(['adminModule', 'config', 'helpers'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.service('adminProductService', function ($http, $q) {
        //get category and status of all product
        var getCategoryAndStatus = function () {
            var defer = $q.defer();
            $http.get(eshopApp.config.apiEndPoint + "/productSearchCondition")
             .success(function (response) {
                 defer.resolve(response);
             })
            .error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        };
        //get product by product id
        var getProduct = function (productId) {
            var defer = $q.defer();
            $http.get(eshopApp.config.apiEndPoint + '/product/' + productId)
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        };

        return {            
            getCategoryAndStatus: getCategoryAndStatus,
            getProduct: getProduct
        };

    });
});
