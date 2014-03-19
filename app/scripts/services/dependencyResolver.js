"use strict";
define([], function() {
    return function(dependencies) {
        var definition = {
            resolver: ['$q', '$rootScope', function($q, $rootScope) {
                    var deferred = $q.defer();
					// all dependencies have now been loaded by so resolve the promise
                    require(dependencies, function() {
                        $rootScope.$apply(function() {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                }
            ]
        }
        return definition;
    }
});
