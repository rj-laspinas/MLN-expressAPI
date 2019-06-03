
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const config =  require('./config');
require("./passport");

mongoose.connect('mongodb+srv://rj-laspinas:Summerj1m96k1j3g@cluster-summer2016-slplx.mongodb.net/ExpressHeroku?retryWrites=true', {useNewUrlParser: true})
app.use(cors());
app.use(bodyParser.json());

app.listen(config.port, () => {console.log(`Server running at port ${config.port}`)})

//registration
const reg = require("./routes/register.js");
app.use("/register", reg);

//login
const auth = require("./routes/auth.js");
app.use("/auth", auth);

function verifyAdmin(req, res, next){
	const isAdmin = req.user.isAdmin;
	if(isAdmin == true) {
		next()
	} else {
		res.redirect(403,'/login')
	}
}

//admin only access
const  admin = require("./routes/admin.js");
app.use("/admin", [passport.authenticate("jwt", {session:false}), verifyAdmin], admin);


//NON-ADMIN ACCESS
function verifyNonAdmin(req, res, next){
	const isAdmin = req.user.isAdmin;
	if(isAdmin == false) {
		next()
	} else {
		res.redirect(403,'/login')
	}
}


const  nonAdmin = require("./routes/nonAdmin.js");
app.use("/nonAdmin", [passport.authenticate("jwt", {session:false}), verifyNonAdmin], nonAdmin);

//NON-ADMIN ACCESS
function noVefify(req, res, next){
		next()

}

const  guest = require("./routes/guest.js");
app.use("/guest", guest);