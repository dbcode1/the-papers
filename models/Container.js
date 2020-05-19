const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContainerSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	id: {
		type: Schema.Types.ObjectId,
		unique: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		unique: true,
	},
});

module.exports = Container = mongoose.model('Container', ContainerSchema);
