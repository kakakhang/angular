"use strict";

define(['directiveDefinition', 'config', 'helpers', 'jquery', 'angular'],
    function (directiveDefinition) {

		// Define module angular 
        var commonModule = angular.module('commonModule', []);
        debugger;
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
