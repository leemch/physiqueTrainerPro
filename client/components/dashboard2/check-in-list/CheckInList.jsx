import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import ClientItem from "./ClientItem";
import axios from "axios";
import SearchBox from "./SearchBox";
import MacroModal from "./MacroModal";
//import {Icon, Header} from "semantic-ui-react";




class CheckInList extends Component {


	state = {
		preps: [],
		searchBox: "",
		loading: true,
	}

	// componentDidMount() {
	// 	axios.get("/api/preps/")
	// 		.then(res => this.setState({
	// 			clients: res.data,
	// 			loading: false
	// 		})
	// 		)
	// 		.catch(err => console.error(err))
	// }

	// onSearchChange = event => {
	// 	this.setState({ searchBox: event.target.value });
	// }

	// filteredClients = () => {
	// 	const { searchBox } = this.state;
	// 	const { preps } = this.state;
	// 	return preps.filter(c => {
	// 		return c.client.name.toLowerCase().includes(searchBox.toLowerCase());
	// 	});
	// }

	// onClickMacroModal = () => {
	// 	this.setState({ macroModal: !this.state.macroModal });
	// }

	render() {
		const { preps, loading } = this.state;
		let prepItems;

		if (clients === null || loading) {
			clientItems = <Spinner />;
		} else {
			if (clients.length > 0) {

				clientItems = this.filteredClients().map(client => (
					<ClientItem key={client.client._id} client={client} id={client.client._id} />
				));
			} else {
				clientItems = <h4>No clients found...</h4>
			}
		}

		return (
			<div className="clients">
				<div className="container">
					<div className="row">
						<div className="col-md-12 mt-3">
							<SearchBox searchChange={this.onSearchChange} searchfield={this.state.searchBox} />
							{clientItems}

						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default CheckInList;