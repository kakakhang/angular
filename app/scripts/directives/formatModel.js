/** auto format display value in model
 * Example:  View value = 1.000.000 VND  , model = 1000000
 * Usage : format-model='filter_type'   ( format-model='number' )
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

                //format to display in view
                ngModelCtrl.$formatters.push(function (modelValue) {
                    return $filter(attrs.formatModel)(modelValue)
                });

                //parse to receive origin model
                ngModelCtrl.$parsers.push(function (viewValue) {
                    //replace - . space to blank
                    var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');

                    elem.val($filter(attrs.formatModel)(plainNumber));

                    return plainNumber;
                });
            }
        };
    }]);
});

