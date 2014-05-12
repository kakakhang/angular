"use strict";

define(['directiveDefinition','interceptors', 'config', 'helpers', 'jquery' ,'angular','jqueryLoadMask','angularUiDate','angularUiSelect2','angularUiUtils'],
    function (directiveDefinition) {

		// Define module angular 
        var commonModule = angular.module('commonModule', ['ui.date','ui.select2','ui.utils']);
        commonModule.directive('formatModel',['$filter',  directiveDefinition.common.formatModel]);
        commonModule.directive('paging', directiveDefinition.common.paging);
        commonModule.directive('checklistModel', ['$parse', '$compile', directiveDefinition.common.checkListModel]);
        commonModule.directive('isnumber', directiveDefinition.common.isNumber);
        commonModule.directive('maxvalue', directiveDefinition.common.maxValue);
        commonModule.directive('minvalue', directiveDefinition.common.minValue);
        commonModule.directive('select2Required', ["$timeout",directiveDefinition.common.select2Required]);
        commonModule.directive('inputValidation', ["$compile",directiveDefinition.common.inputValidation]);
        commonModule.run(['uiSelect2Config', function(uiSelect2Config) {
            uiSelect2Config.multiple = true;
        }]);
		return commonModule;
	}
	
);
