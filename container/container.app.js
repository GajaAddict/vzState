
define('container', ['angular', 'ngStateResolver', 'config', 'containerutils'],
    function (angular, ngStateResolver, config, containerutils) {
        angular.module('container', ['ngStateResolver', 'containerutils'])
        .config(['$compileProvider', function ($compileProvider) {
            $compileProvider.debugInfoEnabled(false);
        }])
        .config([
            '$stateResolverProvider', '$ocLazyLoadProvider',
            function ($stateResolverProvider, $ocLazyLoadProvider) {
                $stateResolverProvider.loadConfigs(config);

                $ocLazyLoadProvider.config({
                    loadedModules: ['container', 'ngStateResolver', 'containerutils'],
                    asyncLoader: require
                });
            }])
        .controller("MainController", function ($scope, $state) {
            $scope.header = "AngularJS Demo App";
            $state.go('newconnect');
        })
        .run(function ($rootScope, $state, $http, $stateParams, $location, $browser) {
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, error) {
                if (toState != undefined && toState != null && fromState != undefined && fromState != null) {
                    console.log("StateChangeStart from State:" + fromState.name + "  To State Name:" + toState.name);
                    if ($rootScope.states == undefined) {
                        $rootScope.states = [];
                    }
                    var viewName = toState.views.viewName;

                    $rootScope.states[viewName] = Date();

                    //event.preventDefault();
                    $state.params = toParams;
                    angular.copy($state.params, $stateParams);

                }
            });

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

                var strReloadUrls = "http://localhost:42370/container/index.html?page=1&sort=asc#/newconnect";
                if ($location.url().indexOf("newconnect") < 0) {
                    strReloadUrls = "http://localhost:42370/container/index.html?page=1&sort=dsc#/accountsearch";
                }

                $browser.url(strReloadUrls, false, null);
                $location.$$absUrl = strReloadUrls;
                });

            $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
                console.log("State Change Error: " +error);
                });

            $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });

            $rootScope.$on('$viewContentLoaded', function(event, _viewName) {
                var viewName = _viewName.replace("@", "");
                console.log(viewName + " Start: " +$rootScope.states[viewName] + ", End: " +Date());

                delete $rootScope.states[viewName];
                });
                });


            });








