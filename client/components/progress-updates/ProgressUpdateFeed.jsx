import React, {Component} from 'react';
import PropTypes from "prop-types";
import ProgressUpdateItem from "./ProgressUpdateItem.jsx";
import Calendar from "./Calendar.jsx";


class ProgressUpdateFeed extends Component {

	render(){
		const {progressUpdates} = this.props;
		return progressUpdates.map(progressUpdate => <ProgressUpdateItem key={progressUpdate._id} progressUpdate={progressUpdate} />);
		
	}

}



ProgressUpdateFeed.propTypes = {
	progressUpdates: PropTypes.array.isRequired
}

export default ProgressUpdateFeed;