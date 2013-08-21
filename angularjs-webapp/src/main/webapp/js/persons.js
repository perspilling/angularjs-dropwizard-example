/**
 * Author: Per Spilling, per@kodemaker.no
 */
var myApp = angular.module('persons', ['ngResource', 'ui.bootstrap'], function ($dialogProvider) {
    $dialogProvider.options({backdropClick: false, dialogFade: true});
});

/**
 * Configure the PersonsResource. In order to solve the Cross Origin Resource Sharing (CORS)
 * issue I have set up a Jetty proxy servlet to forward requests transparently to the API server.
 * See the web.xml file for details on that.
 */
myApp.factory('PersonsResource', function ($resource) {
    return $resource('/api/persons', {}, {});
});

myApp.factory('PersonResource', function ($resource) {
    return $resource('/api/persons/:id', {}, {});
});

function PersonsCtrl($scope, PersonsResource, PersonResource, $dialog, $window) {
    $scope.personForm = {
        show: true,
        persons: PersonsResource.query(),
        person: {}
    }

    $scope.togglePersonForm = function () {
        $scope.personForm.show = !$scope.personForm.show;
    }

    $scope.clearForm = function () {
        $scope.personForm.person = {}
    }

    $scope.savePerson = function (person) {
        if (person != undefined) {
            PersonsResource.save(person)
            $scope.personForm.person = {}  // clear the form
            // reload the updated list of persons
            $scope.personForm.persons = PersonsResource.query()
            //$window.location.reload()      // in order to reload the updated list of persons
        }
    }

    $scope.editPerson = function (p) {
        $scope.personForm.person = p
    }

    $scope.deletePerson = function (person) {
        var msgBox = $dialog.messageBox('You are about to delete a person', 'This cannot be undone. Are you sure?', [
            {label: 'Yes', result: 'yes'},
            {label: 'Cancel', result: 'no'}
        ])
        msgBox.open().then(function (result) {
            if (result === 'yes') {
                // remove from the server
                PersonResource.delete({id: person.id})

                // update the persons list
                //
                // Preferred solution: reload the updated list of persons only; this will cause the view to be
                // updated in Firefox, but not in Chrome...
                //$scope.personForm.persons = PersonsResource.query();

                // Alt. solution 1) update the persons list locally
                var idx = $scope.personForm.persons.indexOf(person);
                $scope.personForm.persons.splice(idx, 1)

                // Alt. solution 2) reload the page in order to load the updated list of persons
                //$window.location.reload()
            }
        });
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