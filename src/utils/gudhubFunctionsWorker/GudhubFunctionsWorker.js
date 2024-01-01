import functionList from './functionsList.js';
import CellStyler from '../CellStyler.js';

import extractFuncId from '../../helpers/extractFuncId.js';

export const metaKeys = {
	func: 'func',
};

export default class GudhubFunctionsWorker {
	constructor(scope, table) {
		this.scope = scope;
		this.table = table;
		this.cellStyler = new CellStyler(this.table);
		this.functionList = functionList;
	}

	setFunction(row, col, id) {
		const foundFunctionObject = functionList.find((func) => func.id === id);
		if (!foundFunctionObject) return;
		const func = foundFunctionObject.func;

		this.cellStyler.setCellClass(
			row,
			col,
			'gudhubFunctionAssigned'
		);

		this.table.setCellMeta(row, col, metaKeys.func, id);

		func().then((data) => {
			this.cellStyler.setCellClass(
				row,
				col,
				'gudhubFunctionAssigned calculated'
			);
			this.setData(row, col, data);
		});
	}

	deleteFunction(row, col) {
		this.table.removeCellMeta(row, col, metaKeys.func);
		this.cellStyler.removeCellClass(row, col);
		this.setData(row, col, '');
	}

	setData(row, col, value) {
		this.table.setDataAtCell(row, col, value);
	}

	loadFunctionsFromTable() {
		const cellsData = this.table.getData();

		cellsData.forEach((rowData, rowIndex) => 
			rowData.forEach((cellData, colIndex) => {
				const funcId = extractFuncId(cellData);
				if (!funcId) return;
				this.setFunction(rowIndex, colIndex, funcId);
			})
		);
	}
}