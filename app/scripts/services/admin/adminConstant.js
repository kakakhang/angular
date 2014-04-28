"use strict";

define(['adminModule'], function (adminModule) {

    adminModule.lazy = adminModule.lazy || adminModule;

    adminModule.lazy.constant('ADMIN_FORM_STATE',  {
        COMPLETE: 3,
        CONFIRM: 2,
        EDIT: 1,
        NONE: 0
    });
    adminModule.lazy.constant('ADMIN_FORM_TYPE', {
        PRODUCT:1
    });
});
