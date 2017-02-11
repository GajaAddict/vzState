(function () {
    'use strict';
    define([
        'angular'        
    ], function (angular) {        
        return angular.module('ngDOMCreator', [])
            .provider('$domCreator', [                               
                function () {
                	this.createLinkNode = function(linkConfig){
                		var link = document.createElement('link');
                		if(linkConfig.cssId)
                        link.id = linkConfig.cssId;
                        link.rel = "stylesheet";
                        link.type = "text/css";
                        link.href = linkConfig.cssUrl;
                        angular.element('head').append(link);
                	};     
                	this.$get = function () {
                        return {
                        	createLinkNode: this.createLinkNode
                        };
                    }
                }]);
    });
}());