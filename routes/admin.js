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
	router.get("/users", (req, res, next) => {
		User.find({})
		.then(users => {
			return res.json(users)
		})
		.catch(next)
	})

	//show
	router.get("/users/:id", (req, res, next) => {
		User.findById(req.params.id)
		.then(user => {
			return res.json(user)
		})
		.catch(next)
	})

	//update - (email cannot be changed)
	router.put("/users/:id", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(user => {
			return res.json({
				"message": "Entry updated successfully",
				"user": User
			})
		})
		.catch(next)
	})

	//delete / disable user
	// router.delete("/users/:id", (req, res, next) => {
	// 	User.findByIdAndUpdate(req.params.id, {isActive: false}, {new: true})
	// 	.then(user => {
	// 		return res.json({
	// 			"message": "Entry has been successfully disabled",
	// 			"user": User
	// 		})
	// 	})
	// 	.catch(next)
	// })

	//enable user
	router.delete("/users/:id/enable", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, {isActive: true}, {new: true})
		.then(user => {
			return res.json({
				"message": "Entry updated successfully enabled",
				"user": User
			})
		})
		.catch(next)
	})

	//update ADMIN ON
	router.put("/users/:id/adminEnable", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, {isAdmin: true}, {new: true})
		.then(vehicle => {
			return res.json({
				"message": "User has been granted Administrator rights",
				"user": User
			})
		})
		.catch(next)
	})

	//update ADMIN OFF
	router.put("/users/:id/adminDisable", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, {isAdmin: false}, {new: true})
		.then(vehicle => {
			return res.json({
				"message": "Admin rights for user have been widthrawn",
				"user": User
			})
		})
		.catch(next)
	})

	// //update PROVIDER ON
		// router.put("/users/:id/providerEnable", (req, res, next) => {
		// 	User.findByIdAndUpdate(req.params.id, {isProvider: true}, {new: true})
		// 	.then(vehicle => {
		// 		return res.json({
		// 			"message": "Provider created successfully",
		// 			"user": User
		// 		})
		// 	})
		// 	.catch(next)
		// })

		// //update PROVIDER OFF
		// router.put("/users/:id/providerDisable", (req, res, next) => {
		// 	User.findByIdAndUpdate(req.params.id, {isProvider: false}, {new: true})
		// 	.then(vehicle => {
		// 		return res.json({
		// 			"message": "Entry has been removed from list of Providers",
		// 			"user": User
		// 		})
		// 	})
		// 	.catch(next)
		// })

	//update USER VERIFICATION
	router.put("/users/:id/verify", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, {isVerified: true}, {new: true})
		.then(vehicle => {
			return res.json({
				"message": "User has been successfully verified",
				"user": User
			})
		})
		.catch(next)
	})

	// ENABLE/ DISABLE TOGGLE IS ACTIVE
	router.delete("/users/:id", (req, res, next) => {
		
		User.findById(req.params.id).then(function(user){

			if(user.isActive == true) {
				user.isActive = false;
				user.save();
				return res.json({
				"message": "User has been successfully disabled",
				"user": user
			})
			} else  {
				user.isActive = true;
				user.save();
				return res.json({
				"message": "User has been successfully enabled",
				"user": user
			})
			}
		})
	})

	router.delete("/users/:id/admin", (req, res, next) => {

		User.findById(req.params.id).then(function(user){

			if(user.isAdmin == true) {
				user.isAdmin = false;
				user.save();
				return res.json({
				"message": "Admin rights for user have been widthrawn",
				"user": user
			})
			} else  {
				user.isAdmin = true;
				user.save();
				return res.json({
				"message": "User has been granted Administrator rights",
				"user": user
			})
			}
		})
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

	//store
	router.post("/categories", (req, res, next) => {
		let category = req.body.category;
		let name = req.body.name;
		let image = req.body.image;


		if(!name || !image){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Category.find({"name": name, "image": image}).then(function(category, err){
			if(err){
				return res.status(500).json({
					"error" : "an error has occured while processing query"
				})
			}

			if(category.length > 0) {
				return res.status(500).json({
					"error" : "category already exists"
				})
			}

			Category.create(req.body).then(category => {
			return res.json({
				"message" : "Entry created successfully",
				"category" : category
				})
			})
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

	//update
	router.put("/categories/:id", (req, res, next) => {
		Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(category => {
			return res.json({
				"message": "Entry updated successfully",
				"category": category
			})
		})
		.catch(next)
	})

	//delete
	router.delete("/categories/:id", (req, res, next) => {

		Category.findByIdAndRemove({_id: req.params.id})
			.then(category => {
			return res.json({
				"message": "Entry updated successfully",
				"category": category
			})
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

	//store
	router.post("/locations", (req, res, next) => {
		let address = req.body.address;
		let city = req.body.city;
		let province = req.body.province;


		if(!address || !city || !province){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Location.find({"address" : address, "city": city}).then(function(location, err){
			if(err){
				return res.status(500).json({
					"error": "an error occured while querying the collection"
				})
			}

			if(location.length > 0){
				return res.status(500).json({
					"error": "Location already exists"
				})
			}

			Location.create(req.body)
			.then(location => {
				return res.json({
					"message" : "New location created successfully",
					"location": location
				})
			})
			.catch(next)
		})

	})

	//show
	router.get("/locations/:id", (req, res, next) => {
		Location.findById(req.params.id)
		.then(location => {
			return res.json(location)
		})
		.catch(next)
	})

	//update
	router.put("/locations/:id", (req, res, next) => {
		Location.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(location => {
			return res.json({
				"message": "Entry updated successfully",
				"location": location
			})
		})
		.catch(next)
	})

	//delete
	router.delete("/locations/:id", (req, res, next) => {

		Location.findByIdAndRemove({_id: req.params.id})
			.then(location => {
			return res.json({
				"message": "Entry updated successfully",
				"location": location
			})
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

	//store
	router.post("/vehicles", (req, res, next) => {
		let category = req.body.category;
		let vehicleModel = req.body.vehicleModel;
		let plate = req.body.plate;
		let image = req.body.image;
		let seatingCap = req.body.seatingCap;


		if(!category || !vehicleModel || !plate || !image || !seatingCap){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Vehicle.find({"image" : image, "plate": plate}).then(function(vehicle, err){
			if(err){
				return res.status(500).json({
					"error": "an error occured while querying the collection"
				})
			}

			if(vehicle.length > 0){
				return res.status(500).json({
					"error": "vehicle already exists"
				})
			}

			let newVehicle = Vehicle({
					"category": category,
					"vehicleModel": vehicleModel,
					"plate": plate,
					"image": image,
					"seatingCap": seatingCap,
			})

			newVehicle.save(function(err){
			if(!err){
				return res.json({
					"message" : "New vehicle added to fleet"
				})
			}
		})

		})

		
		
	})

	//SHOW
	router.get("/vehicles/:id", (req, res, next) => {
		Vehicle.findById(req.params.id)
		.then(vehicle => {
			return res.json(vehicle)
		})
		.catch(next)
	})

	//UPDATE
	router.put("/vehicles/:id", (req, res, next) => {
		Vehicle.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(vehicle => {
			return res.json({
				"message": "Entry updated successfully",
				"vehicle": vehicle
			})
		})
		.catch(next)
	})

	//DELETE - DISABLE vehicle
	router.delete("/vehicles/:id/del", (req, res, next) => {
		Vehicle.findByIdAndUpdate(req.params.id, {isActive: false}, {new: true})
		.then(vehicle => {
			return res.json({
				"message": "Entry was successfully Deactivated",
				"vehicle": vehicle
			})
		})
		.catch(next)
	})


	// ENABLE/DISABLE TOGGLEvehicle

	router.delete("/vehicles/:id/status", (req, res, next) => {
		
		Vehicle.findById(req.params.id).then(function(vehicle){

			if(vehicle.isServiceable == true) {
				vehicle.isServiceable = false;
				vehicle.save();
				return res.json({
				"message": "Entry was successfully Deactivated",
				"vehicle": vehicle
			})
			} else  {
				vehicle.isServiceable = true;
				vehicle.save();
				return res.json({
				"message": "Entry was successfully Activated",
				"vehicle": vehicle
			})
			}
		})
	})

		router.delete("/vehicles/:id/trip", (req, res, next) => {
		
		Vehicle.findById(req.params.id).then(function(vehicle){

			if(vehicle.onTrip == true) {
				vehicle.onTrip = false;
				vehicle.save();
				return res.json({
				"vehicle": vehicle
			})
			} else  {
				vehicle.onTrip = true;
				vehicle.save();
				return res.json({
				"vehicle": vehicle
			})
			}
		})
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

	//store
	router.post("/routes", (req, res, next) => {
		let origin = req.body.origin;
		let destination = req.body.destination;
		let name = origin + " to " + destination;


		if(!origin || !destination){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Routa.find({"origin" : origin, "destination": destination}).then(function(routa, err){
			if(err){
				return res.status(500).json({
					"error": "an error occured while querying the collection"
				})
			}

			if(routa.length > 0){
				return res.status(500).json({
					"error": "Route already exists"
				})
			}

			Routa.create({
				name : name,
				origin: origin,
				destination: destination
			})
			.then(routa => {
				return res.json({
					"message" : "New route created successfully",
					"routa" : routa
					})
				})
			})
			
	})

	//SHOW
	router.get("/route/:id", (req, res, next) => {
		Routa.findById(req.params.id)
		.then(routa => {
			return res.json(routa)
		})
		.catch(next)
	})

	//UPDATE
	router.put("/route/:id", (req, res, next) => {
		let origin = req.body.origin;
		let destination = req.body.destination;
		let name = origin + " to " + destination;


		if(!origin || !destination){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Routa.find({"origin" : origin, "destination": destination}).then(function(routa, err){
			if(err){
				return res.status(500).json({
					"error": "an error occured while querying the collection"
				})
			}

			if(routa.length > 0){
				return res.status(500).json({
					"error": "Route already exists"
				})
			}
		})

		Routa.findByIdAndUpdate(req.params.id, 
			{
				name : name,
				origin: origin,
				destination: destination
			},
			 {new: true})
		.then(routa => {
			return res.json({
				"message": "Entry updated successfully",
				"routa": routa
			})
		})
		.catch(next)
	})


	// ENABLE/DISABLE TOGGLErouta

		router.delete("/route/:id", (req, res, next) => {
		
		Routa.findById(req.params.id).then(function(routa){

			if(routa.isActive == true) {
				routa.isActive = false;
				routa.save();
				return res.json({
				"routa": routa
				})
			} else  {
				routa.isActive = true;
				routa.save();
				return res.json({
				"routa": routa
				})
			}
		}).catch(next);
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

	//store
	router.post("/trips", (req, res, next) => {
		let vehicleId = req.body.vehicleId;
		let price = req.body.price;
		let origin = req.body.origin;
		let destination = req.body.destination;
		let startDate = moment(req.body.startDate, "MM-DD-YYYY HH:mm", true);
		let endDate = moment(req.body.endDate, "MM-DD-YYYY HH:mm", true);
		let startTime = req.body.startTime;
		let endTime = req.body.endTime;
		
		if(!vehicleId || !price || !startDate || !endDate || !origin || !destination){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Vehicle.find({"_id" : vehicleId}).then(function(vehicle, err){
			if(err){
				return res.status(500).json({
					"error": "an error occured while querying the collection"
				})
			}

			if(vehicle.isServiceable == false) {
				return res.status(500).json({
					"message": "Vehicle is currently not Available/Serviceable"
				})
			}

			Trip.find({"vehicleId" : vehicleId}).then(function(trips, err, next){
				if(err){
					return res.status(500).json({
						"error": "an error occured while processing request"
					})
				}

				if(trips.length > 0) {

					trips.forEach((trip) => {
					
						if(moment(endDate).isSameOrAfter(trip.startDate) && moment(endDate).isSameOrBefore(trip.endDate)) {
								return res.status(500).json({
									"message" : "Vehicle has  scheduled trip on selected dates"
								})
							} 
					})

				} else {
					Trip.create({
						"vehicleId" : vehicleId,
						"price": price,
						"origin": origin,
						"destination": destination,
						"startDate": startDate,
						"endDate": endDate,
						"startTime": startTime,
						"endTime": endTime
					})
						.then( trip => {
							Vehicle.findById(trip.vehicleId).then(vehicle => {
							vehicle.tripID.push(trip._id)
							vehicle.save();
								return res.json({
									"message" : "Trip created successfully",
									"trip": trip,
									"vehicle": vehicle
								})

							})
						
						})
				}



			}).catch(next)
			
		}).catch(next)
		
	})

	//SHOW
	router.get("/trips/:id", (req, res, next) => {
		Trip.findById(req.params.id)
		.then(trip => {
			return res.json(trip)
		})
		.catch(next)
	})

	//UPDATE
	router.put("/trips/:id", (req, res, next) => {
		let vehicleIdNew = req.body.vehicleId;
		let priceNew = req.body.price;
		let originNew = req.body.origin;
		let destinationNew = req.body.destination;
		let startDateNew = moment(req.body.startDate, "MM-DD-YYYY HH:mm", true);
		let endDateNew = moment(req.body.endDate, "MM-DD-YYYY HH:mm", true);
		let startTimeNew = req.body.startTime;
		let endTimeNew = req.body.endTime;
		
		if(!vehicleIdNew || !priceNew || !startDateNew || !endDateNew || !originNew || !destinationNew){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}
		
		//remove trip ids from
					
	

		Trip.findById(req.params.id).then((trip) =>{

			// return res.json({
			// 	oGvehicle: trip.vehicleId,
			// 	newVehicle: vehicleIdNew
			// });

			// if(vehicleIdNew !== trip.vehicleId) {

		//check if new vehicle is serviceable and no overlapping schedule (dates)
			Trip.find({"vehicleId" : vehicleIdNew}).then((trips, err) => {
				
				// return res.json(vehicleIdNew);
				if(err){
					return res.status(500).json({
						error: "an error occured while processing request"
					})
				}

				if(trips.length > 0) {

					trips.forEach((trip) => {
					
						if(moment(endDateNew).isSameOrAfter(trip.startDate) && moment(endDateNew).isSameOrBefore(trip.endDate)) {
							return res.status(500).json({
								"message" : "Vehicle has scheduled trip on selected dates"
							})
						} 
					})
				}

				// return res.json({trips})
			})

			// return res.json({
			// 	oGvehicle: trip.vehicleId,
			// 	newVehicle: vehicleIdNew
			// });

			Vehicle.findById(vehicleIdNew).then((newVehicle, err) => {
				// return res.json(newVehicle);
				if(err){
					return res.status(500).json({
						error: "an error occured while querying the collection"
					})
				}

				if(newVehicle.isServiceable == false) {
					return res.status(500).json({
						message: "Vehicle is currently not Available/Serviceable"
					})
				}

				for(let i= 0; i<newVehicle.length; i++ ){
					if(newVehicle.tripID == trip.id){
						return res.json({
							message : "duplicate tripId cannot be pushed to Vehicles TripIds"
						});
						
					}
					
				}

				newVehicle.tripID.push(trip._id)
				newVehicle.save();
				
			}).catch(next)


			Vehicle.findById(trip.vehicleId).then((oGvehicle) =>{
				
				oGvehicle.tripID.pull(trip._id)
				oGvehicle.save();
				return res.json(oGvehicle);
			})


			// Trip.updateOne(
			// 	{_id:req.params.id},
			// 	{
			// 	"vehicleId" : vehicleIdNew,
			// 	"price": priceNew,
			// 	"origin": originNew,
			// 	"destination": destinationNew,
			// 	"startDate": startDateNew,
			// 	"endDate": endDateNew,
			// 	"startTime": startTimeNew,
			// 	"endTime": endTimeNew
			// }).then((updatedTrip) => {
			// 	updatedTrip.save((err)=>{
			// 		if(!err){
			// 			return res.json({
			// 				message: "Trip was updated successfully",
			// 				trip: "updatedTrip",
							// newVehicle: "newVehicle",
							// oGvehicle: "oGvehicle"
			// 			})
			// 		}
			// 	})
			// })

		}).catch(next)
		
	})


		//Validation for new Vehicle


	// //DELETE - DISABLE trip
	// router.delete("/trips/:id/del", (req, res, next) => {
	// 	Trip.findByIdAndUpdate(req.params.id, {isActive: false}, {new: true})
	// 	.then(trip => {
	// 		return res.json({
	// 			"message": "Entry was successfully Deactivated",
	// 			"trip": trip
	// 		})
	// 	})
	// 	.catch(next)
	// })


	// // ENABLE/DISABLE TOGGLEtrip

	// router.delete("/trips/:id/status", (req, res, next) => {
		
	// 	Trip.findById(req.params.id).then(function(trip){

	// 		if(trip.isServiceable == true) {
	// 			trip.isServiceable = false;
	// 			trip.save();
	// 			return res.json({
	// 			"message": "Entry was successfully Deactivated",
	// 			"trip": trip
	// 		})
	// 		} else  {
	// 			trip.isServiceable = true;
	// 			trip.save();
	// 			return res.json({
	// 			"message": "Entry was successfully Activated",
	// 			"trip": trip
	// 		})
	// 		}
	// 	})
	// })

	// 	router.delete("/trips/:id/trip", (req, res, next) => {
		
	// 	Trip.findById(req.params.id).then(function(trip){

	// 		if(trip.onTrip == true) {
	// 			trip.onTrip = false;
	// 			trip.save();
	// 			return res.json({
	// 			"trip": trip
	// 		})
	// 		} else  {
	// 			trip.onTrip = true;
	// 			trip.save();
	// 			return res.json({
	// 			"trip": trip
	// 		})
	// 		}
	// 	})
	// })

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// BOOKING CRUD

// booking CONTROLLER 

	// //index
	// router.get("/booking", (req, res, next) => {
	// 	Booking.find({})
	// 	.then(vehicles => {
	// 		return res.json(vehicles)
	// 	})
	// 	.catch(next)
	// })

	// //store
	// router.post("/booking", (req, res, next) => {
	// 	let tripId = req.body.tripId;
	// 	let userId = req.body.userId;
	// 	let quantity = req.body.quantity;



	// 	if(!tripId || !userId || !quantity){
	// 		return res.status(500).json({
	// 			"message" : "Missing information, please complete all fields"
	// 		})
	// 	}

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

	// //SHOW
	// router.get("/booking/:id", (req, res, next) => {
	// 	Booking.findById(req.params.id)
	// 	.then(vehicle => {
	// 		return res.json(vehicle)
	// 	})
	// 	.catch(next)
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


	// // ENABLE/DISABLE TOGGLEvehicle

	// router.delete("/booking/:id", (req, res, next) => {
		
	// 	Booking.findById(req.params.id).then(function(vehicle){

	// 		if(booking.isPaid == true) {
	// 			booking.isPaid = false;
	// 			booking.save();
	// 			return res.json({
	// 			"message": "Entry was successfully Deactivated",
	// 			"booking": booking
	// 		})
	// 		} else  {
	// 			booking.isPaid = true;
	// 			booking.save();
	// 			return res.json({
	// 			"message": "Entry was successfully Activated",
	// 			"booking": booking
	// 		})
	// 		}
	// 	})
	// })


//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//error handling middleware
	router.use((err, req, res, next) => {
		res.status(422).send({
			error : err.message
		})
	})



module.exports = router;