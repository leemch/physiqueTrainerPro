const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({

	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	isTrainer: {
		type: Boolean,
		default: true
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now
	},
	client_list: [
		{
			client: {
				type: Schema.Types.ObjectId,
				ref: "clients",
			}
		}
	]
	// client_list: [
	// 	{
	// 		type: Schema.Types.ObjectId,
	// 		ref: "clients",
	// 	}
	// ]

});

module.exports = User = mongoose.model("users", UserSchema);