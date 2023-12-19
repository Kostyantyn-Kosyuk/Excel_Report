const functionList = [
	{
		name: 'App: 34049. Items.length',
		id: 'app_items_length',
		func: async function () {
			const app_id = 34049;
			const items = await gudhub.getItems(app_id);

			const result = items.length;

			return result;
		}
	},
	{
		name: 'App: 34049. Items.length X2',
		id: 'app_items_length_x2',
		func: async function () {
			const app_id = 34049;
			const items = await gudhub.getItems(app_id);

			const result = items.length * 2;

			return result;
		}
	}
];

export default functionList;
