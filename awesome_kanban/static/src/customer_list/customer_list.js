import {Component, onWillStart, useState} from "@odoo/owl";
import {useService} from "@web/core/utils/hooks";
import {KeepLast} from "@web/core/utils/concurrency";
import {fuzzyLookup} from "@web/core/utils/search";

export class CustomerList extends Component {
	static template = "awesome_kanban.CustomerList";
	static props = {
		selectCustomer: {
			type: Function,
		},
	};

	setup() {
		this.orm = useService("orm");
		this.keepLast = new KeepLast();
		this.partners = useState({data: []});
		this.displayedPartners = useState({data: []});
		this.filterName = ""; // for search bar
		onWillStart(async () => {
			this.partners.data = await this.loadCustomers([]);
		})
	}

	async onChangeActiveCustomers(ev) {
		const checked = ev.target.checked; //Gets whether the checkbox is on or off
		const domain = checked ? [["opportunity_ids", "!=", false]] : [];
		this.partners.data = await this.keepLast.add(this.loadCustomers(domain));
		this.displayedPartners.data = this.partners.data;
		this.filterCustomers(this.filterName);
	}

	loadCustomers(domain) {
		return this.orm.searchRead("res.partner", domain, ["display_name"]);
	}

	// This function connects the user typing to the filtering logic.
	onCustomerFilter(ev){
		this.filterName = ev.target.value;
        this.filterCustomers(ev.target.value);
	}

	filterCustomers(name) {
		if (name) {
			this.displayedPartners.data = fuzzyLookup(
				name,
				this.partners.data,
				(partner) => partner.display_name
			);
		} else {
			this.displayedPartners.data = this.partners.data;
		}
	}
}