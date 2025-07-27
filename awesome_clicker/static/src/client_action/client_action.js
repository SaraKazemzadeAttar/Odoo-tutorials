import {registry} from "@web/core/registry";
import { Component , useState , useExternalListener, openClientAction} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import { useClicker } from "../clicker_hook"

export class ClientAction extends Component {
	static template = "awesome_clicker.client_action";
	static props = [];

    setup() {
        this.clicker = useClicker()
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);