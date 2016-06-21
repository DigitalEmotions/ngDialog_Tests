/// <reference path="../../defs/angular.d.ts" />
/// <reference path="../../defs/angular-ui-router.d.ts" />

angular.module('app', [
			   'templates',
			   'ui.router',
			   'app.common',
			   'app.components',
			   'app.controllers',
			   'ngDialog'
])

.run(function($rootScope:angular.IRootScopeService) {

})

.config(function ($stateProvider:ng.ui.IStateProvider,
				  $urlRouterProvider:ng.ui.IUrlRouterProvider) {

	function createState(state:any):ng.ui.IState {
		return state;
	}

	$stateProvider

		.state("default", createState({
			url: "",
			templateUrl: 'js/app/app-template.html',
			controller: 'AppCtrl'
		}))

		$urlRouterProvider.otherwise('');
});

angular.module('app.common', []);
angular.module('app.components', []);
angular.module('app.controllers', []);