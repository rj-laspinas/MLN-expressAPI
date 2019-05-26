const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VehicleSchema = new Schema({

	category: String,
	vehicleModel: String,
	plate: String,
	image: String,
	seatingCap: Number,
	isServiceable: {type: Boolean, default: true},
	onTrip: {type: Boolean, default: false},
	tripID: [String],

});

module.exports = mongoose.model("Vehicle", VehicleSchema);