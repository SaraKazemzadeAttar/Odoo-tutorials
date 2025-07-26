import { registry } from "@web/core/registry";

class HelloWorld extends Component {

}

registry.category("systray").add("myAddon.myItem", {
    Component: HelloWorld,
});