import axios from "axios";

import { ADD_PROGRESS_UPDATE, GET_ERRORS, GET_PROGRESS_UPDATES, GET_PROGRESS_PHOTOS, PROGRESS_UPDATE_LOADING, DELETE_PROGRESS_UPDATE, GET_PROGRESS_UPDATE, CLEAR_ERRORS } from "./types";

//Add progress update
export const addProgressUpdate = (progressData, history) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/progress_updates/`, progressData)
	.then(res => {
		history.push("/dashboard");
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
	dispatch(clearErrors());
	axios.post("/api/profile", profileData)
	.then(result => history.push("/dashboard"))
	.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}


//Add photo
export const addPhoto = (progressData) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/progress_updates/`, progressData)
	.then(res => {
		dispatch({
			type: ADD_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};


//Add like
export const addLike = id => dispatch => {
	axios.post(`/api/posts/like/${id}`)
	.then(res => {
		//dispatch(getPosts());
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Remove like
export const removeLike = id => dispatch => {
	axios.post(`/api/posts/unlike/${id}`)
	.then(res => {
		//dispatch(getPr());
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Delete progress update
export const deleteProgressUpdate = id => dispatch => {
	axios.delete(`/api/posts/${id}`)
	.then(res => {
		dispatch({
			type: DELETE_PROGRESS_UPDATE,
			payload: id
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};


//Get progress updates
export const getProgressUpdates = (clientId) => dispatch => {
	dispatch(setProgressUpdateLoading());
	axios.get(`/api/progress_updates/all/${clientId}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATES,
			payload: res.data
		});
	})
	.catch(err => dispatch({
			type: GET_PROGRESS_UPDATES,
			payload: null
		})
	);
};

//Get progress update
export const getProgressUpdate = (id) => dispatch => {
	dispatch(setProgressUpdateLoading());
	axios.get(`/api/progress_updates/${id}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_PROGRESS_UPDATE,
			payload: null
		})
	);
};

//Get progress signed urls of photos
export const getProgressPhotos = (client_id, date, num_photos) => dispatch => {
	//dispatch(setProgressUpdateLoading());
	axios.get(`/api/progress_updates/photos/${client_id}/${date}/${num_photos}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_PHOTOS,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_PROGRESS_PHOTOS,
			payload: null
		})
	);
};




//Add comment
export const addComment = (progressUpdateId, commentData) => dispatch => {
	dispatch(clearErrors());
	axios.post(`/api/progress_updates/comment/${progressUpdateId}`, commentData)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

//Delete comment
export const deleteComment = (progressUpdateId, commentId) => dispatch => {
	axios.delete(`/api/progress_updates/comment/${progressUpdateId}/${commentId}`)
	.then(res => {
		dispatch({
			type: GET_PROGRESS_UPDATE,
			payload: res.data
		})
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};

// Set loading state
export const setProgressUpdateLoading = () => {
	return {
		type: PROGRESS_UPDATE_LOADING
	}
};

// Clear errors
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	}
};