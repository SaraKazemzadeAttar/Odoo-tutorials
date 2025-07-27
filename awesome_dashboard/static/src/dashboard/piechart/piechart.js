import { loadJS } from "@web/core/assets";
import { Component, onMounted, onWillStart, onWillUnmount, useRef } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import {_t} from "@web/core/l10n/translation";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        label: String,
        data: Object,
    };

    setup() {
        this.canvasRef = useRef("canvas");
        this.action = useService("action");

        onWillStart(() => loadJS("/web/static/lib/Chart/Chart.js"));

        onMounted(() => {
            this.renderChart();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

	onSliceClick(sizeLabel) {
		this.action.doAction({
		    type: "ir.actions.act_window",
		    name: _t("Orders of size %s", sizeLabel),
		    res_model: "sale.order",
		    view_mode: "form",
		    views: [[false, "form"]],
		    domain: [["tshirt_size", "=", sizeLabel]],
		});
	}


    renderChart() {
        const rawData = this.props.data || {};

        const labels = Object.keys(rawData); // like ['S', 'M', 'L']
        const data = Object.values(rawData);

        const niceColors = [
            "#60A5FA", "#F87171", "#34D399", "#FBBF24", "#A78BFA",
            "#FB7185", "#F472B6", "#38BDF8", "#4ADE80", "#FCD34D",
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
                }],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: this.props.label,
                        color: "#1F2937",
                        font: { size: 18, weight: "bold" },
                        padding: { top: 10, bottom: 20 },
                    },
                    legend: {
                        position: "bottom",
                        labels: {
                            color: "#4B5563",
                            font: { size: 14 },
                        },
                    },
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const label = labels[index];
                        this.onSliceClick(label);
                    }
                },
            },
        });
    }
}
