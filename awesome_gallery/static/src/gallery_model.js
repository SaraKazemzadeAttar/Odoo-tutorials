import {KeepLast} from "@web/core/utils/concurrency"; // it manages a list of tasks, and only keeps the last task active.

export class GalleryModel {
	constructor(orm, resModel, archInfo, fields) {
		this.orm = orm;
		this.resModel = resModel;

		const {imageField, limit, fieldsForTooltip} = archInfo;
		this.imageField = imageField;
		this.limit = limit;
		this.fields = fields;
		this.fieldsForTooltip = fieldsForTooltip;
		this.keeplast = new KeepLast();
		this.pager = { offset: 0, limit: limit };
	}


	async load(domain) {
		const specification ={
			[this.imageField]: {},
			write_date: {},
		}
		for (const field of this.fieldsForTooltip) {
			specification[field] = {};
		}
		const { records , length } = await this.keeplast.add(
			this.orm.webSearchRead(this.resModel, domain, {
				limit: this.pager.limit,
				offset: this.pager.offset,
				specification,
				context: {
					bin_size: true,
				}
			})
		);
        this.recordsLength = length;

		this.records = records;
	}

	async uploadImage(record_id, image_binary, domain) {
		await this.orm.webSave(
			this.resModel,
			[record_id],
			{
				[this.imageField]: image_binary,
			},
{
			specification: {},
		})
	 await this.load(domain);
	}
}
