import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import PostsForm from "./PostsForm.jsx";
import PostFeed from "./PostFeed.jsx";
import Spinner from "../common/Spinner.jsx";
import { getPosts } from "../../actions/postActions";


class Posts extends Component {


	componentDidMount(){
		this.props.getPosts();
	}

	render(){

	const {posts, loading} = this.props.post;
	let postContent;

	if(posts === null || loading){
		postContent = (<Spinner />);
	} else {
		postContent = <PostFeed posts={posts} />;
	}

		return(
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostsForm />
							{postContent}
						
						</div>
						
					</div>
				</div>

			</div>
		)
	}
}

Posts.propTypes = {
	post: PropTypes.object.isRequired,
	getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts);