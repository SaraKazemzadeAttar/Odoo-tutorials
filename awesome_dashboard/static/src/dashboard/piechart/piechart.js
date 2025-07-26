import {loadJS} from "@web/core/assets";
import {Component, onMounted, onWillStart, onWillUnmount, useRef} from "@odoo/owl";

export class PieChart extends Component {
	static template = "awesome_dashboard.PieChart";
	static props = {
		label: String,
		data: Object,
	};

	setup() {
		this.canvasRef = useRef("canvas");
		onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));
		onMounted(() => {
			this.renderChart();
		});
		onWillUnmount(() => {
			this.chart.destroy();
		});
	}

	renderChart() {
		const labels = Object.keys(this.props.data); // like ['s', 'm', 'xl']
		const data = Object.values(this.props.data);
		const niceColors = [
			"#60A5FA", // blue-400
			"#F87171", // red-400
			"#34D399", // green-400
			"#FBBF24", // yellow-400
			"#A78BFA", // purple-400
			"#FB7185", // pink-400
			"#F472B6", // fuchsia-400
			"#38BDF8", // sky-400
			"#4ADE80", // emerald-400
			"#FCD34D", // amber-300
		];

		const color = labels.map((_, i) => niceColors[i % niceColors.length]);

		this.chart = new Chart(this.canvasRef.el, {
			type: "pie",
			data: {
				labels: labels,
				datasets: [{
					label: this.props.label,
					data: data,
					backgroundColor: color,
				},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "bottom",
						labels: {
							color: "#4B5563",
							font: {size: 14}
						},
					},
				},
			}

		})
	}
}