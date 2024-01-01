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
import CustomEditor from './CustomEditor.js';

import resizeElements from './utils/resizeComponent.js';
import Controller from './Controller.js';

class GhExcelReport extends GhHtmlElement {
	constructor() {
		super();
		this.container;
		this.table;
		this.controller;
		this.gudhubFunctionsWorker;
	}

	async onInit() {
		super.render(html);
		this.container = this.querySelector('.report-table');
		this.controller = new Controller(this.scope);
		await this.initializeHandsontable();
		this.controller.initGudhubFunctionsWorker(this.table);
	}

	disconnectedCallback() {
		resizeElements.destroy();
	}

	async initializeHandsontable() {
		Handsontable.editors.registerEditor('customEditor', CustomEditor);
		HyperFormula.registerFunctionPlugin(
			MyCustomPlugin,
			MyCustomPluginTranslations
		);

		const getController = () => this.controller;

		const onTableDataChange = function() {
			const data = this.getData();
			const metaData = this.getCellsMeta();
			const controller = getController();
			if (!data) return;
			controller.saveData(data, metaData);
		};

		const data = await this.controller.getStorageData();

		const settings = {
			data,
			rowHeaders: true,
			colHeaders: true,
			contextMenu: getContextMenuItems(this),
			licenseKey: 'non-commercial-and-evaluation',
			afterChange: onTableDataChange,
			formulas: {
				engine: HyperFormula,
				sheetId: 1,
				sheetName: 'Sheet 1'
			},
			selectionMode: 'single',
			editor: 'customEditor'
		};

		this.table = new Handsontable(this.container, settings);
		resizeElements.subscribe(this.table);
	}
}

if (!customElements.get('gh-excel-report')) {
	customElements.define('gh-excel-report', GhExcelReport);
}