define(function () {
    "use strict";
    return {
        stateConfigs: [
            {
                stateName: "newconnect",
                stateUrl: "/newconnect",
                views: [{
                    viewName: "mainView",
                    templateUrl: "/new-connect/new-connect.html",
                    controller: 'NewConnectController',
                    files: [
                        "/new-connect/new-connect.app.js",
                        "/new-connect/new-connect.controller.js"
                    ],
                    //moduleConfig: "/new-connect/new-connect.config.js",
                    moduleName: 'newconnectapp'

                }]
            },
            {
                stateName: "accountsearch",
                stateUrl: "/accountsearch",
                views: [{
                    viewName: "mainView",
                    templateUrl: "/account-search/account-search.html",
                    controller: 'AccountSearchController',
                    files: [
                        "/account-search/account-search.app.js",
                        "/account-search/account-search.controller.js"
                    ],
                    //moduleConfig: "/new-connect/new-connect.config.js",
                    moduleName: 'accountsearchapp'

                }]
            }
        ]
    };
});