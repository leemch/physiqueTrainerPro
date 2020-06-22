import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER, SET_USER_AVATAR } from "./types";


// Register User
export const registerUser = (userData, history) => dispatch => {
	axios.post("/api/users/register", userData)
		.then(res => history.push("/dashboard"))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
		);
};

// Register Client with trainer by Id
export const registerClientById = (userData, trainerId, history) => dispatch => {
	axios.post(`/api/users/client_register/${trainerId}`, userData)
		.then(res => history.push("/dashboard"))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
		);
};


// Register Client By handle
export const registerClientByHandle = (userData, trainerHandle, history) => dispatch => {
	axios.post(`/api/users/client_register/${trainerHandle}`, userData)
		.then(res => history.push("/dashboard"))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		})
		);
};

// Login -Get User token
export const loginUser = (userData) => (dispatch) => {
	axios.post("/api/users/login", userData)
		.then(res => {
			// Save to local storage
			const { token } = res.data;
			// Set token to local storage
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));



		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
};

// ClientLogin - Clients logs into a specified trainers page - Get User token
export const LoginClient = (clientData, trainerId) => (dispatch) => {
	axios.post(`/api/users/client_login/${trainerId}`, clientData)
		.then(res => {
			// Save to local storage
			const { token } = res.data;
			// Set token to local storage
			localStorage.setItem("jwtToken", token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		)
};

export const getProfilePicture = () => (dispatch) => {
	axios.get(`/api/users/avatar`)
		.then(res => {
			dispatch(setAvatar(res.data));
		})
		.catch(err => {
			console.log(err);
		})
}


// Set users avatar
export const setAvatar = (src) => {
	return {
		type: SET_USER_AVATAR,
		payload: src
	}
}

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}

// Log user out
export const logoutUser = () => dispatch => {
	// Remove token from localStorage
	localStorage.removeItem("jwtToken");
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to { } which will also set isAuthenticated to false
	dispatch(setCurrentUser({}));
}


export const uploadProfilePicture = (img, cb) => dispatch => {
	const formData = new FormData();
	formData.append('image', img);
	//dispatch(setAvatar(""));
	axios.post('/api/image-upload/profile', formData)
		.then(result => {
			dispatch(setAvatar(result.data.url));
			if (cb) {
				cb();
			}
		}).catch(err => console.log(err));
}