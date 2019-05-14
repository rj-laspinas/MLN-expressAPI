const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
	category: String,
	name: String,
	subname: String,
	description: String,
	duration: Number,
	timeslots: [String],
	price: Number,
	isActive: {type: Boolean, default: String}
});

module.exports = mongoose.model("Service", ServiceSchema);
