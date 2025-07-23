import { Component , useState } from "@odoo/owl"

export class Card extends Component {
	static template = "awesome_owl.card";
	static props = {
		title: {
			type: String,
			optional: false
		},
		content: {
			type: String,
			optional: true
		},
		slots: {
			type: Object,
			shape: {default: true},
		},
	};

	setup() {
		console.log("Card props:", this.props);
		this.state = useState({ isOpen: true})
	}

	toggle() {
		this.state.isOpen = !this.state.isOpen;
	}
}

