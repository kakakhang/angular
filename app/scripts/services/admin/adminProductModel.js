"use strict";

define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.value('adminProductModel',
        {
            STATE: {
                COMPLETE: 3,
                CONFIRM: 2,
                EDIT: 1,
                NONE: 0
            },
            init : function(state,value){
                this.state =   state;
                this.value =   value;
            },
/*            get: function(state){
                return this.value
            },
            state: 0,
            value: null*/
        }
    );
});
