"use strict";
define([], function () {

    var minValue = function() {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModelCtrl) {

                if (!ngModelCtrl) return;

                //format to display in view
                ngModelCtrl.$formatters.push(function(modelValue) {
                    var valid = parseFloat(modelValue) > parseFloat(attrs.minvalue);
                    ngModelCtrl.$setValidity('minvalue', valid);
                    return modelValue;
                });

                //parse to receive origin model
                ngModelCtrl.$parsers.push(function(viewValue) {
                    var valid = parseFloat(viewValue) > parseFloat(attrs.minvalue);
                    ngModelCtrl.$setValidity('minvalue', valid);
                    return viewValue;
                });
            }
        };
    };
    return minValue;
});





