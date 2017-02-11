angular.module('accountsearchapp')
.controller("AccountSearchController", function ($scope, $http, $location, $state, $window, MyService) {
    //$location.url("?id=222&&sessionid=123")
    $scope.address = '';

    MyService.CallMe(Success, Failure);

    function Success(data) {
        $scope.address = "Test Address";
    }

    function Failure(data) {
        $scope.address = "Error";
    }

    $scope.updateUrl = function () {
        //$location.search('aid', 111);
        //$location.search('oid', 222);
    }

    $scope.gotoNewConnect = function () {
        $state.go('newconnect');
        //$state.go('newconnect', {page: 5, sort: 'asc'});
        //$state.transitionTo('newconnect', {page: 1 }, { notify: false });
        //$window.location.href = "http://localhost:42370/container/index.html?page=111&sort=asc#/newconnect";
        //$state.go('newconnect')
    }

    $scope.$on('$destroy', function () {
        console.log('AccountSearchController is no longer necessary');
    })
})
.service("MyService", function ($window, $http) {

    this.CallMe = function (success, failure) {
        $window.setTimeout(function () {
            $http.get('http://localhost:42370/container/index.html').then(success, failure);
        }, 2000);
    }
});