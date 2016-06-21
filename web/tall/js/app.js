(function ( window, angular, undefined ) { /// <reference path="../../defs/angular.d.ts" />
/// <reference path="../../defs/angular-ui-router.d.ts" />
angular.module('app', [
    'templates',
    'ui.router',
    'app.common',
    'app.components',
    'app.controllers',
    'ngDialog'
]).run(["$rootScope", function ($rootScope) {
}]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    function createState(state) {
        return state;
    }
    $stateProvider.state("default", createState({
        url: "",
        templateUrl: 'js/app/app-template.html',
        controller: 'AppCtrl'
    }));
    $urlRouterProvider.otherwise('');
}]);
angular.module('app.common', []);
angular.module('app.components', []);
angular.module('app.controllers', []);

/// <reference path="../../../defs/angular.d.ts" />
var AppCtrl = (function () {
    function AppCtrl($scope, Util) {
        this.$scope = $scope;
        $scope.openModal = function () {
            Util.showModal($scope, "js/modal/tall/tall-template.html");
        };
    }
    return AppCtrl;
})();
angular.module('app.controllers').controller('AppCtrl', ["$scope", "Util", function ($scope, Util) {
    return new AppCtrl($scope, Util);
}]);



var Util = (function () {
    function Util(ngDialog) {
        this.ngDialog = ngDialog;
    }
    Util.prototype.showModal = function (scope, template, controller, data) {
        var self = this;
        var dialog = this.ngDialog.open({
            template: template,
            controller: controller,
            closeByDocument: false,
            showClose: false,
            scope: scope,
            data: data
        });
        return dialog;
    };
    Util.prototype.closeAllModals = function () {
        this.ngDialog.close();
    };
    return Util;
})();
angular.module('app.common').factory('Util', ["ngDialog", function (ngDialog) {
    var util = new Util(ngDialog);
    return util;
}]);

var TallCtrl = (function () {
    function TallCtrl($scope) {
    }
    return TallCtrl;
})();
angular.module('app.common').controller('TallCtrl', ["$scope", function ($scope) {
    return new TallCtrl($scope);
}]);
 })( window, window.angular );