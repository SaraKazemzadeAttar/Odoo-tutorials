import {KeepLast} from "@web/core/utils/concurrency";  // it manages a list of tasks, and only keeps the last task active.

export class GalleryModel {
	constructor(orm, resModel, archInfo) {
		this.orm = orm;
		this.resModel = resModel;

		const { imageField, limit } = archInfo;
		this.imageField = imageField;
		this.limit = limit
		this.keeplast = new KeepLast();
	}


	async load(domain) {
		const {records} = await this.keeplast.add(
			this.orm.webSearchRead(this.resModel, domain, {
				limit: this.limit,
				specification: { //Specifies which fields to return.
					[this.imageField]: {},
				},
				context: {
					bin_size: true,
				}
			})
		);
		this.records = records;
	}
}
