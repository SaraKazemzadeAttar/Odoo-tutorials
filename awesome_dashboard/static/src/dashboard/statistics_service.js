import {rpc} from "@web/core/network/rpc";
import {reactive} from "@odoo/owl";
import {registry} from "@web/core/registry";

export const StatisticsService = {
	start() {
		const stats = reactive({
			new_orders: 10,
			total_amount: 0,
			avg_tshirt_per_order: 0,
			cancelled_orders: 0,
			avg_processing_time: "",
			orders_by_size: {}
		});

		async function fetchStatistics() {
			const result = await rpc("/awesome_dashboard/statistics");
			console.log(stats.new_orders)
			stats.new_orders = result.nb_new_orders;
			stats.total_amount = result.total_amount;
			stats.avg_tshirt_per_order = result.average_quantity;
			stats.cancelled_orders = result.nb_cancelled_orders;
			stats.avg_processing_time = result.average_time;
			stats.orders_by_size = result.orders_by_size;
		}

		debugger
		fetchStatistics();
		// setInterval(fetchStatistics, 10000);

		return {
			stats,
		};
	},
};
registry.category("services").add("awesome_dashboard.statistics", StatisticsService);
