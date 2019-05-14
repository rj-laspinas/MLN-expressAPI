const express = require("express");

const router = express.Router();

const Service = require('../models/Service');
const Provider = require('../models/Provider');
const User = require('../models/User');
const category = require('../models/Category');
const Booking = require('../models/Booking')


// SERVICES CONTROLLER 

	//index
	router.get("/services", (req, res, next) => {
		Service.find({})
		.then(services => {
			return res.json(services)
		})
		.catch(next)
	})

	//store
	router.post("/services", (req, res, next) => {
		let category = req.body.category;
		let name = req.body.name;
		let subname = req.body.subname;
		let description = req.body.description;
		let duration = req.body.description;
		let price = req.body.price;

		if(!category || !name || !subname || !description || !duration || !price){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Service.create(req.body)
		.then(Service => {
			return res.json({
				"message" : "service created successfully",
				"service" : service
			})
		})
		.catch(next)
	})

	//show
	router.get("/services/:id", (req, res, next) => {
		Service.findById(req.params.id)
		.then(service => {
			return res.json(Service)
		})
		.catch(next)
	})

	//update
	router.put("/services/:id", (req, res, next) => {
		Service.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(service => {
			return res.json({
				"message": "Entry updated successfully",
				"Service": Service
			})
		})
		.catch(next)
	})

	//delete
	router.delete("/services/:id", (req, res, next) => {
		Service.findByIdAndUpdate(req.params.id, {isActive: false}, {new: true})
		.then(service => {
			return res.json({
				"message": "Entry was successfully Deactivated",
				"Service": Service
			})
		})
		.catch(next)
	})

	//error handling middleware
	router.use((err, req, res, next) => {
		res.status(422).send({
			error : err.message
		})
	})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CATEGORIES CONTROLLER 
	//index

	router.get("/categories", (req, res, next) => {
		Category.find({})
		.then(categories => {
			return res.json(categorys)
		})
		.catch(next)
	})

	//store
	router.post("/categories", (req, res, next) => {
		let category = req.body.category;
		let name = req.body.name;


		if(!name){
			return res.status(500).json({
				"message" : "Missing information, please complete all fields"
			})
		}

		Category.create(req.body)
		.then(category => {
			return res.json({
				"message" : "Entry created successfully",
				"category" : category
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

		Category.findOneAndDelete({_id: req.params.id})
			.then(category => {
			return res.json({
				"message": "Entry updated successfully",
				"category": category
			})
		})
		.catch(next)
	})


/////////////////////////////////////////////
// USERS CONTROLLER 

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

	//update
	router.put("/users/:id", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(user => {
			return res.json({
				"message": "Entry updated successfully",
				"category": category
			})
		})
		.catch(next)
	})

	//delete
	router.delete("/users/:id", (req, res, next) => {
		User.findByIdAndUpdate(req.params.id, {isActive: false}, {new: true})
		.then(user => {
			return res.json({
				"message": "Entry updated successfully",
				"category": category
			})
		})
		.catch(next)
	})



/////////////////////////////////////////
// PROVIDER CONTROLLER

module.exports = router;