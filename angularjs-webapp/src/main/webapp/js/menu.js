var sidebarMenu = angular.module('sidebarMenu', ['ngRoute'])
    .config(function ($locationProvider, $routeProvider) {
        // browser reload doesn't work when html5 mode is turned on..
        //$locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl: '/partials/hello.html'})
            .when('/sharing-data', {templateUrl: '/partials/sharing-data.html'})
            .when('/filters-and-directives', {templateUrl: '/partials/filters-and-directives.html'})
            .when('/controller-and-directives', {templateUrl: '/partials/controller-and-directives.html'})
            .when('/scope-isolation', {templateUrl: '/partials/scope-isolation.html'})
            .when('/raffler', {templateUrl: '/partials/raffler.html'})
            .when('/tabs', {templateUrl: '/partials/tabs.html'})
            .when('/persons', {templateUrl: '/partials/persons.html'})
            .otherwise({redirectTo: '/'})
    });

sidebarMenu.controller("MenuCtrl", function ($scope, $location, Menu) {
    $scope.menu = Menu;

    /*
     See: http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
     */
    $scope.getClass = function (item) {
        //console.log("location.path=" + $location.path())
        //console.log("item.href=" + item.href)
        //if ($location.path() == item.href) {
        if ($location.path() == item.href.substr(2)) {
            return "active"
        } else {
            return ""
        }
    }
});

sidebarMenu.directive("menu", function () {
    return {
        restrict: "A",
        template: '<ul class="nav nav-list">' +
            '<li class="nav-header">Examples</li>' +
            '<li ng-repeat="item in menu.items" ng-class="getClass(item)"><a href="{{item.href}}">{{item.name}}</a></li>' +
            '</ul>'
    }
});

sidebarMenu.factory('Menu', function () {
    var Menu = {};
    Menu.items = [
        {
            class: "",
            href: "/#!/index.html",
            //href: "/index.html",
            name: "Hello world"
        },
        {
            class: "",
            href: "/#/sharing-data",
            //href: "/sharing-data",
            name: "Sharing data"
        },
        {
            class: "",
            href: "/#/filters-and-directives",
            //href: "/filters-and-directives",
            name: "Filters & directives"
        },
        {
            class: "",
            href: "/#/controller-and-directives",
            //href: "/controller-and-directives",
            name: "Controller & directives"
        },
        {
            class: "",
            href: "/#/scope-isolation",
            //href: "/scope-isolation",
            name: "Scope isolation"
        },
        {
            class: "",
            href: "/#/raffler",
            //href: "/raffler",
            name: "Raffle example"
        },
        {
            class: "",
            href: "/#/tabs",
            //href: "/tabs",
            name: "Tabs"
        },
        {
            class: "",
            href: "/#/persons",
            //href: "/persons",
            name: "Person Admin"
        }
    ];
    return Menu;
});

