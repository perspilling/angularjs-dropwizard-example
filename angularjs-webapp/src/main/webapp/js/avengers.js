var myApp = angular.module('avengers', []);

myApp.directive("superman", function ()  {
    return {
        restrict: "E",
        template: "<div>This is a superman directive</div>"
    }
})

myApp.directive("working", function ()  {
    return {
        restrict: "A",
        link: function() {
            alert("I'm working")
        }
    }
})

myApp.directive("enter", function ()  {
    return function(scope, element, attrs) {
        element.bind("mouseenter", function () {
            //console.log("I'm in you!");
            element.addClass(attrs.enter);
        })
    }
})

myApp.directive("enter", function ()  {
    return function(scope, element, attrs) {
        element.bind("mouseleave", function () {
            //console.log("I'm leaving you!");
            element.removeClass(attrs.enter);
        })
    }
})

myApp.factory('Avengers', function () {
    var Avengers = {};
    Avengers.cast = [
        {
            name: "Robert Downey Jr.",
            character: "Tony Stark / Iron Man"
        },
        {
            name: "Chris Evans",
            character: "Steve Rogers / Captain America"
        },
        {
            name: "Mark Ruffalo",
            character: "Bruce Banner / The Hulk"
        },
        {
            name: "Chris Hemsworth",
            character: "Thor"
        },
        {
            name: "Scarlett Johansson",
            character: "Natasha Romanoff / Black Widow"
        },
        {
            name: "Jeremy Renner",
            character: "Clint Barton / Hawkeye"
        },
        {
            name: "Tom Hiddleston",
            character: "Loki"
        },
        {
            name: "Clark Gregg",
            character: "Agent Phil Coulson"
        },
        {
            name: "Cobie Smulders",
            character: "Agent Maria Hill"
        },
        {
            name: "Stellan Skarsgård",
            character: "Selvig"
        },
        {
            name: "Samuel L. Jackson",
            character: "Nick Fury"
        },
        {
            name: "Gwyneth Paltrow",
            character: "Pepper Potts"
        }
    ];
    return Avengers;
})

function AvengersCtrl($scope, Avengers) {
    $scope.avengers = Avengers;
}