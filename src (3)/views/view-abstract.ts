
export abstract class ViewAbstract<FullView> {
	viewName : string;
	viewId : string;
	public constructor() {

	}
}


export class Teste {

}
export class DefaultView extends ViewAbstract<DefaultView> {
	public constructor() {
		super();
	}
}





export default ViewAbstract;