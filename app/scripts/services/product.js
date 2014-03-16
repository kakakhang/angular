/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 3/16/14
 * Time: 11:32 PM
 * To change this template use File | Settings | File Templates.
 */
eshopApp.service('ProductService', function ($http,$q) {
    //get category and status of all product
    this.getCategoryAndStatus = function(){
        var defer = $q.defer();
        $http.get(eshopApp.config.api_end_point + "/productSearchCondition")
         .success(function(response){
            defer.resolve(response);
        })
        .error(function(data){
            defer.reject(data);
        });
        return defer.promise;
    };
    //get product by product id
    this.getProduct = function($product_id){
        var defer = $q.defer();
        $http.get(eshopApp.config.api_end_point + '/product/' + $product_id)
            .success(function(response){
                defer.resolve(response);
            })
            .error(function(data){
                defer.reject(data);
            });
        return defer.promise;
    };
});