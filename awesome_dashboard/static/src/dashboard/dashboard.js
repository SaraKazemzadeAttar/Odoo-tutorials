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

export class AwesomeDashboard extends Component {
	static template = "awesome_dashboard.AwesomeDashboard";
	static components = {Layout, DashboardItem, PieChart,PieChartCard , NumberCard};

	setup() {
		this.action = useService("action");
		debugger
		const service = useService("awesome_dashboard.statistics");
		this.state = useState(service.stats);
		this.items = registry.category("awesome_dashboard").getAll();
	}

	openSettings() {
		this.action.doAction("base_setup.action_general_configuration")
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