"use strict";
define([], function () {
    return {
        'request': function (config) {

            if (config.headers.LoadOverlay == '1') {
                $('body').append('<div class="overlay"></div>');
            }
            return config;
        },

        'response': function (response) {

            if (response.config.headers.LoadOverlay == '1') {
                $(".overlay").fadeOut("slow");
            }
            return response;
        }
    };
});

