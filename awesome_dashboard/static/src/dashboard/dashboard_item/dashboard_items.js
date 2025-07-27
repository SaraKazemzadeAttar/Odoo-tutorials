import { NumberCard } from "../NumberCard/number_card";
import { PieChartCard } from "../PieChartCard/piechart_card";
import {registry} from "@web/core/registry";
import {_t} from "@web/core/l10n/translation";
const items = [
    {
        id: "average_quantity",
        description: "Average amount of t-shirt",
        Component: NumberCard,
        size: 3,
        props: (data) => ({
            title: _t("Average T-shirts per Order"),
            value: data.avg_tshirt_per_order,
        }),
    },
    {
        id: "new_orders",
        description: "New orders count",
        Component: NumberCard,
        size: 3,
        props: (data) => ({
            title:  _t("New Orders"),
            value: data.new_orders,
        }),
    },
    {
        id: "cancelled_orders",
        description: "Cancelled orders",
        Component: NumberCard,
        size: 3,
        props: (data) => ({
            title:  _t("Cancelled Orders"),
            value: data.cancelled_orders,
        }),
    },
    {
    id: "orders_by_size",
    description: "Orders by size pie chart",
    Component: PieChartCard,
    size: 6,
    props: (data) => ({
        label:  _t("Orders by T-shirt Size"),
        data: data?.orders_by_size
    }),
    },
];

items.forEach(item => {registry.category("awesome_dashboard").add(item.id, item);});