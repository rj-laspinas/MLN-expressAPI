const express = require("express");
const router = express.Router();

const User = require('../models/User');
const Category = require('../models/Category');
const Location = require('../models/Location');
const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');

const stripe = require("stripe")("sk_test_F5uf0IKkq8YvZilGPZ4RMMR300TTwqK27j");

const moment = require("moment");


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------// BOOKING CRUD
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------// USERS CONTROLLER 
//	USER CONTROLLER
	//index
	//update - (email cannot be changed)
	router.put("/users/:id", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(user => {
			return res.json({
				"message": "Profile updated successfully",
				"user": User
			})
		})
		.catch(next)
	})

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// CATEGORIES CONTROLLER 
	//index

	router.get("/categories", (req, res, next) => {
		Category.find({})
		.then(categories => {
			return res.json(categories)
		})
		.catch(next)
	})

	//show
	router.get("/categories/:id", (req, res, next) => {
		Category.findById(req.params.id)
		.then(category => {
			return res.json(category)
		})
		.catch(next)
	})

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// LOCATION CONTROLLER 

	//index
	router.get("/locations", (req, res, next) => {
		Location.find({})
		.then(location => {
			return res.json(location)
		})
		.catch(next)
	})

	//show
	router.get("/locations/:id", (req, res, next) => {
		Location.findById(req.params.id)
		.then(location => {
			return res.json(location)
		})
		.catch(next)
	})
	
//------------------------------------------------------------------------------------------------
// VEHICLE CONTROLLER 

	//index
	router.get("/vehicles", (req, res, next) => {
		Vehicle.find({})
		.then(vehicles => {
			return res.json(vehicles)
		})
		.catch(next)
	})

	//SHOW
	router.get("/vehicles/:id", (req, res, next) => {
		Vehicle.findById(req.params.id)
		.then(vehicle => {
			return res.json(vehicle)
		})
		.catch(next)
	})

//------------------------------------------------------------------------------------------------
// BUS ROUTE CONTROLLER 

	//index
	router.get("/routes", (req, res, next) => {
		Routa.find({})
		.then(routas => {
			return res.json(routas)
		})
		.catch(next)
	})

	//SHOW
	router.get("/route/:id", (req, res, next) => {
		Routa.findById(req.params.id)
		.then(routa => {
			return res.json(routa)
		})
		.catch(next)
	})
	//-------------------------------------------------------------------------------------
// TRIP CONTROLLER 
	//index
	router.get("/trips", (req, res, next) => {
		Trip.find({})
		.then(trip => {
			return res.status(200).json(trip)
		})
		.catch(next)
	})

	//SHOW
	router.get("/trips/:id", (req, res, next) => {
		Trip.findById(req.params.id)
		.then(trip => {
			return res.json(trip)
		})
		.catch(next)
	})
// BOOKING CONTROLLER 

	//index
	router.get("/booking", (req, res, next) => {
		Booking.find({userId: req.user.id})
		.then(bookings => {
			Trip.find({})
			.then(trips =>{
				Vehicle.find({})
				.then( vehicles => {
					return res.json({
						bookings: bookings,
						trips: trips,
						vehicles: vehicles
					})
				})
			})
		})
		.catch(next)
	})

	//SHOW
	router.get("/booking/:id", (req, res, next) => {

		Booking.find({userId: req.user.id, _id: req.params.id})
		.then(booking => {
			Trip.findById(booking.tripId)
			.then(trip =>{
				Vehicle.findById(trip.vehicleId)
				.then( vehicle => {
					return res.json({
						booking: booking,
						trip: trip,
						vehicle: vehicle
					})
				})
			})
		})
		.catch(next)

	})

	// STORE
	router.post("/booking", (req, res, next) => {
		let tripId = req.body.tripId;
		let userId =  req.user._id;
		let quantity = req.body.quantity;

		// return res.json(req.body);
		if(!tripId || !userId || !quantity){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Trip.findById(tripId).then((trip, err) =>{
			// return res.json(trip.price)
			total = trip.price * quantity;
			if(err){
				return res.status(500).json({
					"error": "an error occured while querying the collection"
				})
			}


			if(trip.seats == 0) {
				return res.json({
					message : "Trips is already full, please select another trip",
					seats : trip.seats
				})
			} 

			if(trip.seats <= quantity){
				return res.json({
					message : "There are not enough seats on this trip, please review your booking",
					seats : trip.seats 
				})
			}

			//STRIPE CHARGE
			stripe.customers.create({
				email : req.user.email,
				description: req.user.fname + " " + req.user.lname +" has booked a trip from " + trip.origin + "-" + trip.destination + " departing on " + trip.startDate +".",
				source : "tok_amex"
			})
			.then(customer => {
				stripe.charges.create({
					amount : total * 100,
					currency: "php",
					source: customer.default_source,
					description:" Payment on trip from " + trip.origin + "-" + trip.destination + "departing on " + trip.startDate +".",
					customer: customer.id
				})
				.then(charges => {
					Booking.create({
						tripId : trip.id,
						userId : userId,
						quantity: quantity,
						amount: total,
						chargeId : charges.id,

						bookingDate : moment(),
					})
					.then(booking =>{
						
						trip.seats -= 1;
						trip.bookedPassengers.push(booking._id);
						trip.save();
						return res.json({
							message: "You have booked successfully, thank you for choosing MLN Expess",
							booking : booking
						})
					})
				})

			})


		}).catch(next)

	})

	router.delete("/booking/:id", (req, res, next) => {

		Booking.findById(req.params.id).then( booking => {
			
			User.findById(booking.userId).then(user => {
				if(user.isGuest == false){
					if(user._id != req.user._id){
						return res.json({
							message: "You are not allowed to cancel this trip."
						})
					}
				}
			})

			if(booking.isCancelled == true) {
				return res.json({
					message : "Booking has already been cancelled."
				})
			}

			Trip.findById(booking.tripId).then( trip => {
				if(moment().isSameOrAfter(moment(trip.startDate).add(4, 'h'), 'hour')){
					return res.status(422).json({
						message: "Trip cancellation 4 hours before before schedule is not allowed"
					})
				}

				// return res.json(trip)

				stripe.refunds.create({
					charge: booking.chargeId
				})
				.then(refund => {
					booking.isCancelled = true;
					booking.save();

					trip.seats += booking.quantity;
					trip.bookedPassengers.pull(req.params.id);
					trip.save();

					Booking.create({
						tripId: booking.tripId,
						userId: req.user._id,
						quantity: -booking.quantity,
						amount: -booking.amount,
						bookingDate: moment(),
						chargeId: refund.id,
						isCancelled: true,
						bookingType: "cancellation"
					})
					.then( booking => {
						return res.json({
							message: "You have successfully cancelled trip, refund will reflect in your account not later than 60 days"
						}).catch(next)
					}).catch(next)
				}).catch(next)
			}).catch(next)
		}).catch(next)
	})



	

	
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//error handling middleware
	router.use((err, req, res, next) => {
		res.status(422).send({
			error : err.message
		})
	})



module.exports = router;