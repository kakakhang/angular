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

        //delete Image
        var deleteImage = function (imageName) {
            var defer = $q.defer();
            $http.delete(eshopApp.config.apiEndPoint + '/productImage/' + imageName)
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        };

        //upload Image
        var imageUpload = function(files){
            var defer = $q.defer();
            var data = new FormData();
            data.append( 'file', files);
            $.ajax({
                url: eshopApp.config.apiEndPoint +'/productImage',
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Don't process the files
                contentType: false, // Set content type to false as jQuery will tell the server its a query string request
                success: function(data, textStatus, jqXHR)
                {
                    if(typeof data.error === 'undefined')
                    {
                        defer.resolve(data);
                    }
                    else
                    {
                        // Handle errors here
                        defer.reject(data);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    // Handle errors here
                    defer.reject('ERRORS: ' + textStatus);
                }
            });
            return defer.promise;
        }


        return {            
            getCategoryAndStatus: getCategoryAndStatus,
            getProduct: getProduct,
            imageUpload: imageUpload,
            deleteImage: deleteImage
        };

    });
});
