/** @odoo-module */
import { kanbanView } from "@web/views/kanban/kanban_view";
import { registery } from "@web/core/registry"
import { AwesomeKanbanController} from "./kanban_controller";

const awesomeKanbanController = {
	...kanbanView,
	Controller: AwesomeKanbanController,
}

registery.category("views").add("awesome_kanban", awesomeKanbanController)