import { registry } from "@web/core/registry";
import { ClickerModel } from "../clicker_model";
import { browser } from "@web/core/browser/browser";

export const ClickerService = {
    dependencies: ["effect", "action", "notification"],

    start(env) {
        const localState = JSON.parse(browser.localStorage.getItem("clickerState"));
        const clicker_model = localState ? ClickerModel.fromJSON(localState): new ClickerModel();
        const effect = env.services.effect;
        const action = env.services.action;
        const notification = env.services.notification;

		document.addEventListener("click", () => clicker_model.addClick(), true);

		clicker_model.bus.addEventListener("MILESTONE", (event) => {
		    const milestone = event.detail;
		    const unlockFeature = milestone.unlock;

		    effect.add({
		        type: "rainbow_man",
		        message: `Milestone reached! You unlocked ${unlockFeature}!`,
		    });
		});



        clicker_model.bus.addEventListener("REWARD", (ev) => {
			debugger
            const reward = ev.detail;
			if (!reward || !reward.description || typeof reward.apply !== "function") {
				console.warn("Invalid reward:");
				return;
			}
			console.log("Reward received:", ev.detail?.description);
            const closeNotif = notification.add(
                `🎁 Congrats! You won a reward: "${reward.description}"`,
                {
                    type: "success",
                    sticky: true,
                    buttons: [
                        {
                            name: "Collect",
                            onClick: () => {
                                reward.apply(clicker_model);
                                closeNotif();
                                action.doAction({
                                    type: "ir.actions.client",
                                    tag: "awesome_clicker.client_action",
                                    target: "new",
                                    name: "Clicker Game",
                                });
                            },
                        },
                    ],
                }
            );
        });

		setInterval(() => {
            clicker_model.tick();
        }, 10000);

		setInterval(() => {
            browser.localStorage.setItem("clickerState", JSON.stringify(clicker_model))
        }, 10000);

        return clicker_model;
    },
};

registry.category("services").add("awesome_clicker.clicker", ClickerService);
