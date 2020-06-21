import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import InputGroup from "../common/InputGroup.jsx";
import SelectListGroup from "../common/SelectListGroup.jsx";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/isEmpty";

class CreateProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			location: "",
			services: "",
			bio: "",
			facebook: "",
			youtube: "",
			instagram: "",
			errors: {}
		}

	}

	componentDidMount() {

		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}

		if (nextProps.profile.profile) {
			const profile = nextProps.profile.profile;
			// Bring services array back to CSV
			const servicesCSV = profile.services.join(",");

			// If profile field doesnt exist, make empty string
			profile.signupcode = !isEmpty(profile.signupcode) ? profile.signupcode : "";
			profile.website = !isEmpty(profile.website) ? profile.website : "";
			profile.location = !isEmpty(profile.location) ? profile.location : "";
			profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : "";
			profile.bio = !isEmpty(profile.bio) ? profile.bio : "";

			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
			profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
			profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";

			// Set component fields state
			this.setState({
				handle: profile.handle,
				website: profile.website,
				location: profile.location,
				services: servicesCSV,
				bio: profile.bio,
				facebook: profile.facebook,
				youtube: profile.youtube,
				instagram: profile.instagram
			});

		}


	}

	onSubmit = (event) => {
		event.preventDefault();
		const profileData = {
			handle: this.state.handle,
			website: this.state.website,
			location: this.state.location,
			services: this.state.services,
			bio: this.state.bio,
			facebook: this.state.facebook,
			youtube: this.state.youtube,
			instagram: this.state.instagram

		}

		this.props.createProfile(profileData, this.props.history);
	}

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}



	render() {
		const { errors, displaySocialInputs } = this.state;

		let socialInputs;

		if (displaySocialInputs) {
			socialInputs = (
				<div>
					<InputGroup
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup
						placeholder="Youtube Profile URL"
						name="youtube"
						icon="fab fa-youtube"
						value={this.state.youtube}
						onChange={this.onChange}
						error={errors.youtube}
					/>
					<InputGroup
						placeholder="Instagram Profile URL"
						name="instagram"
						icon="fab fa-instagram"
						value={this.state.instagram}
						onChange={this.onChange}
						error={errors.instagram}
					/>
				</div>
			);
		}



		return (

			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col md-8 m-auto">
							<Link to="/dashboard" className="btn btn-light">
								Go Back
						 </Link>
							<h1 className="display-4 text-center"> Edit Profile</h1>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>

								<TextFieldGroup placeholder="* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle}
									info="A unique handle for your profile URL. Your full name, company name, nickname" />


								<TextFieldGroup placeholder="Website" name="website" value={this.state.website} onChange={this.onChange} error={errors.website}
									info="Could be your own or a company website" />

								<TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location}
									info="City & state suggested (eg. Boston, MA)" />

								<TextFieldGroup placeholder="* Services" name="services" value={this.state.services} onChange={this.onChange} error={errors.services}
									info="List your services separated by commas (eg. Meal plans,Macro Coaching,Training programs, Show prep)" />

								<TextAreaFieldGroup placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio}
									info="Tell your clients a little bit about yourself" />

								<div className="mb-3">
									<button
										type="button"
										onClick={() => {
											this.setState(prevState => ({
												displaySocialInputs: !prevState.displaySocialInputs
											}))
										}} className="btn btn-light">
										Add Social Network Links
									</button>
									<span className="text-muted">Optional</span>
								</div>
								{socialInputs}
								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>

						</div>
					</div>
				</div>

			</div>

		);

	}
}

CreateProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));