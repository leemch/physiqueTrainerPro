const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create schema
const ClientSchema = new Schema({

	name:{
		type: String,
		required: true
	},

	email:{
		type: String,
		required: true
	},

	password:{
		type: String,
		required: true
	},

	avatar:{
		type: String,
	},

	date:{
		type: Date,
		default: Date.now
	},
	current_trainer: {
		type: Schema.Types.ObjectId,
	},
	new_updates: {
		type: Boolean,
		default: false
	},
	macros: {
		fat: {
			type: Number,
			default: 0
		},
		protein: {
			type: Number,
			default: 0
		},
		carbs: {
			type: Number,
			default: 0
		}
	},
	training: {
		monday: {
			type: String
		},
		tuesday: {
			type: String
		},
		wednesday: {
			type: String
		},
		thursday: {
			type: String
		},
		friday: {
			type: String
		},
		saturday: {
			type: String
		},
		sunday: {
			type: String
		}
	},
	personalRecords: {
		bench: {
			type: Number,
			default: 0
		},
		squat: {
			type: Number,
			default: 0
		},
		deadlift: {
			type: Number,
			default: 0
		}
	},
	meals: [
		{
			name: {
				type: String
			},
			description: {
				type: String
			}
		}
	]

});

module.exports = Client = mongoose.model("clients", ClientSchema);