"use strict";
(function (parent, $, undefined) {
	var config = parent.config = parent.config || {};
	// Define navigation bar in admin site
	var general = {
        id: "general",
        url: "#/admin/index",
        text: "General Infomation",
        childs: [
            {
                url: "#/admin/general/home",
                text: "Home"
            },
            {
                url: "#/admin/general/basic",
                text: "Basic Information"
            }
        ]
    };
    var product = {
        id: "product",
        url: "#/admin/product",
        text: "Product",
        childs: [
            {
                url: "#/admin/product/search",
                text: "Search Product"
            },
            {
                url: "#/admin/product/edit",
                text: "Edit Product"
            }
        ]
    };
    config.navigationBarInfo = [
        general,
        product
    ];

	//API host
    config.apiEndPoint = 'http://192.168.194.11/angular/api';
	
	//View Directory
    config.viewDir = '/angular/app/views/';
    
	//Controller Directory
    config.controllerDir = '/angular/app/scripts/controllers/';
    
	//Directive Directory
    config.directiveDir = '/angular/app/scripts/directives/';

}(window.eshopApp = window.eshopApp || {}, jQuery));
