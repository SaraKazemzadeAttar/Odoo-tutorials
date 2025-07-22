/** @odoo-module **/

import {Component, useState} from "@odoo/owl";
import {Counter} from "./counter/counter";
import {Card} from "./card/card";
const {markup, xml} = owl;

export class Playground extends Component {
	static template = "awesome_owl.playground";
	static components = {Card};
	static props = {};

	value1 = "<div>some text 1</div>";
	value2 = markup("<div>some text 2</div>");
}