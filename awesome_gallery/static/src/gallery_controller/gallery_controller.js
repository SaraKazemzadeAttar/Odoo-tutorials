import {Component, onWillStart, onWillUpdateProps, useState} from "@odoo/owl";
import {standardViewProps} from "@web/views/standard_view_props";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {KeepLast} from "@web/core/utils/concurrency"; // it manages a list of tasks, and only keeps the last task active.

export class GalleryController extends Component {
	static template = "awesome_gallery.GalleryController";
	static props = {
		...standardViewProps,
		archInfo: Object,
	};
	static components = {Layout};

	setup() {
		this.orm = useService("orm");
		this.images = useState({data: []});
		this.keeplast = new KeepLast();
		onWillStart(async () => {
			const {records} = await this.loadImages(this.props.domain);
			this.images.data = records;
		});
		onWillUpdateProps(async (nextProps) => {
			// Check if the domain prop has changed compared to the previous props
			if (JSON.stringify(nextProps.domain) !== JSON.stringify(this.props.domain)) {
				const {records} = await this.loadImages(nextProps.domain);
				this.images.data = records;
			}
		});
	}

	loadImages(domain) {
		return this.keeplast.add(
			this.orm.webSearchRead(this.props.resModel, domain, {
				limit: this.props.archInfo.limit,
				specification: { //Specifies which fields to return.
					[this.props.archInfo.image_field]: {},
				},
				context: {
					bin_size: true,
				},
			})
		);
	}
}