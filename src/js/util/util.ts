
class Util
{
	constructor(private ngDialog:INgDialogService) {

	}

	public showModal(scope:ng.IScope, template:string, controller?:string, data?:any ):INgDialog {

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
	}

	public closeAllModals() {
		this.ngDialog.close();
	}
}

angular.module('app.common')

.factory('Util', (ngDialog) => {
	var util = new Util(ngDialog);
	return util;
});
