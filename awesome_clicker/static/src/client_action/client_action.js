import {registry} from "@web/core/registry";
import { Component , useState , useExternalListener, openClientAction} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";

export class ClientAction extends Component {
	static template = "awesome_clicker.client_action";
	static props = [];

    setup() {
        this.clickService = useState(useService("awesome_clicker.clicker"));
    }
}

registry.category("actions").add("awesome_clicker.client_action", ClientAction);