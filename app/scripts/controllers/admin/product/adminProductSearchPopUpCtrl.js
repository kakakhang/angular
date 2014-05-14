"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.controller('adminProductSearchPopUpCtrl', function ($scope, $modalInstance, items,adminProductService) {

        init();
        //btn search click
        $scope.search = function(){
            $scope.form.currentPage = 1;
            adminProductService.searchProduct($scope.form).then(
                function(data){
                    $scope.form.currentPage = 0;
                    $scope.form.total= data.count;
                    $scope.products = data.products;
                });
        };
        $scope.searchPageProducts = function(text, page){
            $scope.form.currentPage = page;
            adminProductService.searchProduct($scope.form).then(
                function(data){
                    $scope.products = data.products;
                });
        };

        function init(){
            adminProductService.getCategoryAndStatus()
                .then(function(data) {
                    $scope.cats = data.cat;
                });
            $scope.form = {};
            $scope.form.total= 0;
            $scope.form.pageSize= $scope.itemsPerPage;
            $scope.products = [];
        };


        $scope.confirm = function (product) {
            debugger;
            $modalInstance.close(product);
        };


    });
});


