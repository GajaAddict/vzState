/**
 * @ModuleName ngStateResolver
 * @Version 0.2.3 
 * @Team:CoARepairOnline 
 * @CreatedDate:28/06/2016
 * @Modifieddate:28/06/2016
 * @Description: Dynamic State resolver of Angular application 
 */
(function () {
    'use strict';
    define([
        'angular', 'ngRouteExtra',
        'ngDOMCreator', 'ocLazyLoad'
    ], function (angular, ngRouteExtra, ngDOMCreator, ocLazyLoad) {
        return angular.module('ngStateResolver', ['ct.ui.router.extras.sticky', 'ct.ui.router.extras.dsr', 'ct.ui.router.extras.statevis', 'oc.lazyLoad'])
            .provider('$stateResolver', [
                '$stateProvider', '$urlRouterProvider',
                function ($stateProvider, $urlRouterProvider) {
                    var self = this;
                    self.registeredStates = [];
                    var getViews = function (stateConfig) {
                        var i = 0, viewsObj = {}, views = stateConfig.views;
                        for (i = 0; i < views.length; i++) {
                            viewsObj[views[i].viewName] = views[i];
                            viewsObj.viewName = views[i].viewName; //Kumaravel
                            //delete viewsObj[views[i].viewName].viewName;
                        }
                        return viewsObj;
                    };
                    var cleanUpOnStateResolve = function (count, deferred, stateConfig, viewConfig) {
                        count.i += 1;
                        if (count.i === stateConfig.views.length) {
                            deferred.resolve();
                            deferred = null;
                            viewConfig = null;
                            count = null;
                            stateConfig = null;
                        }
                    };
                    var getViewConfigResolver = function (stateConfig, viewConfig, $ocLazyLoad, deferred, $timeout, count) {
                        return function () {

                            if (viewConfig.files) {
                                try{
                                    require(viewConfig.files, function () {
                                        if (viewConfig.moduleName) {
                                            $ocLazyLoad.inject(viewConfig.moduleName).then(function () {
                                                //console.log(viewConfig.moduleName + " Loading Status: " + $ocLazyLoad.isLoaded(viewConfig.moduleName));
                                                //console.log($ocLazyLoad.getModules());
                                                if (viewConfig.moduleConfig) {
                                                    require([viewConfig.moduleConfig], function (config) {
                                                        self.loadConfigs(config);
                                                        $timeout(function () {
                                                            cleanUpOnStateResolve(count, deferred, stateConfig, viewConfig);
                                                        });
                                                    });
                                                } else {
                                                    $timeout(function () {
                                                        cleanUpOnStateResolve(count, deferred, stateConfig, viewConfig);
                                                    });
                                                }
                                            });
                                        } else {
                                            $timeout(function () {
                                                cleanUpOnStateResolve(count, deferred, stateConfig, viewConfig);
                                            });
                                        }
                                    });
                                }
                                catch(exception)
                                {
                                    console.log(exception.toString());
                                }
                            } else {
                                $timeout(function () {
                                    cleanUpOnStateResolve(count, deferred, stateConfig, viewConfig);
                                });
                            }


                        }();

                    }
                    this.registerStates = function (stateConfigs) {
                        for (var i = 0; i < stateConfigs.length; i++) {
                            this.registerState(stateConfigs[i]);
                        }
                    };


                    this.registerState = function (stateConfig) {

                        if (("!" + self.registeredStates.join("!") + "!").indexOf("!" + stateConfig.stateName + "!") > 0) {
                            console.error("Sorry! State" + stateConfig.stateName + " is already registered!");
                            return;
                        }

                        var viewsObj = getViews(stateConfig);
                        var stateObj = {
                            url: stateConfig.stateUrl,
                            params: stateConfig.params,
                            views: viewsObj,
                            sticky: stateConfig.sticky ? stateConfig.sticky : false,
                            deepStateRedirect: stateConfig.dsr ? stateConfig.dsr : false,
                            resolve: {
                                resolver: ['$ocLazyLoad', '$q', '$timeout', '$state', function ($ocLazyLoad, $q, $timeout, $state) {
                                    self.registeredStates = $state.get();
                                    for (var i = 0; i < self.registeredStates.length; i++) {
                                        self.registeredStates[i] = self.registeredStates[i].name;
                                    }

                                    var deferred = $q.defer(), i = 0, viewConfig = {}, count = { i: 0 };
                                    if (!stateConfig.views || stateConfig.views.length === 0) {
                                        console.error("Please make sure you have atleast one view attached for the state: " + stateConfig.stateName);
                                        stateConfig = null;
                                        return deferred.reject();
                                    }
                                    for (i = 0; i < stateConfig.views.length; i++) {
                                        getViewConfigResolver(stateConfig, stateConfig.views[i], $ocLazyLoad, deferred, $timeout, count);
                                    }

                                    for (i = 0; i < stateConfig.views.length; i++) {
                                        if (stateConfig.views[i].viewName != undefined && stateConfig.views[i].viewName.indexOf('modal') == 0) {
                                            openModal(stateConfig.views[i].modalName);
                                        }
                                    }

                                    return deferred.promise;
                                }]
                            }
                        };
                        if (!stateConfig.stateUrl) {
                            delete stateObj.url;
                        }

                        //
                        //stateObj.params = {
                        //    aid: { dynamic: true }
                        //    oid: { dynamic: true }
                        //};

                        stateObj.reloadOnSearch = false;
                        //

                        $stateProvider.state(stateConfig.stateName, stateObj);
                    };
                    this.loadConfigs = function (config) {
                        if (config.modules) {
                            for (var i = 0; i < config.modules.length; i++) {
                                require(config.modules[i].files, function () {
                                    $ocLazyLoad.inject(config.modules[i].moduleName);
                                });
                            }
                        }
                        if (config.stateConfigs) {
                            this.registerStates(config.stateConfigs);
                        }
                    };
                    this.configNotFoundUrl = function (path) {
                        $urlRouterProvider.otherwise(path);
                    };
                    this.configFoundUrl = function (path) {
                        $urlRouterProvider.otherwise(path);
                    };

                    this.$get = function () {
                        return {
                            registerStates: this.registerStates,
                            loadConfigs: this.loadConfigs,
                            configNotFoundUrl: this.configNotFoundUrl
                        };
                    };
                }])
    });
}());