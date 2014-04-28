"use strict";

define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.factory('formState', function (productState, ADMIN_FORM_TYPE) {
       
        var formState = function(formType) {

            this.setStateValue = function(state,value) {
                this.refObj.state = state;
                this.refObj.value = value;
            };
            this.setState = function(state) {
                this.refObj.state = state;
            };
            this.setValue = function(vl) {
                this.refObj.value = vl;
            };
            this.getState = function() {
                return this.refObj.state;
            };
            this.getValue = function() {
                return this.refObj.value;
            };
            switch (formType) {
                case ADMIN_FORM_TYPE.PRODUCT:
                    this.refObj = productState;
                default:
                    this.refObj = productState;
            }
        };
        
        return formState;

    });
});
