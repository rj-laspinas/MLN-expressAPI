const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const DestinationSchema = new Schema({DestinationId : String});

const BusRouteSchema = new Schema({
	
	name: String,
	origin: String,
	destination: String,
	isActive: {type: Boolean, default: true},

	createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},
});

module.exports = mongoose.model("BusRoute", BusRouteSchema);
