const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({ServiceId : String});

const UserSchema = new Schema({UserId : String});

const StatusSchema = new Schema({StatusId : String});

const ProviderScehma = new Schema({ProviderId : String});

// const PaymentSchema = new Schema ({ PaymentId = String})


const BookingSchema = new Schema({

	service: [ServiceSchema],
	customer: [UserSchema],
	provider: [ProviderScehma],
	date: Date,
	timeslot: String,
	status: [StatusSchema],
	refNo: String,

	locationType: String,

	city: String,
	barangay: String,
	addressline: String,

	UserRemarks: String,
	PaymentType: String,


	// paymentStatus
	// timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }


});

module.exports = mongoose.model('Booking', BookingSchema);