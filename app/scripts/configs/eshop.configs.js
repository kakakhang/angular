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
                text: "Search Product",
				childs: [
					{
						url: "#/admin/product/search/conheo",
						text: "Search Con1"
					},
					{
						url: "#/admin/product/edit/conbeo",
						text: "Search Con2"
					}
				]
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
    config.apiEndPoint = 'http://localhost/angular/api';
	
	//View Directory
    config.viewDir = '/angular/app/views/';
    
	//Controller Directory
    config.controllerDir = '/angular/app/scripts/controllers/';
    
	//Directive Directory
    config.directiveDir = '/angular/app/scripts/directives/';

}(window.eshopApp = window.eshopApp || {}, jQuery));
