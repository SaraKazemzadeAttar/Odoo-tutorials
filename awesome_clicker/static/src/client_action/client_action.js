import {registry} from "@web/core/registry";
import { Component , useState , useExternalListener, openClientAction} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import { useClicker } from "../clicker_hook"
import { ClickValue} from "../clicker_value/click_value";

export class ClientAction extends Component {
	static template = "awesome_clicker.client_action";
	static props = ["*"];
	static components= {ClickValue}

    setup() {
        this.clicker = useClicker()
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);