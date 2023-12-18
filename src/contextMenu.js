export function getContextMenuItems(instance) {
	return {
		items: {
			insertFunction: {
				name: 'Insert function...',
				submenu: {
					items: [
						{
							key: 'insertFunction:1',
							name: '1',
							callback(key, selection) {
								const cellCoords = getCellCoords(selection);
								instance.controller.setFunction(cellCoords, key);
							}
						}
					]
				}
			},
			deleteFunction: {
				name: 'Delete function...',
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
