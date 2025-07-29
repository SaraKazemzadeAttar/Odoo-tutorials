import {registry} from "@web/core/registry";
import {ClickerModel} from "../clicker_model";

export const ClickerService = {
	start() {
		const clicker_model = new ClickerModel();
		document.addEventListener("click", () => clicker_model.addClick(), true);

		setInterval(() => {
			clicker_model.tick()
		}, 10000);

		return clicker_model;
	}
};

registry.category("services").add("awesome_clicker.clicker", ClickerService);
