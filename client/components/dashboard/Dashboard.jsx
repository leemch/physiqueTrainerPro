import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, getProfileById, deleteAccount } from "../../actions/profileActions";
import { uploadProfilePicture } from "../../actions/authActions";
import Spinner from "../common/Spinner.jsx";
import DashboardActions from "./DashboardActions.jsx";
import Experience from "./Experience.jsx";
import Education from "./Education.jsx";
import ClientDashboard from "./ClientDashboard.jsx";
import ColoredBlock from "../common/ColoredBlock.jsx";
import AvatarEditor from "react-avatar-editor";

class Dashboard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			previewImage: "",
			croppedImage: "",
			blob: "",
			uploadCroppedImage: "",
			metaData: {
				contentType: "image/jpeg"
			},
			avatar: ""
		}
	}

	componentDidMount() {
		if (this.props.user.isTrainer) {
			this.props.getCurrentProfile();
			this.setState({ avatar: this.props.user.avatar });
		}
	}

	onDeleteClick(event) {
		this.props.deleteAccount();
	}


	handleImageChange = (event) => {
		this.setState({ previewImage: event.target.files[0] });
	}

	handleCropImage = () => {
		if (this.avatarEditor) {
			this.avatarEditor.getImageScaledToCanvas().toBlob(blob => {
				let imageFile = new File([blob], this.state.previewImage.name)
				let imageUrl = URL.createObjectURL(blob);
				this.setState({
					croppedImage: imageUrl,
					blob: imageFile
				});
			});
		}
	}

	uploadCroppedImage = () => {
		this.props.uploadProfilePicture(this.state.blob, () => { this.setState({ avatar: this.state.croppedImage }) });
	}

	render() {
		const { isTrainer, name, avatar } = this.props.user;
		const { profile, loading } = this.props.profile;
		const { previewImage, croppedImage, blob } = this.state;

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
								<p className="lead text-muted text-center display-4"> Welcome <Link to={'/profile/' + profile.handle}>{name} </Link></p>
								<img src={this.state.avatar ? this.state.avatar : "https://physique-trainer-pro.s3.ca-central-1.amazonaws.com/blank_profile.png"} className="rounded-circle mb-4" alt="avatar" />
								<div className="mb-4">
									<label>Change profile picture: </label>
									<input
										type="file"
										label="New Avatar"
										name="previewImage"
										onChange={this.handleImageChange}
									/>
									<div>
										{previewImage && (
											<AvatarEditor
												image={previewImage}
												width={120}
												height={120}
												border={50}
												scale={2.0}
												ref={node => (this.avatarEditor = node)}
											/>
										)}
										{croppedImage && (
											<img
												style={{ margin: "3.5em auto" }}
												width={100}
												height={100}
												src={croppedImage}
											/>
										)}
										<div>
											{croppedImage && <button color="green" onClick={this.uploadCroppedImage}>
												<i name="save" /> Save
                            </button>}

											{previewImage && <button color="green" onClick={this.handleCropImage}>
												<i name="image" /> Preview
                            		</button>}
											{previewImage && <button color="red" onClick={this.closeModal}>
												<i name="remove" /> Cancel
                            		</button>}
										</div>

									</div>

								</div>

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

export default connect(mapStateToProps, { getCurrentProfile, getProfileById, deleteAccount, uploadProfilePicture })(Dashboard);