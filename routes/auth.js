const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const appPassport = require("../passport");

//login the user to the system
router.post("/login", (req, res, next) => {
	//authenticate using passport's local strategy
	//use the authenticate method of the passport object and pass in 3 arguments:
		//strategy to be used
		//whether session is in use or not
		//function to perform after authentication
	passport.authenticate("local", {session:false}, (err, user, info) => {
		//if an error is thrown or no user is passed in from the preceding authenticate method
		if(err || !user){
			return res.status(400).json({
				"error":"something's not right"
			})
		}

		req.login(user, {session:false}, (err) => {
			if(err){
				res.send(err);
			}
			//the sign method of jwt takes the ff. form:
			//jwt.sign(payload, secretKey, [options, callback])
			const token = jwt.sign(user.toJSON(), "secretNgaE", { expiresIn : '300m'});
			//upon successful JWT generation, return a success status code
			return res.status(200).json({
				//with accompanying data
				"data" : {
					//containing the user info
					"user" : user,
					//and the token generated
					"token" : token
				}
			})
		})
	}) (req, res)
})

//logout
router.get("/logout", function(req, res){
	req.logout();
	res.json({
		"status": "logout",
		"message": "You have been successfully logged out"
	})
})

module.exports = router;
