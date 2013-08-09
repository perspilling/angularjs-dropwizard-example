var twitterApp = angular.module('twitterApp', []);

twitterApp.controller("AppCtrl", function ($scope) {
    $scope.loadMoreTweets = function ($scope) {
        alert("Loading more tweets");
    }

    $scope.deleteTweets = function ($scope) {
        alert("Deleting tweets");
    }
})

/**
 * A directive with a behaviour function
 */
twitterApp.directive("enter", function ()  {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function () {
            scope.$apply(attrs.enter);
        })
    }
})

/**
 * A directive that will be reused by other directives
 */
twitterApp.directive("superhero", function ()  {
    return {
        restrict: "E",
        scope: {},

        controller: function ($scope) {
            $scope.abilities = []

            this.addStrength = function () {
                $scope.abilities.push("strength")
            }

            this.addSpeed = function () {
                $scope.abilities.push("speed")
            }

            this.addFlight = function () {
                $scope.abilities.push("flight")
            }
        },

        link: function (scope, element) {
            element.addClass("btn"),
            element.bind("mouseenter", function () {
                console.log(scope.abilities)
            })
        }
    }
})

/**
 * A directive that uses (requires) the controller of another directive.
 */
twitterApp.directive("strength", function () {
    return {
        require: "superhero",
        link: function (scope, element, attrs, ctrl) {
            ctrl.addStrength();
        }
    }
})

twitterApp.directive("speed", function () {
    return {
        require: "superhero",
        link: function (scope, element, attrs, ctrl) {
            ctrl.addSpeed();
        }
    }
})

twitterApp.directive("flight", function () {
    return {
        require: "superhero",
        link: function (scope, element, attrs, ctrl) {
            ctrl.addFlight();
        }
    }
})





