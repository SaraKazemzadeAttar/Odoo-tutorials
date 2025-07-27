import {rpc} from "@web/core/network/rpc";
import {reactive} from "@odoo/owl";
import {registry} from "@web/core/registry";

export const ClickerService = {
	start() {
		const state = reactive({ clicker: 10000});
		function increment(inc){
			state.clicker += inc;
		}
		document.addEventListener("click", () => increment(1), true);
		return {
			state,
			increment,
		};
	},
};
registry.category("services").add("awesome_clicker.clicker", ClickerService);
