import axios from "axios";

import {GET_CLIENT_LIST, SET_CLIENT_MACROS, GET_ERRORS} from "./types";

// Get current profile
export const getCurrentClients = () => dispatch => {
	axios.get("/api/users/clients")
	.then(res => 
		dispatch({
			type: GET_CLIENT_LIST,
			payload: res.data
		})
	)
	.catch(err => 
		dispatch({
			type: GET_CLIENT_LIST,
			payload: {}
		})
	)
}

// Set Client Macros
export const setClientMacros = (client_id, macros) => dispatch => {
	axios.post(`/api/users/macros/${client_id}`, macros)
	.then(res => 
		alert("Daily macro goals were set successfully!")
	)
	.catch(err => {
		alert("Failed to set macros.")
	})
	
}