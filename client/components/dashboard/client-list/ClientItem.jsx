import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import isEmpty from "../../../validation/isEmpty";
import TextFieldGroup from "../../common/TextFieldGroup.jsx";
import {setClientMacros} from "../../../actions/trainerActions";






class ClientItem extends Component {


	constructor() {
		super();
		this.state = {
			fat: 0,
			protein: 0,
			carbs: 0
		}

	}


	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}

	setCurrentMacros = (client) => {

		const newMacros = {
			fat: this.state.fat.toString(),
			protein: this.state.protein.toString(),
			carbs: this.state.carbs.toString()
		}
		console.log(this.props.id);
		this.props.setClientMacros(client.client._id, newMacros);

	}

	loadMacros = (client_id) => {
		
	}



	render() {
		const {client} = this.props;


		return(
			<div className="card card-body bg-light mb-3 shadow-lg">
				<div className="row">
					<div className="col-2">
						<img src={client.client.avatar} className="rounded-circle" alt="avatar" />
					</div>
					<div className="col-lg-6 col-md-4 col-8">
						<h3>{client.client.name}</h3>
						{/* <Link to={`/client/${client.handle}`} className="btn btn-info">
							Manage Client
						</Link> */}
						<button type="button" className="btn btn-primary mr-3" data-toggle="modal" data-target={`#exampleModalCenter${client.client._id}`}>Set macros</button>
						<Link to={`/progress_feed/${client.client._id}`} type="button" className="btn btn-primary">View Progress Updates</Link>

{/* ////////////////////////////////////////// */}
						{/* <!-- Modal --> */}
						<div className="modal fade" id={`exampleModalCenter${client.client._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
						<div className="modal-dialog modal-dialog-centered" role="document">
							<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalCenterTitle">Set Client Macros</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								Fat: <TextFieldGroup onChange={this.onChange} value={this.state.fat} placeholder="Fat macro" info="grams" name="fat" type="number" />
								Protein: <TextFieldGroup onChange={this.onChange} value={this.state.protein} placeholder="Protein macro" info="grams" name="protein" type="number" />
								Carbohydrates: <TextFieldGroup onChange={this.onChange} value={this.state.carbs} placeholder="Carbohydrate macro" info="grams" name="carbs" type="number" />
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" onClick={() => this.setCurrentMacros(client)} className="btn btn-primary">Save macros</button>
							</div>
							</div>
						</div>
						</div>
						{/* ////////////////////////// */}

					</div>
					<div className="col-md-4 d-none d-md-block">
							<h4>Updates</h4>
										<i className="fa fa-check pr-1" />
										New progress update available.
						</div>

				</div>

			</div>
		)
	}

}

export default connect(null, {setClientMacros})(ClientItem);