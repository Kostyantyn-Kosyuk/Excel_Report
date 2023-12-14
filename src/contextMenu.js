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
								const coords = getCellCoords(selection);
								// викликати фанкшн воркера
							}
						}
					]
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
