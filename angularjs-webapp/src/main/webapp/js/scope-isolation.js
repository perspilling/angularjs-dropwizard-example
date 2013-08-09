var module = angular.module('scopeIsolation', []);

module.controller("ChoreCtrl", function ($scope) {
    $scope.logChore = function (chore) {
        alert(chore + " is done!");
    };
    $scope.callHome = function (message) {
        alert(message)
    };
    $scope.ctrlFlavor = "blackberry";
    $scope.ctrlFruit = "apple"
});

module.directive("kid", function () {
    return {
        restrict: "E",
        scope: {
            done: "&"
        },
        template:
            '<div class="row-fluid">' +
                '<div class="input-append span8">' +
                    '<input class="span8" type="text" ng-model="chore">' +
                    '<button id="chore" class="btn" ng-click="done({chore:chore})">I\'m done!</button>' +
                    '<label for="chore">{{chore}}</label>' +
                '</div>' +
            '</div>'
    }
});

module.directive("drink", function () {
    return {
        restrict: "E",
        scope: {
            flavor: "@"
        },
        template: '<div>flavor={{flavor}}</div>'
    }
});

module.directive("eat", function () {
    return {
        restrict: "E",
        scope: {
            fruit: "="
        },
        template: '<input class="span3" type="text" ng-model="fruit">'
    }
});

module.directive("phone", function () {
    return {
        restrict: "E",
        scope: {
            dial: "&"
        },
        template:
            '<div class="row-fluid">' +
                '<div class="input-append span8">' +
                    '<input class="span8" type="text" ng-model="value">' +
                    '<button class="btn" ng-click="dial({message:value})">Call home!</button>' +
                '</div>' +
            '</div>'
    }
});


