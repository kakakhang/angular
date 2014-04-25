"use strict";

define(['directiveDefinition', 'interceptors', 'config', 'helpers', 'jquery', 'angular', 'jqueryLoadMask'],
    function (directiveDefinition) {

		// Define module angular 
        var commonModule = angular.module('commonModule', ['ng']);
       
 /*       var FAA = function (a,b) {
            console.log(a);
            console.log(b);
        };
        FAA.$inject = ["$provide","$controllerProvider"];
        
        // Set up configuration for module
        commonModule.config(FAA);*/
       
        commonModule.directive('formatModel', directiveDefinition.common.formatModel);
        commonModule.directive('paging', directiveDefinition.common.paging);
        commonModule.directive('checklistModel', directiveDefinition.common.checkListModel);
        commonModule.directive('inputValidation', directiveDefinition.common.inputValidation);
        commonModule.directive('isNumber', directiveDefinition.common.isNumber);
        commonModule.directive('maxValue', directiveDefinition.common.maxValue);
        commonModule.directive('minValue', directiveDefinition.common.minValue);
		return commonModule;
	}
	
);
