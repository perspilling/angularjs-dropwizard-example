/**
 * Author: Per Spilling, per@kodemaker.no
 */
var myApp = angular.module('persons', ['ngResource']);

/**
 * Configure the PersonsResource. The port must be given as a parameter as the ':' is used
 * to name parameters in a $resource. In order to solve the Cross Origin Resource Sharing (CORS)
 * issue I have set up a Jetty proxy servlet to forward requests transparently to the API server.
 * See the web.xml file for details on that.
 */
myApp.factory('PersonsResource', function ($resource) {
    return $resource('http://localhost:port/api/persons', {port: ':8080'}, {});
});

/**
 * A file resource pointing to a file on the originating web server.
 */
myApp.factory('PersonsFile', function ($resource) {
    return $resource('data/persons.json', {}, {});
});

function PersonsCtrl($scope, $http, PersonsResource, PersonsFile) {
    $scope.persons = PersonsResource.query();
    $scope.personsFile = PersonsFile.query();
}