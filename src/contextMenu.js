import functionList from './utils/gudhubFunctionsWorker/functionsList.js';

export function getContextMenuItems(instance) {
	return {
		items: {
			insertFunction: {
				name: 'Insert function...',
				submenu: {
					items: functionList.map(({name, id}) => {
						return {
							key: `insertFunction:${id}`,
							name: name,
							callback(key, selection) {
								const cellCoords = getCellCoords(selection);
								instance.controller.setFunction(cellCoords, key);
							}
						}
					})
				}
			},
			deleteFunction: {
				name: 'Delete function',
				callback(key, selection) {
					const cellCoords = getCellCoords(selection);
					instance.controller.deleteFunction(cellCoords);
				}
			}
		}
	};
}

function getCellCoords(cells) {
	const cellCoordsObject = cells[0];

	const { start, end } = cellCoordsObject;

	if (!start.isEqual(end)) {
		return;
	}

	return start;
}
