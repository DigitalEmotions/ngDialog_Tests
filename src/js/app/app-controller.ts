/// <reference path="../../../defs/angular.d.ts" />

interface IAppCtrlScope extends ng.IScope
{
	openModal():void;
}

class AppCtrl
{
	constructor(private $scope:IAppCtrlScope, Util:Util) {
		$scope.openModal = function() {
			Util.showModal($scope, "js/modal/tall/tall-template.html");
		};
	}
}

angular.module('app.controllers')

.controller('AppCtrl', ($scope, Util) => {
	return new AppCtrl($scope, Util);
});