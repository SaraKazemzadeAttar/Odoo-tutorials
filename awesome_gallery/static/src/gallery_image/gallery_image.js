import {Component} from "@odoo/owl";
import {GalleryModel} from "../gallery_model";
import {url} from "@web/core/utils/urls";

export class GalleryImage extends Component {
	static template = "awesome_gallery.GalleryImage";
	static props = {
		record: Object,
		model: GalleryModel
	};
// Getter method to compute the image URL based on the record and model
	get imageUrl() {
		return url("/web/image", {
			model: this.props.model.resModel,
			id: this.props.record.id,
			field: this.props.model.imageField,
		});
	}

}