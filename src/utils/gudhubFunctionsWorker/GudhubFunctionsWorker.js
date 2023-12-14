import functionList from './functionsList.js';

export class GudhubFunctionsWorker {
	constructor(table, scope) {
		this.scope = scope;
		this.table = table;
		this.functionList = functionList;
	}

	setFunction(key, cellCoords) {
        const func = functionList[key];
        if (!func) return;

        func().then(data => {
            this.setData(cellCoords, data.length);
        });
    }

    setData(cellCoords, value) {
        const { row, col } = cellCoords;

        this.table.setDataAtCell(row, col, value);
    }
}