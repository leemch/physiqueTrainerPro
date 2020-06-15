import {combineReducers} from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import clientReducer from "./clientReducer";
import trainerReducer from "./trainerReducer";
import progressUpdateReducer from "./progressUpdateReducer";

export default combineReducers({
	auth: authReducer,
	errors: errorReducer,
	profile: profileReducer,
	post: postReducer,
	client: clientReducer,
	trainer: trainerReducer,
	progressUpdate: progressUpdateReducer
});