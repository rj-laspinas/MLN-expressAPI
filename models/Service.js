const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
	category: String,
	name: String,
	subname: String,
	image: String,
	description: String,
	duration: String,
	price: Number,

	isActive: {type: Boolean, default: String},
	createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},
});

module.exports = mongoose.model("Service", ServiceSchema);
