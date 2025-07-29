import {rpc} from "@web/core/network/rpc";
import {reactive} from "@odoo/owl";
import {registry} from "@web/core/registry";

export const ClickerService = {
	start() {
		const state = reactive({clicks:900, level:0, clickBots: 0});

        setInterval(() => {
            if (state.clickBots > 0) {
                state.clicks += 10 * state.clickBots;
                checkMilestones();
            }
        }, 10000);


	    function increment(inc) {
	        state.clicks += inc;
	        checkMilestones();
	    }

	    function checkMilestones() {
	        if (state.level === 0 && state.clicks >= 1000) {
	            state.level = 1;
	        }
	    }

	    function buyClickBot() {
	        if (state.clicks >= 1000) {
	            state.clicks-= 1000;
	            state.clickBots += 1;
	        }
	    }
		document.addEventListener("click", () => increment(1), true);
		return {
			state,
			increment,
			buyClickBot,
		};
	},
};
registry.category("services").add("awesome_clicker.clicker", ClickerService);
