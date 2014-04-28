"use strict";
define([], function () {

    var validationType = ["required", "ngMinlength", "ngMaxlength"],        
        errorCondition = {},            
        errorText = {
            "required": "This field is required",
            "ngMinlength": "Minimum length is : {0}",
            "ngMaxlength": "Maximum length is : {0}",
        };
    $.each(validationType, function (index,type) {
        errorCondition[type] = "{0}.$error." + type + " && (!{0}.$pristine || submitted)";
    });

 
    
    var inputValidation = function ($compile) {

        var isNotEmpty = eshopApp.helpers.isNotEmpty, //check if value is not empty

            isNotUndefined = eshopApp.helpers.isNotUndefined, //check if object is not undefined

            errorWrapTpl = '<p ng-show="{0}" class="attention">{1}</p>', //template for error message

            // Register custom validation type
            registerValidation = function (customType) {
                validationType.push(customType.name);
                errorCondition[customType.name] = customType.errorCondition;
                errorText[customType.name] = customType.errorMessage;
            },
            
            /* Build error message html tag base on User define message, Error type
            *  Options: Attribute of input element include validation type, error message
            *  options  = {
            *       errormessage: ' {"required": "Required field"} ' ,
            *       required: "",
            *       minlength: "3",
            *       maxlenght: "10"
            *  }
            * Result : html tag ex: <p ng-show="formName.inputName.$error.ERROR_TYPE" class="attention"> Error message is displayed</p>
            * */
            buildErrorMessgeTag = function(attrs, inputName) {

                var messages = {},
                    condition = '',
                    resultTag = '';

                //parse error message
                if (isNotUndefined(attrs.errorMessage))
                    messages = JSON.parse(attrs.errorMessage);

                angular.forEach(validationType, function(value) {
                    if (isNotUndefined(attrs[value])) {

                        condition = getErrorCondition(value, inputName);

                        if (isNotEmpty(messages[value]))
                            resultTag += errorWrapTpl.format([condition, messages[value]]);
                        else
                            resultTag += errorWrapTpl.format([condition, getErrorText(value, attrs[value])]);
                    }
                });
                return resultTag;
            },
            
            //Get default error message text
            getErrorText = function(type, value) {
                return errorText[type].format([value]);
            },
            
            //Get error condition related to error type
            getErrorCondition = function(type, inputName) {
                return errorCondition[type].format([inputName]);
            },
            
            linker = function (scope, elem, attrs, ctrl, transcludeFn) {
        
                //find form name
                var formName = $(elem).parents().find('form').attr('name'),
                    inputName = '',
                    input = null;

                transcludeFn(scope, function(clone) {
                    input = clone;
                    input.removeAttr('input-validation');
                    inputName = formName + '.' + clone.attr('name');
                    elem.before(input);
                });

                //buil error tag
                var errorTag = buildErrorMessgeTag(attrs, inputName);


                scope.$watch(('{0}.$valid').format([inputName]), function(validity) {
       
                    if (validity)
                        $(input).removeClass('has-error');
                    else {
                        $(input).addClass('has-error');
                    }
                });

                
                scope.$watch(('{0}.$pristine').format([inputName]), function (isPristine) {
                    if (isPristine)
                        $(input).removeClass('has-error');
                    else {
                        var arrFormName = inputName.split("."),
                            formElement = scope[arrFormName[0]][arrFormName[1]];
                        if (!formElement.$valid) {
                            $(input).addClass('has-error');
                        }
                    }
                });

                scope.$watch('submitted', function (value) {
                    
                    if (value) {

                        var properties = $(input).attr("class");

                        if (properties.indexOf('ng-invalid') > 0) {
                            $(input).addClass('has-error');
                        } else {
                            $(input).removeClass('has-error');
                        }

                    }
                });

                //recompile template
                var templateCompiled = angular.element($compile(errorTag)(scope));

                elem.before(templateCompiled);
            };
        
        return {
            transclude: 'element',
            priority: 20,
            restrict: 'AE',
            replace: true,
            link: linker,
            registerValidation: registerValidation
        };
    };
    return inputValidation;
});





