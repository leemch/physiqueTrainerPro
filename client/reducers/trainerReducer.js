import {GET_CLIENT_LIST} from "../actions/types";


const initialState ={
    clients: [],
    searchBox: ""
}
export default function(state = initialState, action){
	switch(action.type){
		case GET_CLIENT_LIST:
			return{
				...state,
				clients: action.payload
			}



		default:
		return state;
	}
}