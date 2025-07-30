import { Reactive } from '@web/core/utils/reactive';
import { EventBus } from "@odoo/owl";
import { rewards} from "./click_rewards";
import { choose } from "./utils"

export class ClickerModel extends Reactive {
	constructor() {
		super();
		this.clicks = 50000;
		this.clickBots = 0;
		this.level = 0;
		this.bigBots = 0;
		this.bus = new EventBus();
		this.milestones = [
            { clicks: 1000, unlock: "Clickbots" },
            { clicks: 5000, unlock: "BigBots" },
			{ clicks: 50000, unlock: "power multiplier" },
			{ clicks: 1000000, unlock: "trees" }
        ];
		this.bots = {
		    clickbot: {
		        level: 1,
		        price: 1000,
		        increment: 10,
		        purchased: 0,
		    },
		    bigbot: {
		        level: 2,
		        price: 5000,
		        increment: 100,
		        purchased: 0,
		    },
		};
		this.multiplier = 1;

	}

	addClick() {
		this.increment(1);
	}

	increment(inc) {
		this.clicks += inc;
		this.checkMilestones();
	}
	tick() {
		for(const bot in this.bot){
	    this.clicks += this.clickBots * 10 * this.multiplier;
		}
	}

    checkMilestones() {
        const milestone = this.milestones[this.level];
        if (milestone && this.clicks >= milestone.clicks) {
            this.bus.trigger("MILESTONE", this.milestones[this.level]);
			this.level += 1;
        }
    }

	reset() {
		this.clicks = 0;
		this.clickBots = 0;
		this.level = 0;
	}

	buyBot(botName) {
		const bot = this.bots[botName];
		if (this.clicks >= bot.price) {
			this.clicks -= bot.price;
			bot.purchased += 1;
			if (botName === "clickbot") {
				this.clickBots += 1;
			} else if (botName === "bigbot") {
				this.bigBots += 1;
			}
		}
	}

    buyMultiplier() {
        if (this.clicks < 50000) {
            return false;
        }
        this.clicks -= 50000;
        this.multiplier++;
    }

	getReward() {
		debugger
		const filteredReward = rewards.filter((r) =>
			(!r.minLevel || this.level >= r.minLevel) &&
			(!r.maxLevel || this.level <= r.maxLevel)
		);

		const reward = choose(filteredReward);

		if (reward && reward.apply) {
			reward.apply(this);
			this.bus.trigger("REWARD", reward);
		}

		return reward;
	}
}
