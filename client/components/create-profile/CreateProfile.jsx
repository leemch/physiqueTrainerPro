import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import InputGroup from "../common/InputGroup.jsx";
import SelectListGroup from "../common/SelectListGroup.jsx";
import {createProfile} from "../../actions/profileActions";

class CreateProfile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			displaySocialInputs: false,
			handle: "",
			company: "",
			website: "",
			location: "",
			services: "",
			bio: "",
			twitter: "",
			facebook: "",
			linkedin: "",
			youtube: "",
			instagram: "",
			errors: {}
		}

	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}

	onSubmit = (event) => {
		event.preventDefault();
		const profileData = {
			handle: this.state.handle,
			company: this.state.company,
			website: this.state.website,
			location: this.state.location,
			services: this.state.services,
			bio: this.state.bio,
			twitter: this.state.twitter,
			facebook: this.state.facebook,
			linkedin: this.state.linkedin,
			youtube: this.state.youtube,
			instagram: this.state.instagram
		}

		this.props.createProfile(profileData, this.props.history);
	}

	onChange = (event) => {
		this.setState({[event.target.name]: event.target.value});
	}



	render() {
		const {errors, displaySocialInputs} = this.state;

		let socialInputs;

		if(displaySocialInputs){
			socialInputs = (
				<div>
					<InputGroup 
						placeholder="Twitter Profile URL"
						name="twitter"
						icon="fab fa-twitter"
						value={this.state.twitter}
						onChange={this.onChange}
						error={errors.twitter}
					/>
					<InputGroup 
						placeholder="Facebook Profile URL"
						name="facebook"
						icon="fab fa-facebook"
						value={this.state.facebook}
						onChange={this.onChange}
						error={errors.facebook}
					/>
					<InputGroup 
						placeholder="Linkedin Profile URL"
						name="linkedin"
						icon="fab fa-linkedin"
						value={this.state.linkedin}
						onChange={this.onChange}
						error={errors.linkedin}
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

		// Select options for status
		/*const options = [{label: "* Select Professional Status", value: 0},
			{label: "Developer", value: "Developer"},
			{label: "Personal Trainer", value: "Personal Trainer"},
			{label: "Online Trainer", value: "Online Trainer"},
			{label: "Athlete", value: "Athlete"}
		];
		*/

		return(

			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col md-8 m-auto">
							<h1 className="display-4 text-center"> Create your Profile</h1>
							<p className="lead text-center">
								Let's get some information to make your profile
							</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.onSubmit}>

								<TextFieldGroup placeholder = "* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle}
								info="A unique handle for your profile URL. Your full name, company name, nickname" />

								<TextFieldGroup placeholder = "Company" name="company" value={this.state.company} onChange={this.onChange} error={errors.company}
								info="Could be your own company or one you work for" />

								<TextFieldGroup placeholder = "Website" name="website" value={this.state.website} onChange={this.onChange} error={errors.website}
								info="Could be your own or a company website" />

								<TextFieldGroup placeholder = "Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location}
								info="City & state suggested (eg. Boston, MA)" />

								<TextFieldGroup placeholder = "* Services" name="services" value={this.state.services} onChange={this.onChange} error={errors.services}
								info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)" />

								<TextAreaFieldGroup placeholder = "Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio}
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
	profile: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
	profile: state.profile,
	errors: state.errors
});

export default connect(mapStateToProps, {createProfile})(withRouter(CreateProfile));