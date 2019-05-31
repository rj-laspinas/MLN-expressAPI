const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const UserSchema = new Schema({UserId : String});


// const PaymentSchema = new Schema ({ PaymentId = String})


const BookingSchema = new Schema({

	tripId: String,
	userId: String,
	quantity: Number,
	amount: Number,
	bookingDate: Date,
	chargeId: String,
	
	isCancelled: {type: Boolean, default: false},
	bookingType: {type: String, default: "booking"}, //booking or cancellation
	paymentType: {type: String, default: "stripe"},

	// createAt: {type: Date, default: moment()},
	updatedAt: {type: Date, default: moment()},
	// paymentStatus
	// timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
	// locationType: String,
	// city: String,
	// barangay: String,
	// addressline: String,
	// userDirections: String,

	// userPreferences: String,
	// paymentType: String,


});

module.exports = mongoose.model('Booking', BookingSchema);