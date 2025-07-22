/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {Card} from "./card/card";
const {markup, xml} = owl;
import {Counter} from "./counter/counter";
import {TodoItem} from "./TodoList/todo_item";

export class Playground extends Component {
	static template = "awesome_owl.playground";
	static components = {Card , Counter , TodoItem};
	static props = {};

	setup(){
		this.state = useState({sum: 2 })
	}
	incrementSum(){
		this.state.sum ++;
	}
	value1 = "<div>some text 1</div>";
	value2 = markup("<div>some text 2</div>");
	todos = useState([
			{id: 2, description: "write tutorial", isCompleted: true},
			{id: 3, description: "buy milk", isCompleted: false}
		])
}