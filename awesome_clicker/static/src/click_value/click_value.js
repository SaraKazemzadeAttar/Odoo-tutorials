import {registry} from "@web/core/registry";
import { Component } from "@odoo/owl";
import { humanNumber } from "@web/core/utils/numbers";
import {useClicker} from "../clicker_hook";

export class ClickValue extends Component {
	static template = "awesome_clicker.ClickValue";

	setup() {
		this.clicker = useClicker()
	}

	get humanized_counter() {
		return humanNumber(this.clicker.state.clicker, {
			decimals: 1,
		});
	}

}