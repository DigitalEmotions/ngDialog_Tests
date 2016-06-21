interface INgDialog
{
	id:string;
	close():void;
	closePromise:ng.IPromise<INgDialogResult>;
}

//TODO: this interface is a WIP, see: https://github.com/likeastore/ngDialog
interface INgDialogCtrl
{
	closeThisDialog(value?:any):void;
	ngDialogData:any;
}

interface INgDialogResult
{
	$dialog:JQuery;
	id:string;
	remainingDialogs:number;
	value:any;
}

interface INgDialogService
{
	open(params:any):INgDialog;
	close():void;
	getOpenDialogs():any[];
}