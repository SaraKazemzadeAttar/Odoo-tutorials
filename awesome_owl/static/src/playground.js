/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {Card} from "./card/card";
import {useAutofocus} from "./TodoList/utils";

const {markup, xml} = owl;
import {Counter} from "./counter/counter";
import {TodoItem} from "./TodoList/todo_item";

export class Playground extends Component {
	static template = "awesome_owl.playground";
	static components = {Card, Counter, TodoItem};
	static props = {};

	setup() {
		this.state = useState({sum: 2})
		this.idCounter = 1;
		this.inputTodoRef = useAutofocus("inputTodo");
	}



	incrementSum() {
		this.state.sum++;
	}

	value1 = "<div>some text 1</div>";
	value2 = markup("<div>some text 2</div>");
	todos = useState([]);

	addTodo(ev) {
		if (ev.keyCode === 13) { // enter
			const value = ev.target.value.trim();
			if (value) {
				this.todos.push({id: this.idCounter++, description: value});
				ev.target.value = "";
			}
		}
	}

	toggleState(todoId) {
		const todo = this.todos.find(t => t.id === todoId);
		if (todo) {
			todo.isCompleted = !todo.isCompleted;
		}
	}

	removeTodo(todoId) {
		const todo_index = this.todos.findIndex((t) => t.id === todoId);
		if (todo_index >= 0) {
			this.todos.splice(todo_index, 1);
		}
	}
}