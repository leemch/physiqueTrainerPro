import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, getProfileById, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner.jsx";
import axios from "axios";
import SearchBox from "./check-in-list/SearchBox.jsx";
import TextFieldGroup from "../common/TextFieldGroup.jsx"

import './dashboard.css';

class Dashboard extends Component {

	state = {
		photos: {}
	}


	componentDidMount() {

		if (this.props.auth.user.isTrainer) {
			this.props.getCurrentProfile();
			const id = '5c980b03602eba1d149749df';
			const date = '07-18-2019';
			const num = 1;
			axios.get(`/api/progress_updates/photos/${id}/${date}/${num}`)
				.then(result => { this.setState({ photos: result.data }) });
		}
		else {
			this.props.getProfileById(this.props.auth.user.current_trainer);
		}
	}

	onDeleteClick(event) {
		this.props.deleteAccount();
	}

	render() {
		const { user } = this.props.auth;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if (user.isTrainer) {
			if (profile === null || loading) {
				dashboardContent = <Spinner />;
			}
			else {
				// Check if logged in user has profile data
				if (Object.keys(profile).length > 0) {
					dashboardContent = (
						<div>
							<section id="actions" className="py-4 mb-4 bg-light">
								<div className="container">
									<div className="row">
										<div className="col-md-3">
											<a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addPrepModal">
												<i className="fas fa-plus"></i> Start New Prep Module
											</a>
										</div>
									</div>
								</div>
							</section>


							<section id="preps">

								<div className="container">
									<div className="row">
										<div className="col-md-12 mt-3">
											<SearchBox searchChange={this.onSearchChange} searchfield={this.state.searchBox} />
											<div className="card card-body bg-light mb-3 shadow-lg">
												<div className="row">
													<div className="col-md-2 col-sm-12">
														<img src="https://via.placeholder.com/150" className="rounded-circle" alt="avatar" style={{ "width": "100px" }} />
													</div>
													<div className="col-lg-6 col-md-4 col-8">
														<h3>Lee Mchale</h3>

														<div>
															<form className="form-inline">
																<input value="786fedg98saefuserg" type="text" readonly className="form-control form-control-lg mr-3" />
																<button className="btn-lg btn-info">
																	Copy Link
																</button>
																<Link to={`/progress_updates`} className="btn-lg btn-info">
																	View Check Ins
																</Link>
															</form>
															<small className="form-text text-muted">Share this link with your client so they can send their check ins.</small>
														</div>

													</div>

												</div>
											</div>
										</div>
									</div>
								</div>

							</section>


							<div className="modal fade" id="addPrepModal">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header bg-primary text-white">
											<h5 className="modal-title">Add Prep Module</h5>
											<button className="close" data-dismiss="modal">
												<span>&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<form>
												<div className="form-group">
													<label for="title">Clients Name</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label for="category">Start Date</label>{' '}
													<input type="date" id="startDate" name="startDate" />
												</div>
												<div className="form-group">
													<label for="category">End Date</label>{' '}
													<input type="date" id="endDate" name="endDate" />
												</div>
												{/* <div className="form-group">
													<label for="image">Upload Images</label>
													<div className="custom-file">
														<input type="file" className="custom-file-input" id="image" />
														<label for="image" className="custom-file-label">Choose File</label>
													</div>
													<small className="form-text text-muted">Max Size 3mb </small>
												</div> */}
												<div className="form-group">
													<label for="body">Other Notes</label>
													<textarea name="other" className="form-control"></textarea>
												</div>
											</form>
										</div>
										<div className="modal-footer">
											<button className="btn btn-success" data-dismiss="modal">Create</button>
										</div>
									</div>
								</div>
							</div>
						</div>



					);
				}
				else {
					// User is logged in but has no profile
					dashboardContent = (
						<div>
							<p className="lead text-muted"> Welcome {user.name} </p>
							<p>You have not yet set up a profile, please add some info</p>
							<Link to="/create-profile" className="btn btn-lg btn-info">
								Create Profile
							</Link>
						</div>
					);
				}
			}
		}
		else {
			if (profile === null || loading) {
				dashboardContent = <Spinner />;
			} else {
				dashboardContent = (
					<div>
						sdfasdfawsrf

					</div>
				);
			}
		}

		return (

			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<header id="main-header" className="py-2 bg-primary text-white rounded">
								<div className="container">
									<div className="row">
										<div className="col-md-6">
											<h1><i className=" fas fa-cog"></i> Dashboard</h1>
										</div>
									</div>
								</div>
							</header>
							{dashboardContent}
							{/* <div style={{ marginBottom: "60px" }} />
							<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger"> Delete my Account</button>
							<Link to="/client_list" className="btn btn-success">My Clients</Link> */}

						</div>
					</div>
				</div>
			</div>

		)
	}


}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	getProfileById: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile,
	auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileById, deleteAccount })(Dashboard);