import { DocumentStorage } from './utils/DocumentStorage.js';
import GudhubFunctionsWorker from './utils/gudhubFunctionsWorker/GudhubFunctionsWorker.js';

export default class Controller {
	constructor(scope, table) {
		this.scope = scope;
		this.table = table;
		this.gudhubFunctionsWorker = new GudhubFunctionsWorker(
			this.scope,
			this.table
		);
		this.documentStorage = new DocumentStorage(this.scope);
		this.documentStorage
			.initStorage()
			.then((cells) => this.loadCellsFunctions(cells));
	}

	async setFunction(cellCoords, funcKey) {
		this.gudhubFunctionsWorker.setFunction(
			cellCoords,
			funcKey.split(':')[1]
		);

		this.documentStorage.addCellFunction(cellCoords, funcKey);
	}

	async deleteFunction(cellCoords) {
		this.gudhubFunctionsWorker.deleteFunction(cellCoords);

		const isDeleted =
			await this.documentStorage.deleteCellFunction(cellCoords);
		return isDeleted;
	}

	loadCellsFunctions(cells) {
		cells.forEach((cell) => {
			const { cellCoords, funcKey } = cell;

			this.gudhubFunctionsWorker.setFunction(
				cellCoords,
				funcKey.split(':')[1]
			);
		});
	}
}
