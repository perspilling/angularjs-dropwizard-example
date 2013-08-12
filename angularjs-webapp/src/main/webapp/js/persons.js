/**
 * Author: Per Spilling, per@kodemaker.no
 */
var myApp = angular.module('persons', ['ngResource']);

/**
 * Configure the PersonsResource. In order to solve the Cross Origin Resource Sharing (CORS)
 * issue I have set up a Jetty proxy servlet to forward requests transparently to the API server.
 * See the web.xml file for details on that.
 */
myApp.factory('PersonsResource', function ($resource) {
    return $resource('/api/persons', {}, {});
});

function PersonsCtrl($scope, PersonsResource) {
    $scope.persons = PersonsResource.query();

    $scope.showForm = { person: false }

    $scope.togglePersonForm = function () {
        $scope.showForm.person = !$scope.showForm.person;
    }

    $scope.savePerson = function (newPerson) {
        PersonsResource.save(newPerson)
        $scope.persons.push(newPerson)
        $scope.newPerson = {}
    }
}

/*
 $scope.kodemakerPersons = {}
 $scope.persons = PersonsResource.query(function (response) {
 angular.forEach(response, function (person) {
 console.log('person.name=' + person.name)
 });
 });
*/