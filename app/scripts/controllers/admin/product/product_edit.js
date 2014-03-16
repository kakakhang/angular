/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 12/1/13
 * Time: 9:56 PM
 * To change this template use File | Settings | File Templates.
 */


eshopApp.controller('ProductEditCtrl', function ($scope,$http,$stateParams,ProductService) {
    //if exist product id
    $scope.product = {};
    if($stateParams.product_id){
        ProductService.getProduct($stateParams.product_id)
                      .then(function(data) {
                            $scope.product = data;
                      });
    }

});