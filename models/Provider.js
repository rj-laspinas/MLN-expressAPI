const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const ProviderSchema = new Schema({
	
	fname: String,
	lname: String,
	gender: String,
	mobile: Number,
	email: String,
	
	region: String,
	city: String,
	Barangay: String,
	addressline: String,

	workExperience: [{type: String, default: ""}],
	skills: [{type: String, default: ""}],
	maritalStatus: [{type: String, default: ""}],
	birthdate: [{type: String, default: ""}],
	photo: [{type: String, default: ""}],
	// // id1: {type: String, default: ""},
	// // id2: {type: String, default: ""},
	// facebook: {type: String, default: ""},
	category: {type: String, default: ""}, /*Applying for {Service Category}*/
	userRating: [{type: Number, default: 0}], //push additional ratings
	userComment: [{type: String, default: ""}],

	// bank: String,
	// accountNo: Number,
	isVerified: {type: Boolean,	default: false},
	isAvailable: {type: Boolean,	default: false},

	createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},
	
});

module.exports = mongoose.model("Provider", ProviderSchema);
