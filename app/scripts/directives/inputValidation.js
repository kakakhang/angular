"use strict";
define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.directive('inputValidation', function ($compile) {

        var isNotEmpty = eshopApp.helpers.isNotEmpty;

        var isNotUndefined = eshopApp.helpers.isNotUndefined;

        var errorWrapTpl = '<p ng-show="{0}" class="attention">{1}</p>';

        var errorType = { required: 1, minlength: 2, maxlength: 3 };

        var validationType = ["required", "minlength","maxlength"];

        var buildErrorMessgeTag = function (options,inputName) {

            var messages = {},
                errorCondition = '',
                resultTag = '';

            if(isNotEmpty(options.errormessage))
                messages =  JSON.parse(options.errormessage);

            angular.forEach(validationType,function(value){
                if (isNotUndefined(options[value])) {

                    errorCondition = getErrorCondition(errorType[value],inputName);

                    if(isNotEmpty(messages[value]))
                        resultTag += errorWrapTpl.format([errorCondition, messages[value]]);
                    else
                        resultTag += errorWrapTpl.format([errorCondition, getErrorText(errorType[value],options[value])]);
                }
            });
            return resultTag;
        };

        var getErrorText = function(type,value) {

            switch (type) {

                case errorType.required:
                    return "This field is required";

                case errorType.minlength:
                        return ("Minimum length is : {0}").format([value]);

                case errorType.maxlength:
                        return ("Maximum length is : {0}").format([value]);

                default :
                    return "";
            }

        };

        var getErrorCondition = function(type,inputName) {
            switch (type) {
                case errorType.required:
                    return ("{0}.$error.required && !{0}.$pristine").format([inputName]);

                case errorType.minlength:
                    return ("{0}.$error.minlength && !{0}.$pristine ").format([inputName]);

                case errorType.maxlength:
                    return ("{0}.$error.maxlength && !{0}.$pristine ").format([inputName]);

                default :
                    return ("{0}.$invalid && !{0}.$pristine").format([inputName]);
            }
        };

        var linker = function(scope,elem,attrs){

           var  input       =   $('input',elem),
                formName    =   $(input).parents().find('form').attr('name'),
                inputName   =   formName+'.'+input.attr('name'),
                options     =   {};

           //get input validation options
           $(input).each(function() {
                $.each(this.attributes, function() {
                    options[this.name.replace('ng-','')] = this.value;
                });
           });

            //buil error tag
            var errorTag = buildErrorMessgeTag(options, inputName);

            //watch error
            scope.$watch(('{0}.$valid').format([inputName]), function (validity) {
                if (validity)
                    $(input).removeClass('has-error');
                else {
                    $(input).addClass('has-error');
                }
            });

            //recompile template
            var templateCompiled = angular.element($compile(errorTag)(scope));
            elem.append(templateCompiled);
        }

        return {
            transclude: true,
            restrict: 'AE',
            template: '<div ng-transclude></div>',
            replace: true,
            link: linker
        };
    });
});

