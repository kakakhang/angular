/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 11/30/13
 * Time: 10:30 AM
 * To change this template use File | Settings | File Templates.
 */

eshopApp.controller('AdminMainCtrl', function ($scope,$location,$sce) {
    $scope.nav_title = eshopApp.config.nav_title["#"+$location.path()];
    $scope.admin_nav_bar = $sce.trustAsHtml(eshopApp.config.admin_nav_bar);
    $scope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState, formParams){
        /*
        * find the request  path that exist number of the last . we assumme this is parameter
        * ex: product/edit/3
        *     get navigation title of product/edit
        *     replace  product/edit/3 to product/edit
        * */
        var path = "#" + $location.path();
        var patt1 = new RegExp("\/\\d+$","g");
        var result = path.match(patt1);
        if(result){
            $scope.nav_title = eshopApp.config.nav_title[path.replace(result[0],"")];
        }else{
            $scope.nav_title = eshopApp.config.nav_title[path];
        }
    });

});
