import {Component, useState} from "@odoo/owl";


export class TodoItem extends Component {
	static template = "awesome_owl.todo_item"
	static props = {
		todo: {
			type: Object,
			optional: false,
			validator: (todo) =>
				typeof todo.id === "number" &&
				typeof todo.description === "string" &&
				typeof todo.isCompleted === "boolean"
		},
		toggleState: Function,
		removeTodo: Function,
};
	onCheckboxChange(){
		this.props.toggleState(this.props.todo.id);
	}
	onRemoveClick(){
		this.props.removeTodo(this.props.todo.id);
	}
}
