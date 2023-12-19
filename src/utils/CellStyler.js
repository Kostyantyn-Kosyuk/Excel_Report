export default class CellStyler {
	constructor(table) {
		this.table = table;
	}

	// Метод для присвоєння кастомних стилів комірці
	setCellClass(row, col, className) {
		this.table.setCellMeta(row, col, 'className', className);
	}
	//delete all custom classes
	removeCellClass(row, col) {
		this.table.removeCellMeta(row, col, 'className');
	}
}
