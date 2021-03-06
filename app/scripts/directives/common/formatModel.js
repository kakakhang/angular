"use strict";
define([], function () {

    var formatModel = function ($filter) {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link : function(scope,elem,attrs,ngModelCtrl){

               if (!ngModelCtrl) return;

                //format to display in view
                ngModelCtrl.$formatters.push(function (modelValue) {
                    return $filter(attrs.formatModel)(modelValue);
                });

                //parse to receive origin model
                ngModelCtrl.$parsers.push(function (viewValue) {
                    //replace - . space to blank
                    var plainNumber;
                    if (eshopApp.helpers.isNotUndefined(viewValue))
                        plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
                    else {
                        plainNumber = 0;
                    }

                    elem.val($filter(attrs.formatModel)(plainNumber));

                    return plainNumber;
                });
            }
        };
    };
    return formatModel;
});

