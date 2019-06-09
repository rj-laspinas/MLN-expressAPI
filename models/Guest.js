const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GuestSchema = new Schema({

	userId: String,
	tripId: String,
	email: String
	
});

module.exports = mongoose.model("Guest", GuestSchema);