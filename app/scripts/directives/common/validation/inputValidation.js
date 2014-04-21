"use strict";
define([], function () {

    var inputValidation = ['$compile', function ($compile) {

        var isNotEmpty = eshopApp.helpers.isNotEmpty;                       //check if value is not empty

        var isNotUndefined = eshopApp.helpers.isNotUndefined;               //check if object is not undefined

        var errorWrapTpl = '<p ng-show="{0}" class="attention">{1}</p>';    //template for error message

        var errorType = { required: 1, minlength: 2, maxlength: 3, minvalue:4, maxvalue:5 , isnumber:6};        //error type

        var validationType = ["required", "minlength","maxlength", "minvalue", "maxvalue", "isnumber"];         //validation type

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
        var buildErrorMessgeTag = function (options,inputName) {

            var messages = {},
                errorCondition = '',
                resultTag = '';

            //parse error message
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

        //Get default error message text
        var getErrorText = function(type,value) {

            switch (type) {

                case errorType.required:
                    return "This field is required";

                case errorType.minlength:
                    return ("Minimum length is : {0}").format([value]);

                case errorType.maxlength:
                    return ("Maximum length is : {0}").format([value]);

                case errorType.maxvalue:
                    return ("Maximum value is : {0}").format([value]);

                case errorType.minvalue:
                    return ("Minimum value is : {0}").format([value]);

                case errorType.isnumber:
                    return "Value must be a number";

                default :
                    return "";
            }

        };

        //Get error condition related to error type
        var getErrorCondition = function(type,inputName) {
            switch (type) {
                case errorType.required:
                    return ("{0}.$error.required && !{0}.$pristine").format([inputName]);

                case errorType.minlength:
                    return ("{0}.$error.minlength && !{0}.$pristine ").format([inputName]);

                case errorType.maxlength:
                    return ("{0}.$error.maxlength && !{0}.$pristine ").format([inputName]);

                case errorType.minvalue:
                    return ("{0}.$error.minvalue && !{0}.$pristine ").format([inputName]);

                case errorType.maxvalue:
                    return ("{0}.$error.maxvalue && !{0}.$pristine ").format([inputName]);

                case errorType.isnumber:
                    return ("{0}.$error.isnumber && !{0}.$pristine ").format([inputName]);

                default :
                    return ("{0}.$invalid && !{0}.$pristine").format([inputName]);
            }
        };

        var linker = function(scope,elem,attrs){
            debugger;
            //find form name
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

            //watch error condition to notify
           /* var ngModel = options['model'];
            console.log('scope validation');
            console.log(scope);
            scope.$watch(ngModel,  function(current, old) {
                console.log(ngModel);
                debugger;
                console.log('current');
                console.log(current);
                console.log('old');
                console.log(old);
            });*/

            scope.$watch(('{0}.$valid').format([inputName]), function (validity) {

                if (validity)
                    $(input).removeClass('has-error');
                else {
                    $(input).addClass('has-error');
                }
            });

            scope.$watch(('{0}.$pristine').format([inputName]),function(isPristine){
                if (isPristine)
                    $(input).removeClass('has-error');
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
    }];
    return inputValidation;
});





