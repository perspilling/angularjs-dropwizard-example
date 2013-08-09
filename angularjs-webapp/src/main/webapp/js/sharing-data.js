var sharingData = angular.module('sharingData', []);

sharingData.factory('Data', function() {
    return {message: "I'm data from a service"}
})

// A filter function
sharingData.filter('reverse', function () {
    return function (text) {
        return text.split("").reverse().join("");
    }
})

function SDFirstCtrl($scope, Data) {
    $scope.data = Data;
}

function SDSecondCtrl($scope, Data) {
    $scope.data = Data;

    $scope.reversedMessage = function (message) {
        return message.split("").reverse().join("");
    }
}