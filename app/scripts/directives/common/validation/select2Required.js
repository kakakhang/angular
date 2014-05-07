"use strict";
define([], function () {

    var name = "select2Required",

        msg = "This field is required",

        condition = "{0}.$error." + name + " && (!{0}.$pristine || submitted)",

        directiveObj = function($timeout) {
            return {
                restrict: 'AE',
                require: 'ngModel',
                link: function (scope, elem, attrs, ngModelCtrl) {

                    if (!ngModelCtrl) return;


                    $timeout(function(){
                        ngModelCtrl.$setPristine();
                        elem.prev().find('.select2-choices').removeClass('has-error');
                    },100);

                    $timeout(function(){
                        var valid = eshopApp.helpers.isNotEmpty(elem.val());
                        ngModelCtrl.$setValidity(name, valid);
                    },500);

                    ngModelCtrl.$parsers.push(function (viewValue) {

                        var input =  $("input[name=" +ngModelCtrl.$name+"]");
                        var ulElement = input.prev().find('.select2-choices');
                        var valid = viewValue.length > 0;
                        console.log(viewValue);
                        if(!valid && (!ngModelCtrl.$pristine)){
                            ulElement.addClass('has-error');
                        }else{
                            ulElement.removeClass('has-error');
                        }
                        ngModelCtrl.$setValidity(name, valid);
                        return viewValue;
                    });
                    scope.$watch('submitted', function (value) {
                        if (value) {
                            var input = $("input[name=" +ngModelCtrl.$name+"]");
                            var ulElement = input.prev().find('.select2-choices');
                            var properties = input.attr("class");
                            if (properties.indexOf('ng-invalid') > 0) {
                                ulElement.addClass('has-error');
                            } else {
                                ulElement.removeClass('has-error');
                            }
                        }
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



