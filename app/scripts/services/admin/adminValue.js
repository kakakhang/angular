"use strict";

define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;
    var stateObj = function() {
        this.state = 0;
        this.value = null;
    };
    adminModule.lazy.value('productState', new stateObj());
    adminModule.lazy.value('customerState', new stateObj());
    adminModule.lazy.value('orderState', new stateObj());
});
