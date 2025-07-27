/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {DashboardItem} from "./dashboard_item/dashboard_item";
import {PieChart} from "./piechart/piechart";
import {items} from "./dashboard_item/dashboard_items";
import {PieChartCard} from "./PieChartCard/piechart_card"
import {NumberCard} from "./NumberCard/number_card";
import {ConfigurationDialog} from "./configuration_dialog/configuration_dialog"
import { browser } from "@web/core/browser/browser";

export class AwesomeDashboard extends Component {
	static template = "awesome_dashboard.AwesomeDashboard";
	static components = {Layout, DashboardItem, PieChart,PieChartCard , NumberCard , ConfigurationDialog};

	setup() {
		this.action = useService("action");
	    this.dialog = useService("dialog");
		this.orm = useService("orm");
		debugger
		const service = useService("awesome_dashboard.statistics");
		this.statistics = useState(service.stats);
		this.items = registry.category("awesome_dashboard").getAll();
		this.state = useState({
		    disabledItems: [], // initially empty, loaded from server in loadUserSettings
		});
		this.loadUserSettings();

	}
	async loadUserSettings() {
	    try {
	        const disabledItemsStr = await this.orm.call('res.users', 'get_dashboard_disabled_items', []);
	        this.state.disabledItems = disabledItemsStr ? disabledItemsStr.split(",") : [];
	    } catch (e) {
	        console.error("Failed to load user dashboard settings", e);
	        this.state.disabledItems = [];
	    }
	}

	async saveUserSettings(newDisabledItems) {
	    try {
	        const disabledItemsStr = newDisabledItems.join(",");
	        await this.orm.call('res.users', 'set_dashboard_disabled_items', [disabledItemsStr]);
	    } catch (e) {
	        console.error("Failed to save user dashboard settings", e);
	    }
	}

	openConfiguration(){
		console.log("openConfiguration called");
        this.dialog.add(ConfigurationDialog, {
            items: this.items,
            disabledItems: this.state.disabledItems,
            onUpdateConfiguration: this.updateConfiguration.bind(this),
        })
	}

	updateConfiguration(newDisabledItems) {
	    this.state.disabledItems = newDisabledItems;
		this.saveUserSettings(newDisabledItems);
	}

	openCustomers() {
		this.action.doAction("base.action_partner_form");
	}


	openLeads() {
		this.action.doAction({
			type: "ir.actions.act_window",
			name: "Leads",
			res_model: "crm.lead",
			views: [
				[false, "list"],
				[false, "form"]
			],
			target: "current",
		});
	}

}

registry.category("lazy_components").add("AwesomeDashboard", AwesomeDashboard);