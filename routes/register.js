const express = require("express");

const router = express.Router();

const UserModel = require("../models/User");

const bcrypt = require("bcrypt-nodejs");

router.post("/register", (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let mobile = req.body.mobile;
	let fname = req.body.fname;
	let lname = req.body.lname;


	if(!email || !password || !mobile || !fname || !lname ){
		return res.status(500).json({
			"error":"Missing credentials"
		})
	}

	UserModel.find({"email" : email, "mobile": mobile}).then(function(user, err){
		if(err){
			return res.status(500).json({
				"error": "an error occured while querying the users collection"
			})
		}

		if(user.length > 0){
			return res.status(500).json({
				"error": "User already exists"
			})
		}

		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(password, salt, null, function(err, hash){
				let newUser = UserModel({
					"fname": fname,
					"lname": lname,
					"mobile": mobile,
					"email": email,
					"password": hash,
					
				})

				newUser.save(function(err){
					if(!err){
						return res.json({
							"message": "user registered successfully"
						})
					}
				})
			})
		})
	})
});

//-------------------------------------------------------------------------------------------------------------------
//PROVIDER REGISTRATION

// router.post("/registerProvider", (req, res) => {
// 	let name = req.body.name;
// 	let mobile = req.body.mobile;
// 	let email = req.body.email;
// 	let password = req.body.password;
// 	let salutation = req.body.salutation;


// 	if(!email || !password || !mobile || !name){
// 		return res.status(500).json({
// 			"error":"Missing credentials"
// 		})
// 	}

// 	UserModel.find({"email" : email, "mobile": mobile}).then(function(user, err){
// 		if(err){
// 			return res.status(500).json({
// 				"error": "an error occured while querying the users collection"
// 			})
// 		}

// 		if(user.length > 0){
// 			return res.status(500).json({
// 				"error": "User already exists"
// 			})
// 		}

// 		bcrypt.genSalt(10, function(err, salt){
// 			bcrypt.hash(password, salt, null, function(err, hash){
// 				let newUser = UserModel({
// 					"salutation": req.body.salutation,
// 					"name": req.body.name,
// 					"mobile": req.body.mobile,
// 					"email": req.body.email,
// 					"password": hash
// 				})

// 				newUser.save(function(err){
// 					if(!err){
// 						return res.json({
// 							"message": "user registered successfully"
// 						})
// 					}
// 				})
// 			})
// 		})
// 	})
// })

module.exports = router;
