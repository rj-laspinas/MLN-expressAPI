const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const LocationSchema = new Schema({
	
	address: String,
	city: String,
	province: String,

});

module.exports = mongoose.model("Location", LocationSchema);
