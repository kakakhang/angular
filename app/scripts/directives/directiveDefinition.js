"use strict";
define(['./directives/common/paging',
        './directives/common/formatModel',
        './directives/common/checkListModel',
        './directives/common/validation/inputValidation',
        './directives/common/validation/isNumber',
        './directives/common/validation/maxValue',
        './directives/common/validation/minValue',
        './directives/common/test',
    ],
function (paging, formatModel, checkListModel, inputValidation, isNumber, maxValue, minValue,test) {
    var common = {};
    
    common.paging = paging;
    common.formatModel = formatModel;
    common.checkListModel = checkListModel;
    common.inputValidation = inputValidation;
    common.isNumber = isNumber;
    common.maxValue = maxValue;
    common.minValue = minValue;
    common.test = test;


    return {
        common: common
};
});
