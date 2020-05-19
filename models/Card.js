const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Container = require('../models/Container');

const CardSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	abstract: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	container: {
		type: Schema.Types.ObjectId,
		ref: 'Container',
	},
	tags: {
		type: Array,
	},
});

// const CardSchema = new mongoose.Schema({
// 	cardTitle: String,
// 	collectedIn: [{ type: Schema.Types.ObjectId, ref: 'Container' }],
// });
module.exports = Card = mongoose.model('Card', CardSchema);
