"use strict";
define(['./directives/common/paging',
        './directives/common/formatModel',
        './directives/common/checkListModel',
        './directives/common/validation/inputValidation',
        './directives/common/validation/isNumber',
        './directives/common/validation/maxValue',
        './directives/common/validation/minValue',
        './directives/common/validation/select2Required',
        'helpers'
    ],
function (paging, formatModel, checkListModel, inputValidation, isNumber, maxValue, minValue,select2Required) {
    var common = {};
    
    common.paging = paging;
    common.formatModel = formatModel;
    common.checkListModel = checkListModel;
    common.inputValidation = inputValidation;
    common.isNumber = isNumber.directiveDefinition;
    common.maxValue = maxValue.directiveDefinition;
    common.minValue = minValue.directiveDefinition;
    common.select2Required = select2Required.directiveDefinition;
    
    //Register custom validation types
    inputValidation().registerValidation(isNumber);
    inputValidation().registerValidation(maxValue);
    inputValidation().registerValidation(minValue);
    inputValidation().registerValidation(select2Required);
    
    return {
        common: common
};
});
