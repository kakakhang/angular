"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.directive('minvalue', function () {
        return {
            restrict: 'AE',
            require: 'ngModel',
            link : function(scope,elem,attrs,ngModelCtrl){

                if (!ngModelCtrl) return;

                //format to display in view
                ngModelCtrl.$formatters.push(function (modelValue) {
                    debugger;
                    var valid = parseFloat(modelValue) > parseFloat(attrs.minvalue);
                    ngModelCtrl.$setValidity('minvalue',valid);
                    return modelValue;
                });

                //parse to receive origin model
                ngModelCtrl.$parsers.push(function (viewValue) {
                    debugger;
                    var valid = parseFloat(viewValue) > parseFloat(attrs.minvalue);
                    ngModelCtrl.$setValidity('minvalue',valid);
                    return  viewValue;
                });
            }
        };
    });
});

