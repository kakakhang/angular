'use strict';

var eshopApp = angular.module('eshopApp',['ui.router']);

eshopApp.config(function ($stateProvider,$urlRouterProvider,$httpProvider) {
    /*$routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/admin/login', {
        templateUrl: 'views/admin/login.html',
        controller: 'AdminLoginCtrl'
      })
      .when('/admin/index', {
        templateUrl: 'views/admin/index.html'
      })
      .when('/admin/product/index', {
        templateUrl: 'views/admin/product/index.html'
      })
      .when('/admin/product/edit', {
        templateUrl: 'views/admin/product/edit.html'
      })
      .otherwise({
        redirectTo: '/'
      });*/
    // For any unmatched url, redirect to index
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/main.html",
            controller: "MainCtrl"
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
