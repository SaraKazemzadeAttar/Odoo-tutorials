import {registry} from "@web/core/registry";
import {Component, useExternalListener, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {ClientAction} from "../client_action/client_action";

class ClickerSystray extends Component {
	static template = "awesome_clicker.ClickerSystray";
	static props = {};
	static components = {ClientAction}

	setup() {
		this.state = useState({counter: 0});
		this.action = useService("action")
		useExternalListener(document.body, "click", () => this.state.counter++, true);
	}

	increment() {
		this.state.counter += 9;
	}

	openClientAction() {
		this.action.doAction({
				type: "ir.actions.client",
				tag: "awesome_clicker.client_action",
				target: "new",
				name: "Clicker"
			}
		)
	}
}

export const systrayItem = {
	Component: ClickerSystray
}
registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, {sequence: 1000})