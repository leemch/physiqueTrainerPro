import axios from "axios";

import {GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES, GET_CLIENT_MACROS} from "./types";


// Get current macros
export const getCurrentMacros = (client_id) => dispatch => {
	//dispatch(setProfileLoading());
	axios.get(`/api/clients/macros/${client_id}`)
	.then(res => {
			return res.data;
		}
	)
}

// Get current profile
export const getCurrentProfile = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get("/api/profile")
	.then(res => 
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_PROFILE,
			payload: {}
		})
	)
}

// Get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
	dispatch(setProfileLoading());
	axios.get(`/api/profile/handle/${handle}`)
	.then(res => 
		dispatch({
			type: GET_PROFILE,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_PROFILE,
			payload: null
		})
	)
}

// Get all profiles
export const getProfiles = () => dispatch => {
	dispatch(setProfileLoading());
	axios.get("/api/profile/all")
	.then(res => 
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_PROFILES,
			payload: {}
		})
	)
}

// Add Experience
export const addExperience = (expData, history) => dispatch => {
	axios.post("/api/profile/experience", expData)
	.then(res => history.push("/dashboard"))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};


// upload image
export const uploadImage = (images) => {

	const formData = new FormData();
	images.map(img =>  formData.append('image', img) );
	//formData.append('Content-Type', 'image/jpeg');
	//formData.append('image', images);

	return axios.post('/api/image-upload/upload-multiple', formData)
	.then(json => {
		return json.data.imageUpload;
	}).catch(({response}) => Promise.reject(response.data.errors));
};

//Add progress update
export const addProgressUpdate = (progressData, history) => dispatch => {
	//dispatch(clearErrors());

	const formData = new FormData();
	progressData.images.map(img =>  formData.append('image', img) );

	axios.post(`/api/progress_updates/`, progressData, formData)
	.then(res => {
		history.push("/dashboard");
	})
	.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
	);
};



// Add Education
export const addEducation = (eduData, history) => dispatch => {
	axios.post("/api/profile/education", eduData)
	.then(res => history.push("/dashboard"))
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};

// Delete Experience
export const deleteExperience = (id) => dispatch => {
	axios.delete(`/api/profile/experience/${id}`)
	.then(res => 
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};

// Delete Education
export const deleteEducation = (id) => dispatch => {
	axios.delete(`/api/profile/education/${id}`)
	.then(res => 
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
	.catch(err => dispatch({
		type: GET_ERRORS,
		payload: err.response.data
	}));
};

// Delete account
export const deleteAccount = () => dispatch => {
	if(window.confirm("Are you sure?  This can NOT be undone")) {
		axios.delete("/api/profile")
		.then(res => {
			dispatch({
				type:SET_CURRENT_USER,
				payload: {}
			});
		})
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
	}
}

// Create profile
export const createProfile = (profileData, history) => (dispatch) => {
	axios.post("/api/profile", profileData)
	.then(result => history.push("/dashboard"))
	.catch(err => dispatch({type: GET_ERRORS, payload: err.response.data}));
}





//  Profile loading
export const setProfileLoading = () => {
	return{
		type: PROFILE_LOADING
	}
}

//  Clear Profile
export const clearCurrentProfile = () => {
	return{
		type: CLEAR_CURRENT_PROFILE
	}
}

// Get Photos
export const getPhotos = (id, date, num) => {
	axios.get(`/api/progress_updates/photos/${id}/${date}/${num}`)
	.then(result => {return result})
}

