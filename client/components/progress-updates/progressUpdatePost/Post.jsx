import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm.jsx";
import CommentFeed from "./CommentFeed.jsx";

import MacroChart from './MacroChart.jsx'
import PhotoSlides from './PhotoSlides.jsx'
import ProgressDetails from './ProgressDetails.jsx'

import Spinner from "../../common/Spinner.jsx";
import { getProgressUpdate, getProgressPhotos } from "../../../actions/progressUpdateActions";
import Moment from "react-moment";


class Post extends Component {

	state = {
		protein: 0,
		carbs: 0,
		fat: 0,
		photos: []
	}

	componentDidMount() {
		//console.log(this.props.match.params.id);
		this.props.getProgressUpdate(this.props.match.params.id);

	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.progressUpdate.progressUpdate.macros !== prevProps.progressUpdate.progressUpdate.macros) {
			this.setState({
				protein: this.props.progressUpdate.progressUpdate.macros.protein,
				carbs: this.props.progressUpdate.progressUpdate.macros.carbs,
				fat: this.props.progressUpdate.progressUpdate.macros.fat
			})

			let stringToDate = new Date(this.props.progressUpdate.progressUpdate.date);
			const dd = String(stringToDate.getDate()).padStart(2, '0');
			const mm = String(stringToDate.getMonth() + 1).padStart(2, '0'); //January is 0!
			const yyyy = stringToDate.getFullYear();
			let progressDate = mm + '-' + dd + '-' + yyyy;

			console.log(progressDate);

			this.props.getProgressPhotos(this.props.progressUpdate.progressUpdate.client,
				progressDate,
				this.props.progressUpdate.progressUpdate.photos);
		}
	}

	render() {
		const { progressUpdate, photos, loading } = this.props.progressUpdate;
		let stringToDate = new Date(progressUpdate.date);
		const dd = String(stringToDate.getDate()).padStart(2, '0');
		const mm = String(stringToDate.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = stringToDate.getFullYear();
		let progressDate = yyyy + '-' + mm + '-' + dd;

		let postContent;

		if (progressUpdate === null || loading || Object.keys(progressUpdate).length === 0) {
			postContent = <Spinner />
		} else {
			postContent = (
				<div>
					<h1 className="display-4 text-center"> Check In Date: {progressDate}</h1>
					<h1 className="display-4 text-center"> Weigh in: {progressUpdate.weight}lbs</h1>
					<PhotoSlides photos={photos} />
					<ProgressDetails fat={this.state.fat} protein={this.state.protein} carbs={this.state.carbs} notes={progressUpdate.notes} />
					<CommentForm postId={progressUpdate._id} />
					<CommentFeed postId={progressUpdate._id} comments={progressUpdate.comments} />
				</div>
			)
		}


		return (
			<div className="post">
				<div className="container">
					<div className="row">
						<div className="col-md-12">



							<Link to={`/progress_feed/${progressUpdate.client}`} className="btn btn-light mb-3">
								Back to Calendar
							</Link>


							{postContent}






						</div>
					</div>
				</div>
			</div>
		)
	}
}


Post.propTypes = {
	progressUpdate: PropTypes.object.isRequired,
	getProgressUpdate: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	progressUpdate: state.progressUpdate
});

export default connect(mapStateToProps, { getProgressUpdate, getProgressPhotos })(Post);