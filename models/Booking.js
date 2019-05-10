const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({ ServiceId = String})

const CustomerSchema = new Schema({CustomerId = String})

// const PaymentSchema = new Schema ({ PaymentId = String})


const BookingSchema = new Schema({

	service: ServiceSchema,
	customer: UserSchema,
	date: Date,
	Status: String,
	refNo: String,
	UserRemarks: String,

	// paymentStatus
	timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }


})