angular.module('newconnectapp')
.controller("NewConnectController", function ($scope, $location) {
    //$location.url("?id=111")
    $scope.address = "Test Address";
	
    $scope.$on('$destroy', function () {
        console.log('NewConnectController is no longer necessary');
    });
});