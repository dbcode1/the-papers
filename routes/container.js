const express = require('express');
let router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Container = require('.././models/Container');

// add a collection

router.post('/', async (req, res) => {
	try {
		const { title, user } = req.body;
		let container = await Container.findOne({ title });
		const userId = await User.findById(user);
		if (container) {
			return;
		}

		container = new Container({
			title,
			user: userId,
		});

		await container.save();
		res.send(container);

		//
	} catch (err) {
		console.log(err.message);
		res.send(err.message);
	}
});

// get all containers
router.get('/', auth, async (req, res) => {
	try {
		// find all containers
		const containers = await Container.find();

		console.log(containers);
		res.json(containers);
	} catch (err) {
		console.error(err.message);
		res.status(400).json(err);
	}
});

// delete a collection
router.delete('/', auth, async (req, res) => {
	try {
		await Container.findOneAndRemove({ user: req.user.id });

		res.send('Container deleted');
	} catch (e) {
		console.log(e);
		if (err.kind === 'ObjectId') {
			return res.status(500).json({ msg: 'Post not found' });
		}
	}
});

module.exports = router;
