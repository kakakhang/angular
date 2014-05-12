"use strict";

define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.service('adminGeneralService', function ($http, $q) {



        //get product by product id
        var getShopInfo = function () {
            var defer = $q.defer();
            $http.get(eshopApp.config.apiEndPoint + '/shopinfo')
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        };
        var updateShopInfo = function (shopInfo) {
            var defer = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/shopinfo',
                method: 'POST',
                data: shopInfo
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        };





        return {
            getShopInfo: getShopInfo,
            updateShopInfo: updateShopInfo,
        };

    });
});
