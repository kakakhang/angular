"use strict";

define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.service('adminProductService', function ($http, $q) {

        /* Search product by search condition
        *  Params: object
        */
        var searchProduct = function(conditionParams){
            var  jsonData = JSON.stringify(conditionParams),
                 request  = encodeURIComponent(jsonData),
                 defer    = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/product/search/'+request,
                method: "GET",
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        };
        //get category and status of all product
        var getCategoryAndStatus = function () {
            var defer = $q.defer();
            $http.get(eshopApp.config.apiEndPoint + "/categorystatus",{ cache: true})
             .success(function (response) {
                 defer.resolve(response);
             })
            .error(function (data) {
                defer.reject(data);
            });
            return defer.promise;
        };
        var getStatusText = function(status){

        };
        //get product by product id
        var getProduct = function (productId) {
            var defer = $q.defer();
            $http.get(eshopApp.config.apiEndPoint + '/product/' + productId,{headers: {'LoadOverlay': '1'}})
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
        };
/*        //store temporary to pass through controller
        var setProductModel = function(data){
            productModel =  data;
        };
        var getProductModel = function(){
            return productModel;
        };*/


        var saveProduct = function (product, category, status){
            var defer = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/product',
                method: 'POST',
                data: product
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        };

        var updateProduct = function (product, category, status){
            var defer = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/product/'+ product.product_id,
                method: 'PUT',
                data: product
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        };

        var saveOrUpdateProduct = function(product, category, status){
            if(typeof product.product_id !== 'undefined' && product.product_id > 0){
                return updateProduct(product, category, status);
            }
            return saveProduct(product, category, status);
        }

        var getCategories = function(){
            var defer = $q.defer();
            $http.get(eshopApp.config.apiEndPoint + "/category",{headers: {'LoadOverlay': '1','cache':true}})
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (data) {
                    defer.reject(data);
                });
            return defer.promise;
        }
        var insertCategory = function(category){
            var defer = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/category',
                method: 'POST',
                data: category
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        }
        var updateCategory = function(category){
            var defer = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/category',
                method: 'PUT',
                data: {
                    category_id : category.category_id,
                    category_name : category.category_name
                }
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        }
        var deleteCategory = function(category_id){
            var defer = $q.defer();
            $http({
                url: eshopApp.config.apiEndPoint + '/category',
                method: 'DELETE',
                data: {id: category_id.category_id}
            }).success(function (response) {
                    defer.resolve(response);
                }).error(function (data, status, headers, config) {
                    defer.reject('data: '+ data + ' status: '+ status);
                });
            return defer.promise;
        }




        return {
            searchProduct: searchProduct,
            getCategoryAndStatus: getCategoryAndStatus,
            getCategories: getCategories,
            deleteCategory : deleteCategory,
            updateCategory: updateCategory,
            insertCategory: insertCategory,
            getProduct: getProduct,
            imageUpload: imageUpload,
            deleteImage: deleteImage,
            saveOrUpdateProduct: saveOrUpdateProduct
        };

    });
});
