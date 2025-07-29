import {registry} from "@web/core/registry";
import {ClickerModel} from "../clicker_model";

export const ClickerService = {
	dependencies: ["effect"],
	start( env) {
		const clicker_model = new ClickerModel();
		const effect = env.services.effect;
		document.addEventListener("click", () => clicker_model.addClick(), true);

        clicker_model.bus.addEventListener("MILESTONE_1K", () => {
            effect.add({
                type: "rainbow_man",
                message: "Milestone reached ! You can now buy clickbots!",
            });
        });
		setInterval(() => {
			clicker_model.tick()
		}, 10000);

		return clicker_model;
	}
};

registry.category("services").add("awesome_clicker.clicker", ClickerService);
