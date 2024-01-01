import Handsontable from "handsontable";
import { metaKeys } from "./utils/gudhubFunctionsWorker/GudhubFunctionsWorker.js";
export default class CustomEditor extends Handsontable.editors.TextEditor {
	constructor(instance, td, row, col, prop, value, cellProperties) {
		super(instance, td, row, col, prop, value, cellProperties);
		this.TEXTAREA.classList.add('disable-gudhub-styles');
	}

	 open() {
    const funcId = this.instance.getCellMeta(this.row, this.col)[metaKeys.func];

    if (funcId) {
      return;
    }

    super.open();
  }
}