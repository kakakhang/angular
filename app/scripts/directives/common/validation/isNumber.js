"use strict";
define([], function () {

    var isNumber = function() {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModelCtrl) {
                console.log('scope is number');
                console.log(scope);
                if (!ngModelCtrl) return;

                //format to display in view
                ngModelCtrl.$formatters.push(function(modelValue) {
                    var valid = !isNaN(modelValue);
                    ngModelCtrl.$setValidity('isnumber', valid);
                    return modelValue;
                });

                //parse to receive origin model
                ngModelCtrl.$parsers.push(function(viewValue) {
                    var valid = !isNaN(viewValue);
                    ngModelCtrl.$setValidity('isnumber', valid);
                    return viewValue;
                });
            }
        };
    };
    return isNumber;
});



