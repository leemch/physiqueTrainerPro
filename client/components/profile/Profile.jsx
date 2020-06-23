import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader.jsx";
import ProfileAbout from "./ProfileAbout.jsx";
import ProfileCreds from "./ProfileCreds.jsx";
import Spinner from "../common/Spinner.jsx";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {

	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.profile.profile === null && this.props.profile.loading) {
			this.props.history.push("/not-found");
		}
	}



	render() {
		const { profile, loading } = this.props.profile;
		let profileContent;

		if (profile === null || loading) {
			profileContent = <Spinner />
		} else {
			profileContent = (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/profiles" className="btn btn-light mb-3 flat-left">
								Back to profiles
							</Link>
						</div>
						<div className="col-md-6" />
					</div>
					<ProfileHeader profile={profile} />

					<div className="text-center mb-3 mt-2">
						<Link to={`/client_login/${profile.user._id}`}>
							<button className="btn btn-info mr-3" style={{ "width": "10rem", "height": "10rem" }}>
								Client Log in
									<h4 className="display-4">
									<i className="fa fa-sign-in"></i>
								</h4>
							</button>
						</Link>
						<Link to={`/client_register/${profile.handle}`}>
							<button className="btn btn-info mr-3" style={{ "width": "10rem", "height": "10rem" }}>
								Sign up with this trainer
									<h4 className="display-4">
									<i className="fa fa-users"></i>
								</h4>
							</button>
						</Link>
					</div>

					<ProfileAbout profile={profile} />
					{/* <ProfileCreds education={profile.education} experience={profile.experience} /> */}

				</div>
			)
		}

		return (
			<div className="profile">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{profileContent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Profile.propTypes = {
	getProfileByHandle: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);