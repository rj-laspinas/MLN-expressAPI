const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
	salutation: String,
	name: String,
	mobile: Number,
	email: String,
	password: String,
	sex: String,
	currentAddress: String,
	permanentAddress: String,
	workExperience: String,
	skills: String,
	maritalStatus: String,
	birthdate: Date,
	photo: String,
	id1: String,
	id2: String,
	facebook: String,
	category: String, /*Applying for {Service Category}*/


	userRating: Number,
	bank: String,
	accountNo: Number,
	
	isAdmin: { type: Boolean, default: false},
	isActive: {	type: Boolean, default: true},
	isVerified: {type: Boolean,	default: false}
})

module.exports = mongoose.model("Provider", ProviderSchema);
