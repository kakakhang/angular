"use strict";
define([], function () {
    var name = "maxvalue",
        
        msg = "Maximum value is {0}",
        
        condition = "{0}.$error." + name + " && (!{0}.$pristine || submitted)",
        
        minValue = function() {
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
    return {
        name: name,
        errorMessage: msg,
        errorCondition: condition,
        directiveDefinition: minValue
    };
});





