import { Component, useState} from "@odoo/owl";


export class TodoList extends Component {
	setup() {
	   this.myRef = useRef('inputTodo');
	   onMounted(() => {
	      console.log(this.myRef.el);
		  this.myRef.el.focus();
	   });
	}
}
