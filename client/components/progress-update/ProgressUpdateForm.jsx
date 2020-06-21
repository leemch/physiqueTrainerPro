import React, { Component } from 'react';
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup.jsx";
import TextFieldGroup from "../common/TextFieldGroup.jsx";
import InputGroup from "../common/InputGroup.jsx";
//import {addPost} from "../../actions/postActions";
import PropTypes from "prop-types";

import { uploadImage, addProgressUpdate } from "../../actions/clientActions";
import axios from 'axios';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';


// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



class ProgressUpdateForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			photos: [],
			fat: "",
			protein: "",
			carbs: "",
			weight: "",
			notes: "",
			errors: {},
			files: [],
			success: false,
			imageUrl: ""
		}
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	}

	componentWillReceiveProps(newProps) {
		if (newProps.errors) {
			this.setState({
				errors: newProps.errors
			});
		}
	}

	onSubmit = e => {
		e.preventDefault();

	}


	handleInit() {
		console.log('FilePond instance has initialised', this.pond);
	}

	handleChange = (ev) => {
		this.setState({ success: false, url: "" });

	}

	onError = (error) => {
		debugger;
	}

	onSuccess = (uploadedImage) => {
		this.setState({ imageUrl: uploadImage });
		//debugger;
	}


	// Perform the upload
	handleUpload = (ev) => {

		ev.preventDefault();

		let files = this.state.files;
		console.log("Preparing the upload");


		// if (files) {
		// 	uploadImage(files)
		// 		.then((uploadedImage) => { this.onSuccess(uploadedImage) },
		// 			(error) => { this.onError(error) });
		// }


		const newProgress = {
			notes: this.state.notes,
			carbs: this.state.carbs,
			fat: this.state.fat,
			protein: this.state.protein,
			weight: this.state.weight,
			photos: this.state.files.length,
			images: this.state.files
		};

		this.props.addProgressUpdate(newProgress, this.props.history);
		this.setState({ text: "" });

	}



	render() {

		const { errors } = this.state;

		const success_message = () => (
			<div style={{ padding: 50 }}>
				<h3 style={{ color: 'green' }}>SUCCESSFUL UPLOAD</h3>
				<a href={this.state.url}>Access the file here</a>
				<br />
			</div>
		);
		console.log(this.props.auth.user.id);
		return (
			<div className="add-progress">
				<div className="container">
					<div className="row">
						<div className="col md-8 m-auto">
							<h1 className="display-4 text-center"> Add Progress Update</h1>
							<p className="lead text-center">
								Add info about your progress update.
							</p>
							<small className="d-block pb-3">* = required fields</small>

							<form onSubmit={this.handleUpload}>
								<div>

									<center>
										<h1>Upload your photos</h1>
										{this.state.success ? <success_message /> : null}
										<br />
									</center>

									<FilePond ref={ref => this.pond = ref}
										files={this.state.files}
										allowMultiple={true}
										maxFiles={5}
										//server="/api"
										oninit={() => this.handleInit()}
										onupdatefiles={(fileItems) => {
											// Set current file objects to this.state
											this.setState({
												files: fileItems.map(fileItem => fileItem.file)
											});
											console.log(this.state.files);
										}}>
									</FilePond>





									<InputGroup
										placeholder="Weight"
										name="weight"
										icon="fas fa-weight"
										value={this.state.weight}
										onChange={this.onChange}
										error={errors.weight}
									/>
									<InputGroup
										placeholder="Protein"
										name="protein"
										icon="fas fa-utensils"
										value={this.state.protein}
										onChange={this.onChange}
										error={errors.protein}
									/>
									<InputGroup
										placeholder="Fat"
										name="fat"
										icon="fas fa-utensils"
										value={this.state.fat}
										onChange={this.onChange}
										error={errors.fat}
									/>
									<InputGroup
										placeholder="Carbohydrates"
										name="carbs"
										icon="fas fa-utensils"
										value={this.state.carbs}
										onChange={this.onChange}
										error={errors.carbs}
									/>

									<TextAreaFieldGroup placeholder="Notes" name="notes" value={this.state.notes} onChange={this.onChange} error={errors.notes}
										info="Tell your trainer some details about this progress update." />

								</div>



								<input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
							</form>

						</div>
					</div>
				</div>

			</div>

		)
	}
}

ProgressUpdateForm.propTypes = {
	addProgressUpdate: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
});

export default connect(mapStateToProps, { addProgressUpdate })(ProgressUpdateForm);