'use strict';


eshopApp.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.addToDo = function(){
    	$scope.awesomeThings.push($scope.thing);
    	$scope.thing = '';
    }
    $scope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState, formParams){
        console.log('from State: ') ;
        console.log(fromState) ;
        console.log('to State: ') ;
        console.log(toState) ;

    });
  });

 /*
app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
  $scope.user = {};

  // Register the login() function
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
      $rootScope.message = 'Authentication successful!';
      $location.url('/admin');
    })
    .error(function(){
      // Error: authentication failed
      $rootScope.message = 'Authentication failed.';
      $location.url('/login');
    });
  };
});
*/