import {KeepLast} from "@web/core/utils/concurrency"; // it manages a list of tasks, and only keeps the last task active.

export class GalleryModel {
	constructor(orm, resModel, archInfo, fields) {
		this.orm = orm;
		this.resModel = resModel;

		const {imageField, limit, tooltipField} = archInfo;
		this.imageField = imageField;
		this.limit = limit;
		this.fields = fields;
		this.tooltipField = tooltipField;
		this.keeplast = new KeepLast();
		this.pager = { offset: 0, limit: limit };
	}


	async load(domain) {
		const { records , length } = await this.keeplast.add(
			this.orm.webSearchRead(this.resModel, domain, {
				limit: this.pager.limit,
				offset: this.pager.offset,
				specification: { //Specifies which fields to return.
					[this.imageField]: {},
					...(this.tooltipField ? {[this.tooltipField]: {}} : {}),
				},
				context: {
					bin_size: true,
				}
			})
		);
        this.recordsLength = length;
		if (!this.tooltipField) {
			this.records = records;
			return;
		}
		switch (this.fields[this.tooltipField].type) {
			case "many2one":
				this.records = records.map((record) => ({
					...record,
					[this.tooltipField]: record[this.tooltipField][1],
				}));
				break;
			case "integer":
				this.records = records.map((record) => ({
					...record,
					[this.tooltipField]: String(record[this.tooltipField]),
				}));
				break;
			default:
				this.records = records;
		}
	}
}
