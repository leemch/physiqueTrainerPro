import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {}

export default function(state = initialState, action) {
	switch(action.type){

		case GET_ERRORS:
		return action.payload;
		break;

		case CLEAR_ERRORS:
		return {};
		break;




		default:
			return state;
			break;
	}
}