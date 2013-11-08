'use strict';
var eshopApp = angular.module('eshopApp',[]);

eshopApp.config(function ($routeProvider,$httpProvider) {
    $routeProvider
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
      .otherwise({
        redirectTo: '/'
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
