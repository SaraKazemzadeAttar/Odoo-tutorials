import { Reactive } from '@web/core/utils/reactive';
import { EventBus } from "@odoo/owl";

export class ClickerModel extends Reactive {
	constructor() {
		super();
		this.clicks = 990;
		this.clickBots = 0;
		this.level = 0;
		this.bus = new EventBus();
	}

	addClick() {
		this.increment(1);
	}

	increment(inc) {
		this.clicks += inc;
		this.checkMilestones();
	}
	tick() {
	    this.clicks += this.clickBots * 10;
	}

	checkMilestones() {
		if (this.level === 0 && this.clicks >= 1000) {
			this.level = 1;
			this.bus.trigger("MILESTONE_1K");
		}
	}

	buyClickBot() {
		const clickBotPrice = 1000;
		if (this.clicks >= clickBotPrice) {
			this.clickBots += 1;
			this.clicks -= clickBotPrice;
		}
		return false;
	}

	reset() {
		this.clicks = 0;
		this.clickBots = 0;
		this.level = 0;
	}
}
