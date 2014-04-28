"use strict";
define([], function () {

    var name = "isnumber",
        
        msg = "Value must be a number",
        
        condition = "{0}.$error." + name + " && (!{0}.$pristine || submitted)",
        
        directiveObj = function() {
            return {
                restrict: 'AE',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModelCtrl) {
                    debugger;
                    if (!ngModelCtrl) return;

                    //format to display in view
                    ngModelCtrl.$formatters.push(function(modelValue) {
                        var valid = !isNaN(modelValue);
                        ngModelCtrl.$setValidity(name, valid);
                        return modelValue;
                    });

                    //parse to receive origin model
                    ngModelCtrl.$parsers.push(function (viewValue) {
                        debugger;
                        var valid = !isNaN(viewValue);
                        ngModelCtrl.$setValidity(name, valid);
                        return viewValue;
                    });
                },
            };
        };
    
    return {
        name: name,
        errorMessage: msg,
        errorCondition: condition,
        directiveDefinition: directiveObj
    };
});



