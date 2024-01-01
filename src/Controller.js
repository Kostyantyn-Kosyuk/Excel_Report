import { DocumentStorage } from './utils/DocumentStorage.js';
import GudhubFunctionsWorker, { metaKeys } from './utils/gudhubFunctionsWorker/GudhubFunctionsWorker.js';

export default class Controller {
	constructor(scope) {
		this.scope = scope;
		this.documentStorage = new DocumentStorage(this.scope);
	}

	async getStorageData() {
		return this.documentStorage.getData();
	}

	initGudhubFunctionsWorker(table) {
		this.gudhubFunctionsWorker = new GudhubFunctionsWorker(
			this.scope,
			table
		);

		this.gudhubFunctionsWorker.loadFunctionsFromTable();
	}

	saveData(cellsData, metaData) {
		const data = moveFuncIdFromCellMetaToCellData(cellsData, metaData);
		this.documentStorage.saveData(data);
	}
	
	async setFunction(cellCoords, funcKey) {
		this.gudhubFunctionsWorker.setFunction(
			cellCoords.row,
			cellCoords.col,
			funcKey.split(':')[1]
		);
	}

	async deleteFunction(cellCoords) {
		this.gudhubFunctionsWorker.deleteFunction(cellCoords.row, cellCoords.col);
	}

	loadCellsFunctions(cells) {
		cells.forEach((cell) => {
			const { cellCoords, funcId } = cell;

			this.gudhubFunctionsWorker.setFunction(
				cellCoords,
				funcId.split(':')[1]
			);
		});
	}
}

function moveFuncIdFromCellMetaToCellData(cellsData, metaData) {
		const data = [...cellsData];
		metaData.forEach((cellMeta) => {
			const funcId = cellMeta[metaKeys.func];

			if (!funcId) return;

			const { row, col } = cellMeta;
			data[row][col] = `$func:${funcId}`;
		});

	return data;
}
