/**
 * Author: Per Spilling, per@kodemaker.no
 */
var myApp = angular.module('persons', ['ngResource', 'ui.bootstrap'], function ($dialogProvider) {
    $dialogProvider.options({backdropClick: false, dialogFade: true});
});

/**
 * Configure the PersonsResource. In order to solve the Single Origin Policy issue in the browser
 * I have set up a Jetty proxy servlet to forward requests transparently to the API server.
 * See the web.xml file for details on that.
 */
myApp.factory('PersonsResource', function ($resource) {
    return $resource('/api/persons', {}, {});
});

myApp.factory('PersonResource', function ($resource) {
    return $resource('/api/persons/:id', {}, {});
});

function PersonsCtrl($scope, PersonsResource, PersonResource, $dialog, $q) {
    /**
     * Define an object that will hold data for the form. The persons list will be pre-loaded with the list of
     * persons from the server. The personForm.person object is bound to the person form in the HTML via the
     * ng-model directive.
     */
    $scope.personForm = {
        show: true,
        person: {}
    }
    $scope.persons = PersonsResource.query();

    /**
     * Function used to toggle the show variable between true and false, which in turn determines if the person form
     * should be displayed of not.
     */
    $scope.togglePersonForm = function () {
        $scope.personForm.show = !$scope.personForm.show;
    }

    /**
     * Clear the person data from the form.
     */
    $scope.clearForm = function () {
        $scope.personForm.person = {}
    }

    /**
     * Save a person. Make sure that a person object is present before calling the service.
     */
    $scope.savePerson = function (person) {
        if (person != undefined) {
            /**
             * Here we need to ensure that the PersonsResource.query() is done after the PersonsResource.save. This
             * is achieved by using the $promise returned by the $resource object.
             */
            PersonsResource.save(person).$promise.then(function() {
                $scope.persons = PersonsResource.query();
                $scope.personForm.person = {}  // clear the form
            });
        }
    }

    /**
     * Set the person to be edited in the person form.
     */
    $scope.editPerson = function (p) {
        $scope.personForm.person = p
    }

    /**
     * Delete a person. Present a modal dialog box to the user to make the user confirm that the person item really
     * should be deleted.
     */
    $scope.deletePerson = function (person) {
        var msgBox = $dialog.messageBox('You are about to delete a person from the database', 'This cannot be undone. Are you sure?', [
            {label: 'Yes', result: 'yes'},
            {label: 'Cancel', result: 'no'}
        ])
        msgBox.open().then(function (result) {
            if (result === 'yes') {
                // remove from the server and reload the person list from the server after the delete
                PersonResource.delete({id: person.id}).$promise.then(function() {
                    $scope.persons = PersonsResource.query();
                });
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