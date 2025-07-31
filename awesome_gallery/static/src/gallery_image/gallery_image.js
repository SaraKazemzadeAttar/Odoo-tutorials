import {Component} from "@odoo/owl";
import {GalleryModel} from "../gallery_model";
import {url} from "@web/core/utils/urls";
import { useService } from "@web/core/utils/hooks";

export class GalleryImage extends Component {
	static template = "awesome_gallery.GalleryImage";
	static props = {
		record: Object,
		model: GalleryModel
	};
	setup(){
		this.action = useService("action");
	}
	onImageClick() {
	    this.action.switchView("form");  // switches current view to form view mode
	}


	// Getter method to compute the image URL based on the record and model
	get getimageUrl() {
		return url("/web/image", {
			model: this.props.model.resModel,
			id: this.props.record.id,
			field: this.props.model.imageField,
		});
	}

}