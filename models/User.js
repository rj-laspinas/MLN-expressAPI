const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	salutation: String,
	name: String,
	mobile: Number,
	email: String,
	password: String,
	
	isAdmin: { type: Boolean, default: false},
	isActive: {	type: Boolean, default: true},
	isVerified: {type: Boolean,	default: false}
})

module.exports = mongoose.model("User", UserSchema);
