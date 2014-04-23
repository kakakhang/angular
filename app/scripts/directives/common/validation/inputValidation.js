"use strict";
define([], function () {

    var inputValidation = ['$compile', function ($compile) {

        var isNotEmpty = eshopApp.helpers.isNotEmpty;                       //check if value is not empty

        var isNotUndefined = eshopApp.helpers.isNotUndefined;               //check if object is not undefined

        var errorWrapTpl = '<p ng-show="{0}" class="attention">{1}</p>';    //template for error message

        var errorType = { required: 1, ngMinlength: 2, ngMaxlength: 3, minvalue:4, maxvalue:5 , isnumber:6};        //error type

        var validationType = ["required", "ngMinlength","ngMaxlength", "minvalue", "maxvalue", "isnumber"];         //validation type

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
        var buildErrorMessgeTag = function (attrs,inputName) {

            var messages = {},
                errorCondition = '',
                resultTag = '';

            //parse error message
            if(isNotUndefined(attrs.errorMessage))
                messages =  JSON.parse(attrs.errorMessage);

            angular.forEach(validationType,function(value){
                if (isNotUndefined(attrs[value])) {

                    errorCondition = getErrorCondition(errorType[value],inputName);

                    if(isNotEmpty(messages[value]))
                        resultTag += errorWrapTpl.format([errorCondition, messages[value]]);
                    else
                        resultTag += errorWrapTpl.format([errorCondition, getErrorText(errorType[value],attrs[value])]);
                }
            });
            return resultTag;
        };

        //Get default error message text
        var getErrorText = function(type,value) {

            switch (type) {

                case errorType.required:
                    return "This field is required";

                case errorType.ngMinlength:
                    return ("Minimum length is : {0}").format([value]);

                case errorType.ngMaxlength:
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

                case errorType.ngMinlength:
                    return ("{0}.$error.minlength  && !{0}.$pristine ").format([inputName]);

                case errorType.ngMaxlength:
                    return ("{0}.$error.maxlength  && !{0}.$pristine ").format([inputName]);

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

        var linker = function(scope,elem,attrs,controller, transcludeFn){

            //find form name
            var  formName    =   $(elem).parents().find('form').attr('name'),
                 options     =   attrs.$attr,
                 inputName   =   '',
                 input       =   null;

            //get input validation options
/*            $(input).each(function() {
                $.each(this.attributes, function() {
                    options[this.name.replace('ng-','')] = this.value;
                });
            });*/

            console.log('input validation scope');
            console.log(scope);
            transcludeFn(scope,function(clone){
                input =clone;
                input.removeAttr('input-validation');
                inputName =  formName+'.'+clone.attr('name');
              //  var templateCompiled2 = angular.element($compile(clone)(scope));
                elem.after(input);
            });

            //buil error tag
            var errorTag = buildErrorMessgeTag(attrs, inputName);

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

            elem.after(templateCompiled);
        }

        return {
            transclude: 'element',
            priority: 1000,
            restrict: 'AE',
            replace: true,
            link: linker
        };
    }];
    return inputValidation;
});





