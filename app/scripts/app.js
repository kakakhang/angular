'use strict';

var eshopApp = angular.module('eshopApp',['ui.router']);

eshopApp.config(function ($stateProvider,$urlRouterProvider,$httpProvider) {
    // For any unmatched url, redirect to index
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/main.html",
            controller: "MainCtrl"
        })
        .state('admin', {
            templateUrl: "views/admin/main_frame.html",
            abstract: true,
            url: '/admin'
        })
        .state('admin.basic', {
            templateUrl: "views/admin/basic/index.html",
            parent: "admin",
            url: '/index'
        })
        .state('admin.product', {
            url: "/product",
            parent: "admin",
            templateUrl: "views/admin/product/index.html"
        })
        .state('admin.product.list', {
            url: "/product/list",
            parent: "admin",
            templateUrl: "views/admin/product/index.html"
        })
        .state('admin_login', {
            url: "/admin/login",
            templateUrl: "views/admin/login.html",
            controller: "AdminLoginCtrl"
        });

    //================================================
    // Add an interceptor for AJAX errors
    //================================================
    $httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          }, 
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              //$location.url('/login');
              console.log('ko dc vao roi');
            return $q.reject(response);
          }
        );
      }
    });
});
