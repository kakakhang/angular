"use strict";
define(['adminModule','jqueryLoadMask'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.directive('inputValidation', function ($compile) {


        var template =
             '  <div>' +
                 '<div ng-transclude></div>'+
                '<span class="attention">thong bao loi</span>'  +
               '</div>';

        return {
            //transclude: true,
            restrict: 'AE',
           // template: template,
            replace: true, // specify that element in view will be replaced by directive template
            link : function(scope,elem,attrs){
               /* var input = $('input',elem);
                var formName            =   $(input).parents().find('form').attr('name'),
                    inputName           =   input.attr('name'),
                    invalidCondition    =   ('{0}.{1}.$invalid').format([formName,inputName]);
                    $('span',elem).attr('ng-show',invalidCondition);
                    input.attr('ng-class',"{ \'has-error\': "+ invalidCondition +" }");
                    $('div',elem).removeAttr('ng-transclude');
                    $compile(elem.contents())(scope);*/
                debugger;
                var input = elem[0];
                var formName               =   $(input).parents().find('form').attr('name');
                 var   inputName           =   input.name;
                 var   invalidCondition    =   ('{0}.{1}.$invalid').format([formName,inputName]);

                var span = $('<span class="attention">dddddddddddd</span>').attr('ng-show',invalidCondition);
                $(input).attr('ng-class',"{ \'has-error\': "+ invalidCondition +" }");
                var wrapDiv = $(elem).wrap( "<div></div>" );
                wrapDiv.append(span);
                $compile($(wrapDiv[0]).html())(scope);

            }
        };
    });
});

