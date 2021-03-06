const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
// const ProviderSchema = new Schema({ProviderID : String});
const UserSchema = new Schema({

	fname: String,
	lname: String,
	mobile: String,
	email: String,
	password: String,

	
	isAdmin: {type: Boolean, default: false},
	isActive: {type: Boolean, default: true},
	isGuest: {type: String,	default: "false"},
	

	// isProvider: {type: Boolean,	default: false},
	// Profile: [ProviderSchema],

	createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},
});

module.exports = mongoose.model("User", UserSchema);
