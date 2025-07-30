import {registry} from "@web/core/registry";
import {Component, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {ClientAction} from "../client_action/client_action";
import { useClicker } from "../clicker_hook"
import {ClickValue} from "../click_value/click_value";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";

class ClickerSystray extends Component {
	static template = "awesome_clicker.ClickerSystray";
	static props = {};
	static components = {ClientAction , ClickValue ,Dropdown, DropdownItem}

	setup() {
		this.action = useService("action")
		this.clicker = useClicker();

	}

	increment() {
		this.clicker += 9;
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
	get numberTrees() {
        let sum = 0;
        for (const tree in this.clicker.trees) {
            sum += this.clicker.trees[tree].purchased;
        }
        return sum;
    }


    get numberFruits() {
        let sum = 0;
        for (const fruit in this.clicker.fruits) {
            sum += this.clicker.fruits[fruit];
        }
        return sum;
    }
}

export const systrayItem = {
	Component: ClickerSystray
}
registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, {sequence: 1000})