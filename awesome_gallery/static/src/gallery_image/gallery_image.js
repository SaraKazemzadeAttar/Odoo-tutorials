import {Component} from "@odoo/owl";
import {GalleryModel} from "../gallery_model";
import {url} from "@web/core/utils/urls";
import { useService } from "@web/core/utils/hooks";
import { FileUploader } from "@web/views/fields/file_handler";

export class GalleryImage extends Component {
	static template = "awesome_gallery.GalleryImage";
	static props = {
		record: Object,
		model: GalleryModel,
		onImageUpload: Function,
	};
	static  components = { FileUploader }
	setup(){
		this.action = useService("action");
	}
	onImageClick(resId){
		this.action.switchView("form", { resId });
	}

	// Getter method to compute the image URL based on the record and model
	get getimageUrl() {
		return url("/web/image", {
			model: this.props.model.resModel,
			id: this.props.record.id,
			field: this.props.model.imageField,
			unique: this.props.record.write_date,
		});
	}
    async _onFileUploaded({ data }){
		await this.props.onImageUpload(this.props.record.id , data);
    }
}