import {registry} from "@web/core/registry";
import { Component , useState , useExternalListener, openClientAction} from "@odoo/owl";
import { useClicker } from "../clicker_hook"
import { ClickValue} from "../click_value/click_value";
import { Notebook } from "@web/core/notebook/notebook";

export class ClientAction extends Component {
	static template = "awesome_clicker.client_action";
	static props = ["*"];
	static components= {ClickValue, Notebook}

    setup() {
        this.clicker = useClicker()
	    this.state = this.clicker.state;
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);