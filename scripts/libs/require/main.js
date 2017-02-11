require.config({
    baseUrl: '../scripts',
    waitSeconds: 500,
    paths: {
        angular: "libs/angular/angular",
        ngRoute: "libs/ngRoute/angular-ui-router",
        ngRouteExtra: "libs/ngRoute/ct-ui-router-extras",
        //ngDOMCreator: "ngDOMCreator",
        ngStateResolver: "ngStateResolver",
        ocLazyLoad: "ocLazyLoad",
        containerutils: "../containerutils/containerutils.app",
        container: "../container/container.app",
        config: "../container/config"
    },
    shim: {
        angular: { exports: 'angular' },
        ngRoute: ['angular'],
        ngRouteExtra: ['ngRoute'],
        ocLazyLoad: ['angular'],
        config: { exports: 'config' },
        ngDOMCreator: { deps: ['angular'] }
    }
});
require([
         'angular', 'containerutils', 'container'
], function (angular, containerutils, container) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['containerutils', 'container'], {
            strictDi: false
        });
    });
}
 );