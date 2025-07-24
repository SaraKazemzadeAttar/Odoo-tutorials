/** @odoo-module **/

import {Component, onWillStart, useState} from "@odoo/owl";
import {registry} from "@web/core/registry";
import {Layout} from "@web/search/layout";
import {useService} from "@web/core/utils/hooks";
import {DashboardItem} from "../dashboard_item/dashboard_item";
import {rpc} from "@web/core/network/rpc";

export class AwesomeDashboard extends Component {
	static template = "awesome_dashboard.AwesomeDashboard";
	static components = {Layout, DashboardItem};

	setup() {
		this.action = useService("action");

		this.state = useState({
			stats: {
				new_orders: 0,
				total_amount: 0,
				avg_tshirt_per_order: 0,
				cancelled_orders: 0,
				avg_processing_time: "",
			},
		});

		onWillStart(async () => {
			const result = await rpc("/awesome_dashboard/statistics");

			this.state.stats = {
				new_orders: result.nb_new_orders,
				total_amount: result.total_amount,
				avg_tshirt_per_order: result.average_quantity,
				cancelled_orders: result.nb_cancelled_orders,
				avg_processing_time: result.average_time,
			};
		});
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

	items_list = []
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);
