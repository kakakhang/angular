"use strict";

define(['directiveDefinition','interceptors', 'config', 'helpers', 'jquery' ,'angular','jqueryLoadMask','angularUiDate','angularUiSelect2'],
    function (directiveDefinition) {

		// Define module angular 
        var commonModule = angular.module('commonModule', ['ui.date','ui.select2']);
       
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
        commonModule.directive('isnumber', directiveDefinition.common.isNumber);
        commonModule.directive('maxvalue', directiveDefinition.common.maxValue);
        commonModule.directive('minvalue', directiveDefinition.common.minValue);
		return commonModule;
	}
	
);
