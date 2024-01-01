export class DocumentStorage {
	constructor(scope) {
		this.scope = scope;
		this.documentAdress;
		this.initStorage();
	}

	initStorage() {
		const { appId, itemId, fieldId } = this.scope;
		this.documentAdress = {
			app_id: appId,
			item_id: itemId,
			element_id: fieldId
		};
	}

	async getData() {
		const document = await gudhub.getDocument(this.documentAdress);
		if (!document) return [];

		const { data } = document;

		return data;
	}

	async saveData(data) {
		const documentObject = {
			...this.documentAdress,
			data,
		};

		try {
			return gudhub.createDocument(documentObject);
		} catch (error) {
			console.error('Error saving cells to storage:', error);
		}
	}
}