import { ADD_PROGRESS_UPDATE, GET_PROGRESS_UPDATES, PROGRESS_UPDATE_LOADING, DELETE_PROGRESS_UPDATE, GET_PROGRESS_UPDATE, GET_PROGRESS_PHOTOS } from "../actions/types";

const initialState = {
	progressUpdates: [],
	progressUpdate: {},
	photos: [],
	loading: false
}

export default function(state = initialState, action) {
	switch(action.type){

	case PROGRESS_UPDATE_LOADING:
	return {
		...state,
		loading: true
	}
	break;

	case GET_PROGRESS_UPDATES:
	return {
		...state,
		progressUpdates: action.payload,
		loading: false
	};
	break;

	case GET_PROGRESS_UPDATE:
	return {
		...state,
		progressUpdate: action.payload,
		loading: false
	};
	break;

	case GET_PROGRESS_PHOTOS:
		return {
			...state,
			photos: action.payload,
			loading: false
		};
		break;

	case ADD_PROGRESS_UPDATE:
		return{
			...state,
			progressUpdates: [action.payload, ...state.progressUpdates]
		};
		break;

	case DELETE_PROGRESS_UPDATE:
	return {
		...state,
		progressUpdates: state.progressUpdates.filter(progressUpdate => progressUpdate._id !== action.payload)
	}
	break;

	default:
		return state;
	}

	
}