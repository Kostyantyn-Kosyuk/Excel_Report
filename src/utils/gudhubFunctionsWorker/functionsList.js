const functionList = {
	1: async function () {
		const app_id = 34049;
		const items = gudhub.getItems(app_id);
		
		const result = (await items).length;

		return result;
	},
	2: async function () {
		const app_id = 34049;
		const items = gudhub.getItems(app_id);

		const result = (await items).length * 2;

		return result;
	}
};

export default functionList;
