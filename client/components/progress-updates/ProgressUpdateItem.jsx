import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classnames from "classnames";
import {Link} from "react-router-dom";
import {deleteProgressUpdate, addLike, removeLike} from "../../actions/progressUpdateActions";


class ProgressUpdateItem extends Component {



	render(){
		const {progressUpdate, auth, showActions} = this.props;
		return(
			<div className="card card-body mb-3">
              <div className="row">
							<p className="lead">{progressUpdate.date}</p>
                <div className="col-md-2">
                  <br />
                  <p className="text-center">Fat: {progressUpdate.macros.fat}</p>
									<p className="text-center">Protein: {progressUpdate.macros.protein}</p>
									<p className="text-center">Carbs: {progressUpdate.macros.carbs}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{progressUpdate.notes}</p>

                </div>
              </div>
            </div>
		)
	}
}

ProgressUpdateItem.defaultProps = {
	showActions: true
}

ProgressUpdateItem.propTypes = {
	progressUpdate: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteProgressUpdate: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, {deleteProgressUpdate,})(ProgressUpdateItem);