const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProgressUpdateSchema = new Schema({
	client: {
		type: Schema.Types.ObjectId,
		ref: "clients"
	},
	notes: {
		type: String
	},
	macros:{
		fat: {
			type: String
		},
		protein: {
			type: String
		},
		carbs: {
			type: String
		}
	},
	weight: {
		type: String
	},
	photos:{
		type: Number
	},
	date: {
		type: Date,
		default: Date.now
	},
	comments: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: "users"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String,
			},
			avatar: {
				type: String
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	]
	
});

module.exports = ProgressUpdate = mongoose.model("progress_updates", ProgressUpdateSchema);