/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 4/10/14
 * Time: 8:08 AM
 * To change this template use File | Settings | File Templates.
 */
"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.directive('formatModel', ['$filter',function ($filter) {

        return {
            restrict: 'AE',
            require: 'ngModel',
            link : function(scope,elem,attrs,ngModelCtrl){
               if (!ngModelCtrl) return;

                ngModelCtrl.$formatters.push(function (modelValue) {
                    return $filter(attrs.formatModel)(modelValue)
                });

                ngModelCtrl.$parsers.push(function (viewValue) {
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    elem.val($filter(attrs.formatModel)(plainNumber));
                    return plainNumber;
                });
            }
        };
    }]);
});

