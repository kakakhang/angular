"use strict";
define(['./modules/interceptors/loadingOverlay'],
function (loadingOverlay) {
    var interceptors = {};
    
    interceptors.loadingOverlay = function() {
        return loadingOverlay;
    };
    
    return interceptors;
});

