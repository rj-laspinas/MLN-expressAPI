//passport config file
//use passport for local authentication
const passport = require("passport");
const config = require('./config');

//load passportJWT for authentication of JWT's
const passportJWT = require("passport-jwt");

//load JWT extraction for extracting web tokens later
const ExtractJWT = passportJWT.ExtractJwt;

//use local strategy to authenticate using email & password combination
const LocalStrategy = require("passport-local").Strategy;

//use JWT strategy
const JWTStrategy = passportJWT.Strategy;

const UserModel = require("./models/User");
const bcrypt = require("bcrypt-nodejs");

//prep the user data that we want to store for querying
passport.serializeUser((user, done) => {
	done(null, user._id);
})

passport.deserializeUser((user, done) => {
	done(null, user._id);
})

//configure passport.js to use the local strategy for email & password based auth
passport.use(new LocalStrategy({usernameField: "email"}, (email, password, done) => {
	//query the database for any matching document in the users collection
	//pass in the result of this query as a parameter named user
	UserModel.findOne({'email': email}).then(function(user){
		if(!user){
			return done(null, false, {"message": "no matches found"});
		}
		//if a matching email is found in the collection
		if(email == user.email){
			// if(user.isActive == false){
			// 	return done(null, false, {"message" : "account has been deactivated"})
			// }
			//check if the password hash matches the stored password
			//takes in two arguments for comparison:
				//first is the user-submitted password
				//second is the password field of the resulting user document from our previous query
			if(!bcrypt.compareSync(password, user.password)){
				//return an invalid credentials error status
				return done(null, false, {"message": "wrong password"});
			} else {
				//return a successful login if both email and password matches
				return done(null, user);
			}
		}
		//for all other cases
		return done(null, false, {"message": "something went terribly wrong, better get some REST"});
	})
}))

//configure passport for JWT use
passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret
},
function(jwtPayload, cb){
	// from the way we signed our JWT generation, return a success status code
	if(jwtPayload){
		return cb(null, jwtPayload)
	}
}
))
