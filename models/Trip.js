const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({bookingId : String});

const TripSchema = new Schema({
	
	
	vehicleId : String,
	price: Number,

	origin: String,
	destination: String,
	startDate: Date,
	endDate: Date,
	startTime: Date,
	endTime: Date,
	duration: String,
	bookingId: [BookingSchema],

	// isWeekly: {type: Boolean, default: false}, button to create weekly trip
	isFull: {type: Boolean, default: false},
	isCompleted: {type: Boolean, default: false},

	createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},


});

module.exports = mongoose.model("Trip", TripSchema);
