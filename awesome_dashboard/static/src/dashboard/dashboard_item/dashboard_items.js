import { NumberCard } from "../NumberCard/number_card";
import { PieChartCard } from "../PieChartCard/piechart_card";

export const items = [
    {
        id: "average_quantity",
        description: "Average amount of t-shirt",
        Component: NumberCard,
        size: 3,
        props: (data) => ({
            title: "Average T-shirts per Order",
            value: data.avg_tshirt_per_order,
        }),
    },
    {
        id: "new_orders",
        description: "New orders count",
        Component: NumberCard,
        size: 3,
        props: (data) => ({
            title: "New Orders",
            value: data.new_orders,
        }),
    },
    {
        id: "cancelled_orders",
        description: "Cancelled orders",
        Component: NumberCard,
        size: 3,
        props: (data) => ({
            title: "Cancelled Orders",
            value: data.cancelled_orders,
        }),
    },
    {
    id: "orders_by_size",
    description: "Orders by size pie chart",
    Component: PieChartCard,
    size: 6,
    props: (data) => ({
        label: "Orders by T-shirt Size",
        data: data?.orders_by_size
    }),
    },
];
