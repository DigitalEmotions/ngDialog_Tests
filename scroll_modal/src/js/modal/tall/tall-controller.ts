interface ITallCtrlScope extends ng.IScope, INgDialogCtrl
{

}

class TallCtrl
{
	constructor($scope:ITallCtrlScope) {


	}
}

angular.module('app.common')

.controller('TallCtrl', ($scope) => {
	return new TallCtrl($scope);
});
