import {GET_PROFILE, GET_PROFILES, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_CLIENT_MACROS} from "../actions/types";


const initialState ={
	macros: {}
}
export default function(state = initialState, action){
	switch(action.type){
		case PROFILE_LOADING:
			return{
				...state,
				loading: true
			}

		case GET_CLIENT_MACROS:
		return{
			...state,
			macros: action.payload,
			loading: false
		}

		case CLEAR_CURRENT_PROFILE:
		return{
			...state,
			profile: null
		}

		case GET_PROFILES:
		return{
			...state,
			profiles: action.payload,
			loading: false
		}


		default:
		return state;
	}
}