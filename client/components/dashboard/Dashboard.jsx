import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, getProfileById, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner.jsx";
import axios from "axios";

import './dashboard.css';
import SideBar from './SideBar.jsx';

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
											<a href="#" className="btn btn-primary btn-block" data-toggle="modal" data-target="#addProgressModal">
												<i className="fas fa-plus"></i> Add Progress Update
										</a>
										</div>
										<div className="col-md-3">
											<a href="#" className="btn btn-success btn-block" data-toggle="modal" data-target="#clientListModal">
												<i className="fas fa-plus"></i> Client List
										</a>
										</div>
										<div className="col-md-3">
											<a href="#" className="btn btn-warning btn-block" data-toggle="modal" data-target="#inviteClientModal">
												<i className="fas fa-plus"></i> Invite Client
										</a>
										</div>
									</div>
								</div>
							</section>


							<section id="posts">
								<div className="container">
									<div className="row">
										<div className="col-md-9">
											<div className="card">
												<div className="card=header">
													<h4>Latest Posts</h4>
												</div>
												<table className="table table-striped">
													<thead className="thead-dark">
														<tr>
															<th>#</th>
															<th>Title</th>
															<th>Category</th>
															<th>Date</th>
															<th>#</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td>2</td>
															<td>Post two</td>
															<td>tech gadgets</td>
															<td>May 10</td>
															<td>
																<a href="details.html" className="btn btn-secondary">
																	<i className="fas fa-angle-double-right"></i> Details
															</a>
															</td>
														</tr>
														<tr>
															<td>1</td>
															<td>Post one</td>
															<td>Web dev</td>
															<td>May 10</td>
															<td>
																<a href="details.html" className="btn btn-secondary">
																	<i className="fas fa-angle-double-right"></i> Details
															</a>
															</td>
														</tr>
														<tr>
															<td>1</td>
															<td>Post one</td>
															<td>Web dev</td>
															<td>May 10</td>
															<td>
																<a href="details.html" className="btn btn-secondary">
																	<i className="fas fa-angle-double-right"></i> Details
															</a>
															</td>
														</tr>
														<tr>
															<td>1</td>
															<td>Post one</td>
															<td>Web dev</td>
															<td>May 10</td>
															<td>
																<a href="details.html" className="btn btn-secondary">
																	<i className="fas fa-angle-double-right"></i> Details
															</a>
															</td>
														</tr>
														<tr>
															<td>1</td>
															<td>Post one</td>
															<td>Web dev</td>
															<td>May 10</td>
															<td>
																<a href="details.html" className="btn btn-secondary">
																	<i className="fas fa-angle-double-right"></i> Details
															</a>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>

										<div className="col-md-3">
											<div className="card text-center bg-primary text-white mb-3">
												<div className="card-body">
													<h3>Posts</h3>
													<h4 className="display-4">
														<i className="fas fa-pencil-alt"></i> 6
												</h4>
													<a href="posts.html" className="btn btn-outline-light btn-sm">View</a>
												</div>
											</div>
											<div className="card text-center bg-success text-white mb-3">
												<div className="card-body">
													<h3>Categories</h3>
													<h4 className="display-4">
														<i className="fas fa-folder"></i> 4
												</h4>
													<a href="categories.html" className="btn btn-outline-light btn-sm">View</a>
												</div>
											</div>
											<div className="card text-center bg-warning text-white mb-3">
												<div className="card-body">
													<h3>Users</h3>
													<h4 className="display-4">
														<i className="fas fa-users"></i> 4
												</h4>
													<a href="users.html" className="btn btn-outline-light btn-sm">View</a>
												</div>
											</div>
										</div>


									</div>
								</div>

							</section>


							<div className="modal fade" id="addProgressModal">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header bg-primary text-white">
											<h5 className="modal-title">Add Post</h5>
											<button className="close" data-dismiss="modal">
												<span>&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<form>
												<div className="form-group">
													<label for="title">Title</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label for="category">Category</label>
													<select className="form-control">
														<option value="">Web Development</option>
														<option value="">Tech Gadgets</option>
														<option value="">Business</option>
														<option value="">Health & Wellness</option>
													</select>
												</div>
												<div className="form-group">
													<label for="image">Upload Images</label>
													<div className="custom-file">
														<input type="file" className="custom-file-input" id="image" />
														<label for="image" className="custom-file-label">Choose File</label>
													</div>
													<small className="form-text text-muted">Max Size 3mb </small>
												</div>
												<div className="form-group">
													<label for="body">Body</label>
													<textarea name="editor1" className="form-control"></textarea>
												</div>
											</form>
										</div>
										<div className="modal-footer">
											<button className="btn btn-success" data-dismiss="modal">Save Changes</button>
										</div>
									</div>
								</div>
							</div>


							<div className="modal fade" id="clientListModal">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header bg-success text-white">
											<h5 className="modal-title">Add Post</h5>
											<button className="close" data-dismiss="modal">
												<span>&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<form>
												<div className="form-group">
													<label for="title">Title</label>
													<input type="text" className="form-control" />
												</div>

											</form>
										</div>
										<div className="modal-footer">
											<button className="btn btn-primary" data-dismiss="modal">Save Changes</button>
										</div>
									</div>
								</div>
							</div>


							<div className="modal fade" id="inviteClientModal">
								<div className="modal-dialog modal-lg">
									<div className="modal-content">
										<div className="modal-header bg-warning text-white">
											<h5 className="modal-title">Invite Client</h5>
											<button className="close" data-dismiss="modal">
												<span>&times;</span>
											</button>
										</div>
										<div className="modal-body">
											<form>
												<div className="form-group">
													<label for="name">Name</label>
													<input type="text" className="form-control" />
												</div>
												<div className="form-group">
													<label for="email">Email</label>
													<input type="email" className="form-control" />
												</div>

											</form>
										</div>
										<div className="modal-footer">
											<button className="btn btn-warning" data-dismiss="modal">Save Changes</button>
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