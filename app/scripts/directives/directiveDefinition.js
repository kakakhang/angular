"use strict";
define(['./directives/common/paging',
        './directives/common/formatModel',
        './directives/common/checkListModel',
        './directives/common/validation/inputValidation',
        './directives/common/validation/isNumber',
        './directives/common/validation/maxValue',
        './directives/common/validation/minValue'
    ],
function (paging, formatModel, checkListModel, inputValidation, isNumber, maxValue, minValue) {
    var common = {};
    
    common.paging = paging;
    common.formatModel = formatModel;
    common.checkListModel = checkListModel;
    common.inputValidation = inputValidation;
    common.isNumber = isNumber;
    common.maxValue = maxValue;
    common.minValue = minValue;


    return {
        common: common
};
});
