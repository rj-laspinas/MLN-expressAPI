const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
	category: String,
	name: String,
	subname: String,
	description: String,
	duration: Number,
	price: Number,
	isActive: {type: Boolean, default: String}
})

module.exports = mongoose.model("Service", ServiceSchema);
