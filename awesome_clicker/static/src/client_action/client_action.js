import {registry} from "@web/core/registry";
import { Component , useState , useExternalListener, openClientAction} from "@odoo/owl";

export class ClientAction extends Component {
	static template = "awesome_clicker.client_action";
	static props = [];

}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);