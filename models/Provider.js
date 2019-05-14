const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProviderSchema = new Schema({

	name: String,
	mobile: Number,
	email: String,
	password: String,
	sex: String,
	
	region: String,
	city: String,
	Barangay: String,
	addressline: String,

	
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
	userComment: String,

	bank: String,
	accountNo: Number,
	
	isAdmin: { type: Boolean, default: false},
	isActive: {	type: Boolean, default: true},
	isVerified: {type: Boolean,	default: false}
});

module.exports = mongoose.model("Provider", ProviderSchema);
