import { Component } from "@odoo/owl";

export class Dashboard_item extends Component{
	static template = "awesome_dashboard.item";
	static props = {
		size: {type: Number , default: 1}
	}
}