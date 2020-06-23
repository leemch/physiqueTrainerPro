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

		axios.get(`/api/clients/macros/${this.props.user.id}`)
			.then(res => {
				this.setState({
					macros: res.data
				});
			})

	}

	render() {
		const { fat, protein, carbs } = this.state.macros;
		const { profile } = this.props;

		let dashboardContent;

		dashboardContent = (
			<div className="row">

				<div className="col-md-6 mx-auto">
					<h3 className="text-center text-info">Daily Nutrition Goals</h3>

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


				{/* <div className="col-md-6">
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
				</div> */}
			</div>
		);

		return (
			<div className="container">

				<div className="text-center mt-5">
					<Link to="/progress_add/">
						<button className="btn btn-success mr-3 mb-3" style={{ "width": "10rem", "height": "10rem" }}>
							Send Progress Update
									<h4 className="display-4">
								<i className="fa fa-share-square fa-2x"></i>
							</h4>
						</button>
					</Link>
					{dashboardContent}
				</div>

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