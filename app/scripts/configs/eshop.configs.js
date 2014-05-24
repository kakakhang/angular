"use strict";
(function (parent, $, undefined) {
	var config = parent.config = parent.config || {};
	// Define navigation bar in admin site
	var general = {
        id: "general",
        url: "/admin/index",
        text: "General",
        childs: [
            {
                url: "/admin/index",
                text: "Home"
            },
            {
                url: "/admin/general/shopinfo",
                text: "Shop's Information"
            }
        ]
    };

    var product = {
        id: "product",
        url: "/admin/product",
        text: "Product",
        childs: [
            {
                url: "/admin/product/search",
                text: "Search Product"
            },
            {
                url: "/admin/product/add",
                text: "Add New Product"
            },
            {
                url: "/admin/product/category",
                text: "Category"
            },
            {
                 url: "/admin/product/edit",
                 text: "Update Product",
                 display: "none"
            },
            {
                url: "/admin/product/confirm",
                text: "Preview",
                display: "none"
            },
            {
                url: "/admin/product/complete",
                text: "Complete",
                display: "none"
            }
        ]
    };
    config.navigationBarInfo = [
        general,
        product
    ];

	//API host
    config.apiEndPoint = '/api';

    //Image URI
    config.imagePath = config.apiEndPoint + '/upload/';

	//View Directory
    config.viewDir = '/views/';
    
	//Controller Directory
    config.controllerDir = '/scripts/controllers/';
    
	//Directive Directory
    config.directiveDir = '/scripts/directives/';

}(window.eshopApp = window.eshopApp || {}, jQuery));
