import GhHtmlElement from '@gudhub/gh-html-element';
import html from './excelreport.html';
import './style.scss';

import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import { HyperFormula } from 'hyperformula';

import { getContextMenuItems } from './contextMenu.js';
import {
	MyCustomPlugin,
	MyCustomPluginTranslations
} from './utils/formulas.js';
import { GudhubFunctionsWorker } from './utils/gudhubFunctionsWorker/GudhubFunctionsWorker.js';

const data = [
	['Оренда', 1, 4, 5, 3, '=GREET(A1, A2)'],
	['Податки', 2, 3, 8, 5, ''],
	['Канцелярія', 7, 6, 5, 7, '=SUM(B2,B3)'],
	['Інше', 8, 9, 4, 3, ''],
	['Доставка', 6, 6, 4, 5, ''],
	['Медіа', 1, 3, 1, 2, '']
];

class GhExcelReport extends GhHtmlElement {
	constructor() {
		super();
		this.container;
		this.table;
		this.gudhubFunctionsWorker;
	}

	onInit() {
		super.render(html);
		this.container = this.querySelector('.excel-table');
		this.initializeHandsontable();
	}

	disconnectedCallback() {}

	initializeHandsontable() {
		Handsontable.editors.registerEditor('customEditor', CustomEditor);
		HyperFormula.registerFunctionPlugin(
			MyCustomPlugin,
			MyCustomPluginTranslations
		);

		const settings = {
			data: data,
			rowHeaders: true,
			colHeaders: true,
			contextMenu: getContextMenuItems(this),
			licenseKey: 'non-commercial-and-evaluation',
			formulas: {
				engine: HyperFormula,
				sheetId: 1,
				sheetName: 'Sheet 1'
			},
			editor: 'customEditor'
		};

		this.table = new Handsontable(this.container, settings);
		this.gudhubFunctionsWorker = new GudhubFunctionsWorker(
			this.table,
			this.scope
		);
	}
}

class CustomEditor extends Handsontable.editors.TextEditor {
	constructor(instance, td, row, col, prop, value, cellProperties) {
		super(instance, td, row, col, prop, value, cellProperties);
		this.TEXTAREA.classList.add('disable-gudhub-styles');
	}
}

if (!customElements.get('gh-excel-report')) {
	customElements.define('gh-excel-report', GhExcelReport);
}
