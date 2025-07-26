import { Component } from "@odoo/owl";
import {PieChart} from "../piechart/piechart";

export class PieChartCard extends Component{
	static template = "awesome_dashboard.PieChartCard";
	static components = {PieChart};
	static props = {
		size: {type: Number , default: 1},
		slots: {
			type: Object,
			shape: {default: true},
		},
	}
}