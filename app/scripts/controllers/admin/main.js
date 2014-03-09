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
        $scope.nav_title = eshopApp.config.nav_title["#"+$location.path()];
    });

});
