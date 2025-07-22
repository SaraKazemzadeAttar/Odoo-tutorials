/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {Card} from "./card/card";
const {markup, xml} = owl;
import {Counter} from "./counter/counter";

export class Playground extends Component {
	static template = "awesome_owl.playground";
	static components = {Card , Counter};
	static props = {};

	setup(){
		this.state = useState({sum: 2 })
	}
	incrementSum(){
		this.state.sum ++;
	}
	value1 = "<div>some text 1</div>";
	value2 = markup("<div>some text 2</div>");
}