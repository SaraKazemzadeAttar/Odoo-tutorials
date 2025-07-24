import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";

export const StatisticsService = {
    start() {
        return {
            loadStatistics: memoize(async () => {
                return await rpc("/awesome_dashboard/statistics");
            }),
        };
    },
};