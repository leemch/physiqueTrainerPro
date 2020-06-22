import isEmpty from "../validation/isEmpty"

import { SET_CURRENT_USER, SET_USER_AVATAR } from "../actions/types";


const initialState = {
	isAuthenticated: false,
	user: {}
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			}
			break;
		case SET_USER_AVATAR:
			return {
				...state,
				avatar: action.payload
			}
			break;
		default:
			return state;
			break;
	}
}