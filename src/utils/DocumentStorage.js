import { CellCoords } from 'handsontable';

export class DocumentStorage {
	constructor(scope) {
		this.scope = scope;
		this.documentAdress;
	}

	async initStorage() {
		const { appId, itemId, fieldId } = this.scope;
		this.documentAdress = {
			app_id: appId,
			item_id: itemId,
			element_id: fieldId
		};

		this.cells = await this.getData();

		return this.cells;
	}

	async getData() {
		const document = await gudhub.getDocument(this.documentAdress);
		if (!document) return [];

		const cells = document.data;

		return cells;
	}

	async addCellFunction(cellCoords, funcKey) {
		const newCell = {
			cellCoords,
			funcKey
		};

		this.cells.push(newCell);

		const response = await this.saveStorage();
		if (!response) return false;

		const savedCells = response.data;

		return true;
	}

	async deleteCellFunction(cellCoords) {
		const foundCellIndex = this.cells.findIndex((cell) => {
			const cellCoordsObject = new CellCoords(
				cell.cellCoords.row,
				cell.cellCoords.col
			);
			return cellCoordsObject.isEqual(cellCoords);
		});

		if (foundCellIndex === -1) return undefined;

		const removedCell = this.cells.splice(foundCellIndex, 1);

		const savedCells = await this.saveStorage();
		return removedCell;
	}

	async saveStorage() {
		const documentObject = {
			...this.documentAdress,
			data: this.cells
		};

		try {
			return gudhub.createDocument(documentObject);
		} catch (error) {
			console.error('Error saving cells to storage:', error);
		}
	}
}
