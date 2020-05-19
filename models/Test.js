const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
	employeeName: String,
	locations: [
		{
			type: mogoose.Schema.types.ObjectId,
			ref: 'location',
		},
	],
});

const LocationSchema = new mongoose.Schema({
	location: String,
});

module.exports = Employees = mongoose.model('employee', PostSchema);
module.exports = Location = mongoose.model('location', PostSchema);
