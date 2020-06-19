import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import ProgressUpdateForm from "./ProgressUpdateForm.jsx";
import ProgressUpdateFeed from "./ProgressUpdateFeed.jsx";
import Spinner from "../common/Spinner.jsx";
import { getProgressUpdates } from "../../actions/progressUpdateActions";


class ProgressUpdates extends Component {


	componentDidMount(){
		if(this.props.match.params.client_id){
			this.props.getProgressUpdates(this.props.match.params.client_id);
		}
	}

	render(){

	const {progressUpdates, loading} = this.props.progressUpdate;
	let progressUpdateContent;

	if(progressUpdates === null || loading){
		progressUpdateContent = (<Spinner />);
	} else {
		progressUpdateContent = <ProgressUpdateFeed progressUpdates={progressUpdates} />;
	}

		return(
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{/* <ProgressUpdateForm /> */}
							{progressUpdateContent}
						
						</div>
						
					</div>
				</div>

			</div>
		)
	}
}

ProgressUpdates.propTypes = {
	progressUpdate: PropTypes.object.isRequired,
	getProgressUpdates: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	progressUpdate: state.progressUpdate
});

export default connect(mapStateToProps, {getProgressUpdates})(ProgressUpdates);