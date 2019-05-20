const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	name: String,
	image: String
});

module.exports = mongoose.model("Category", CategorySchema);

// Premium
// Deluxe
// SuperDelux