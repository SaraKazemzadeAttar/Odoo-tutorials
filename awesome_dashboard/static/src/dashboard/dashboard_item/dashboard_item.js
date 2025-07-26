import { Component } from "@odoo/owl";

export class DashboardItem extends Component{
	static template = "awesome_dashboard.item";
	static props = {
		size: {type: Number , default: 1},
		slots: {
			type: Object,
			shape: {default: true},
		},
	}
}