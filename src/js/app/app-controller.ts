/// <reference path="../../../defs/angular.d.ts" />

interface IAppCtrlScope extends ng.IScope
{

}

class AppCtrl
{
	constructor(private $scope:IAppCtrlScope) {
		console.log("Hello TypeScript!");
	}
}

angular.module('app.controllers')

.controller('AppCtrl', ($scope) => {
	return new AppCtrl($scope);
});