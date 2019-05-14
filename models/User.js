const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({

	fname: String,
	lname: String,
	mobile: Number,
	email: String,
	password: String,

	city: String,
	barangay: String,
	gender: String,
	
	isAdmin: {type: Boolean, default: false},
	isActive: {type: Boolean, default: true},
	isVerified: {type: Boolean,	default: false}
});

module.exports = mongoose.model("User", UserSchema);
