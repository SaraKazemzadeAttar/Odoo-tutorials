import {Component, useState} from "@odoo/owl";
import { Dialog } from "@web/core/dialog/dialog";
import { CheckBox } from "@web/core/checkbox/checkbox";
import { browser } from "@web/core/browser/browser";

export class ConfigurationDialog extends Component{
	static components ={Dialog , CheckBox };
	static props = {
	  close: Function,
	  items: Array,
	  disabledItems: Array,
	  onUpdateConfiguration: Function,
	  slots: {
	    type: Object,
	    shape: { default: true },
	  },
	};
	static template = "awesome_dashboard.ConfigurationDialog";

	setup(){
		this.items = useState(this.props.items.map((item) => {
            return { ...item, enabled: !this.props.disabledItems.includes(item.id),
            }
        }));
	}

    done() {
        this.props.close();
    }

	onChange(checked,changedItem){
		changedItem.enabled = checked;
        const newDisabledItems = Object.values(this.items).filter(
            (item) => !item.enabled
        ).map((item) => item.id)

        browser.localStorage.setItem(
			"disabledDashboardItems",
            newDisabledItems,
        );
        this.props.onUpdateConfiguration(newDisabledItems);
	}
}