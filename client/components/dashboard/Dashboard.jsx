import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, getProfileById, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner.jsx";
import DashboardActions from "./DashboardActions.jsx";
import Experience from "./Experience.jsx";
import Education from "./Education.jsx";
import ClientDashboard from "./ClientDashboard.jsx";

import ColoredBlock from "../common/ColoredBlock.jsx";

import ClientList from "./client-list/ClientList.jsx";
import axios from "axios";

//import {Header, Icon} from "semantic-ui-react";


class Dashboard extends Component {

	state = {
		photos: {}
	}


	componentDidMount() {

		if (this.props.user.isTrainer) {
			this.props.getCurrentProfile();
		}
	}

	onDeleteClick(event) {
		this.props.deleteAccount();
	}

	render() {
		const { isTrainer, name, avatar } = this.props.user;
		const { profile, loading } = this.props.profile;

		let dashboardContent;

		if (isTrainer) {
			if (profile === null || loading) {
				dashboardContent = <Spinner />;
			}
			else {
				// Check if logged in user has profile data
				if (Object.keys(profile).length > 0) {
					dashboardContent = (
						<div>						
							<div className="text-center">
								<img src={avatar} className="rounded-circle" alt="avatar" />
								<p className="lead text-muted text-center"> Welcome <Link to={'/profile/' + profile.handle}>{name} </Link></p>
								<DashboardActions />
							</div>
							<div className="text-center">
								<button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger" style={{ "width": "10rem", "height": "10rem" }}>
									Delete My Account
									<h4 className="display-4">
										<i className="fa fa-trash mr-1"></i>
									</h4>
								</button>
							</div>

							{/* <Experience experience={profile.experience} />
							<Education education={profile.education} /> */}
							{/* <ClientList /> */}

						</div>
					);
				}
				else {
					// User is logged in but has no profile
					dashboardContent = (
						<div>
							<p className="lead text-muted"> Welcome {name} </p>
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
			if (loading) {
				dashboardContent = <Spinner />;
			} else {
				dashboardContent = (
					<div>
						{<ClientDashboard profile={profile} />}

					</div>
				);
			}
		}

		return (

			<div className="dashboard">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<header id="main-header" className="py-2 bg-primary text-white rounded mb-4">
								<div className="container">
									<div className="row">
										<div className="col-md-6">
											<h1><i className=" fa fa-cog"></i> Dashboard</h1>
										</div>
									</div>
								</div>
							</header>
							{dashboardContent}

						</div>
					</div>
				</div>
			</div>


		)
	}


}

const mapStateToProps = state => ({
	profile: state.profile,
	user: state.auth.user
});

export default connect(mapStateToProps, { getCurrentProfile, getProfileById, deleteAccount })(Dashboard);