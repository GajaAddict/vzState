define('containerutils', ['angular'], function (angular) {
    //return angular.module('containerutils', []);
    return angular.module('containerutils', [])
        
        .config(['$provide', '$httpProvider', function ($provide, $httpProvider) {

        //    $provide.decorator("$exceptionHandler", ['$delegate', '$log', function ($delegate, $log) {
        //    return function(exception, cause) {
        //        $log.error(exception);
        //    };
        //}]);

        //$provide.decorator('$log', ["$delegate", function ($delegate) {

        //    var $http = angular.injector(['ng']).get('$http');

        //    $delegate.log = logFn('Log');
        //    $delegate.info = logFn('Info');
        //    $delegate.warn = logFn('Warning');
        //    $delegate.debug = logFn('Debug');
        //    $delegate.error = logFn('Error');

        //    function logFn(msgType) {
        //        return function(){
        //            var args = [].slice.call(arguments);
        //            var msg = '', i;
        //            for (i = 0; i < arguments.length; i++) {
        //                msg += arguments[i] + " ";
        //            }
        //            try{
        //                $log.info(msgType + ': ' + msg); //Replace this line with Log API Call
        //            } catch (e) { }
        //        };
        //    };

        //    return $delegate;
        //}]);

        //$httpProvider.interceptors.push(function () {
        //    return {
        //        'request': function (config) {
        //            config.requestTime = Date();
        //            //$log.debug('request intercept');
        //            console.log('request intercept');
        //            return config;
        //        },

        //        'response': function (response) {
        //            console.log('response intercept');
        //            var timeTaken = (new Date((new Date().getTime() - new Date(response.config.requestTime).getTime())).getTime());
        //            //$log.debug('Time Taken: ' + timeTaken);

        //        }
        //    };
        //});
    }])
    .directive("commonLoader", function () {
        return {
            template: "<p><b>Loading...</b></p>"
        };
    });
});