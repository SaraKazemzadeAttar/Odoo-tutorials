import { patch } from "@web/core/utils/patch";
import { FormController } from "@web/views/form/form_controller";
import {useClicker} from "../clicker_hook";

const FormControllerPatch = {
	setup() {
		super.setup(...arguments);
		debugger
		if (Math.random() < 1) {
			const clicker = useClicker();
			clicker.getReward();
		}
	}
}

patch(FormController.prototype, FormControllerPatch);