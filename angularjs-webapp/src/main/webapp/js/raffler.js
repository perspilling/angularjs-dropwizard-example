var app = angular.module('raffleApp', []);

app.controller("RaffleCtrl", function ($scope) {
    $scope.entries = [
        {name: "Larry"},
        {name: "Curly"},
        {name: "Barry"}
    ]

    // 2 versions of the addEntry() function; one without params and one with.
    /*
    $scope.addEntry = function () {
        $scope.entries.push($scope.newEntry)
        $scope.newEntry = {}
    }
    */

    $scope.addEntry = function (newEntry) {
        $scope.entries.push(newEntry);
        $scope.newEntry = {}
    }

    $scope.drawWinner = function () {
        entry = $scope.entries[Math.floor(Math.random() * $scope.entries.length)]
        entry.winner = true
        $scope.lastWinner = entry
    }
});
