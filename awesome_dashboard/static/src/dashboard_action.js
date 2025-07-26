import { registry } from "@web/core/registry";
import { LazyComponent } from "@web/core/lazy_component";

const LazyDashboard = LazyComponent.lazyLoad(
    () => import("@awesome_dashboard/dashboard/dashboard"),
    { bundle: "awesome_dashboard.dashboard", component: "awesome_dashboard.dashboard" }
);


registry.category("actions").add("awesome_dashboard.dashboard", LazyDashboard);
