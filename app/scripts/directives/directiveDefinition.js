"use strict";
define(['./directives/common/paging',
        './directives/common/formatModel',
        './directives/common/checkListModel',
        './directives/common/validation/inputValidation',
        './directives/common/validation/isNumber',
        './directives/common/validation/maxValue',
        './directives/common/validation/minValue',
        'helpers'
    ],
function (paging, formatModel, checkListModel, inputValidation, isNumber, maxValue, minValue) {
    var common = {};
    
    common.paging = paging;
    common.formatModel = formatModel;
    common.checkListModel = checkListModel;
    inputValidation().registerValidation(isNumber);
    inputValidation().registerValidation(maxValue);
    inputValidation().registerValidation(minValue);
    common.inputValidation = inputValidation;
    common.isNumber = isNumber.directiveDefinition;
    common.maxValue = maxValue.directiveDefinition;
    common.minValue = minValue.directiveDefinition;

    return {
        common: common
};
});
