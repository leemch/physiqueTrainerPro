import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentMacros, deleteAccount } from "../../actions/clientActions";
import ProfileHeader from '../profile/ProfileHeader.jsx'
import Spinner from "../common/Spinner.jsx";
import ProfileActions from "./DashboardActions.jsx";
import Experience from "./Experience.jsx";
import Education from "./Education.jsx";
import isEmpty from "../../validation/isEmpty"
import axios from "axios";


class Dashboard extends Component {

	state = {
		macros: {
			fat: 0,
			protein: 0,
			carbs: 0
		}
	}

	componentDidMount() {

		//console.log(this.props.getCurrentMacros(this.props.user.id));

		axios.get(`/api/clients/macros/${this.props.user.id}`)
			.then(res => {
				this.setState({
					macros: res.data
				});
			}
		)

	}

	render() {
		const { fat, protein, carbs } = this.state.macros;
		const { profile } = this.props;

		let dashboardContent;

		dashboardContent = (
			<div className="row">

				<div className="col-md-6">
					<h3 className="text-center text-info">Nutrition</h3>

					<div className="table-responsive">
						<table className="table table-striped table-lg table-bordered table-dark padding-4">
							<thead>
								<tr>
									<th>Macronutrients</th>
									<th>Goal</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Protein</td>
									<td>{protein}g</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Fat</td>
									<td>{fat}g</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Carbohydrates</td>
									<td>{carbs}g</td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Your calorie goal</td>
									<td>{(fat * 9) + (protein * 3) + (carbs * 3)} Calories</td>
								</tr>
							</tbody>

						</table>
					</div>

				</div>


				<div className="col-md-6">
					<h3 className="text-center text-info">Training</h3>

					<div className="table-responsive">
						<table className="table table-striped table-lg table-bordered table-dark padding-4">
							<tbody>
								<tr>
									<td>Calories to burn:</td>
									<td></td>
								</tr>
							</tbody>
							<tbody>
								<tr>
									<td>Strength goals:</td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
		);

		return (
			<div className="container">
				{/* <section id="actions" className="py-4 mb-4 bg-light">
					<div className="container">
						<div className="row">
							<div className="col-md-3">
								<a href="#" className="btn btn-light btn-block">
									<i className="fas fa-arrow-left"></i> Back to Dashboard
										</a>
							</div>
							<div className="col-md-3">
								<a href="#" className="btn btn-success btn-block">
									<i className="fas fa-check"></i> Save Changes
										</a>
							</div>
							<div className="col-md-3">
								<a href="#" className="btn btn-danger btn-block">
									<i className="fas fa-trash"></i> Delete Post
										</a>
							</div>
						</div>
					</div>
				</section> */}

				<div className="text-center mt-5">
					<Link className="btn btn-primary" to={`/progress_add/`}>
						<i className="fas fa-share-square fa-2x" aria-hidden="true"></i>
						Send Progress Update
					</Link>
				</div>

				{/* <section id="details">
							<div className="container">
								<div className="row">
									<div className="col">
										<div className="card">
											<div className="card-header">
												<h4>Edit Progress Update</h4>
											</div>
											<div className="card-body">
												<form>
													<div className="form-group">
														<label for="title">Title</label>
														<input type="text" className="form-control" value="Post One"/>
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
										</div>

									</div>
								</div>
							</div>
						</section> */}

				{dashboardContent}
			</div>
		)
	}


}

Dashboard.propTypes = {
	getCurrentMacros: PropTypes.func.isRequired,
	macros: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	macros: state.client.macros,
	user: state.auth.user
});

export default connect(mapStateToProps, { getCurrentMacros, deleteAccount })(Dashboard);