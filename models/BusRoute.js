const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const DestinationSchema = new Schema({DestinationId : String});

const BusRouteSchema = new Schema({
	
	name: String,
	from: DestinationSchema,
	to: DestinationSchema,

	createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},
});

module.exports = mongoose.model("BusRoute", BusRouteSchema);
