const express = require("express");
const router = express.Router();

const User = require('../models/User');
const Category = require('../models/Category');
const Location = require('../models/Location');
const Vehicle = require('../models/Vehicle');
const Routa = require("../models/Routa");
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');

const moment = require("moment");

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


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// BOOKING CRUD

// booking CONTROLLER 

	//index
	router.get("/booking", (req, res, next) => {
		Booking.find({})
		.then(bookings => {
			return res.json(bookings)
		})
		.catch(next)
	})

	//SHOW
	router.get("/booking/:id", (req, res, next) => {
		Booking.findById(req.params.id)
		.then(booking => {
			return res.json(booking)
		})
		.catch(next)
	})

	// STORE
	router.post("/booking", (req, res, next) => {
		let tripId = req.body.tripId;
		let userId = req.body.userId;
		let quantity = req.body.quantity;
		let fname = req.body.guestdeails.fname;
		let lname = req.body.guestdeails.lname;
		let mobile = req.body.guestdeails.mobile;
		let email = req.body.guestdeails.email;

		if(!tripId || !fname || !lname || !mobile || !email || !quantity){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

	// 	Booking.find({"tripId" : tripId, "userId": userId}).then(function(vehicle, err){
	// 		if(err){
	// 			return res.status(500).json({
	// 				"error": "an error occured while querying the collection"
	// 			})
	// 		}

	// 		if(Booking.length > 0){
	// 			return res.status(500).json({
	// 				"error": "Booking already exists"
	// 			})
	// 		}


	// 		newBooking.save(function(err){
	// 		if(!err){
	// 			return res.json({
	// 				"message" : "New booking added to fleet"
	// 			})
	// 		}
	// 	})

	// })
			
	// })

	

	// //UPDATE
	// router.put("/booking/:id", (req, res, next) => {
	// 	Booking.findByIdAndUpdate(req.params.id, req.body, {new: true})
	// 	.then(vehicle => {
	// 		return res.json({
	// 			"message": "Entry updated successfully",
	// 			"booking": booking
	// 		})
	// 	})
	// 	.catch(next)
	// })



//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//error handling middleware
	router.use((err, req, res, next) => {
		res.status(422).send({
			error : err.message
		})
	})



module.exports = router;




// /