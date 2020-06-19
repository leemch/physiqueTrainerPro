const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PrepsSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    },
    progress_updates: [
        {
            prep_id: {
                type: Schema.Types.ObjectId,
                ref: "preps"
            },
            notes: {
                type: String
            },
            macros: {
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
            photos: {
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
        }
    ]

});

module.exports = Preps = mongoose.model("preps", PrepsSchema);