import {Reactive} from '@web/core/utils/reactive';
import {EventBus} from "@odoo/owl";
import {rewards} from "./click_rewards";
import {choose} from "./utils"
import { CURRENT_VERSION } from "./clicker_migration";

export class ClickerModel extends Reactive {
	constructor() {
		super();
		this.clicks = 1000000;
		this.clickBots = 0;
		this.level = 0;
		this.bigBots = 0;
		this.bus = new EventBus();
		this.milestones = [
			{clicks: 1000, unlock: "Clickbots"},
			{clicks: 5000, unlock: "BigBots"},
			{clicks: 50000, unlock: "power multiplier"},
			{clicks: 1000000, unlock: "trees"}
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
		this.trees = {
			pearTree: {
				level: 4,
				price: 1000000,
				produce: "pear",
				purchased: 0
			},
			cherryTree: {
				level: 4,
				price: 1000000,
				produce: "cherry",
				purchased: 0
			},
			peachTree: {
				level:4,
				price:1000000,
				produce: "peach",
				purchased: 0,
			}
		}
		this.fruits = {
			pear: 0,
			cherry: 0,
		}
		this.ticks = 0;
		this.version = CURRENT_VERSION;
	}

	addClick() {
		this.increment(1);
	}

	increment(inc) {
		this.clicks += inc;
		this.checkMilestones();
	}
	tick() {
		this.ticks++;
		for (const bot in this.bot) {
			this.clicks += this.clickBots * 10 * this.multiplier;
		}
		// every 30s, increment a fruit

		if (this.ticks % 3 === 0) {
			for (const treeName in this.trees) {
				const tree = this.trees[treeName];
				if (!tree.produce) {
					continue;
				}
				this.fruits[tree.produce] = (this.fruits[tree.produce] || 0) + tree.purchased;
			}
			console.log(this.fruits);
		}
	}

    toJSON() {
        const json = Object.assign({}, this);
        delete json["bus"];
        return json;
    }

    static fromJSON(json) {
        const clicker = new ClickerModel();
        const clickerInstance = Object.assign(clicker, json);
        return clickerInstance;
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

	buyTree(name) {
		debugger
		if (!Object.keys(this.trees).includes(name)) {
			throw new Error(`Invalid tree name ${name}`);
		}
		if (this.clicks < 1000000) {
			return false;
		}
		this.clicks -= 1000000;
		this.trees[name].purchased += 1;
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
