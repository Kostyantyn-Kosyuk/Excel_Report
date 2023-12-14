import functionList from './functionsList.js';
import CellStyler from '../CellStyler.js';

export default class GudhubFunctionsWorker {
	constructor(table, scope) {
		this.scope = scope;
		this.table = table;
        this.cellStyler = new CellStyler(this.table);
		this.functionList = functionList;
	}

	setFunction(key, cellCoords) {
        const func = functionList[key];
        if (!func) return;

        func().then(data => {
            this.setData(cellCoords, data.length);
        });

        this.cellStyler.setCellClass(cellCoords.row, cellCoords.col, 'customClass');
    }

    deleteFunction(cellCoords) {
        this.setData(cellCoords, '');
        this.cellStyler.removeCellClass(
			cellCoords.row,
			cellCoords.col
		);
        this.table.render();
    }

    setData(cellCoords, value) {
        const { row, col } = cellCoords;

        this.table.setDataAtCell(row, col, value);
    }
}