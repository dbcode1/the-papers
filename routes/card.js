const express = require('express');
let router = express.Router();
const { check, validationResult } = require('express-validator');
const Container = require('../models/Container');
const auth = require('../middleware/auth');

//const auth = require('../../middleware/auth');

const Card = require('../models/Card');

// ondrop in container add card
router.post('/', auth, async (req, res) => {
	const { title, abstract, image, tags, container, user } = req.body;

	let card = await Card.findOne({ title });
	if (card) {
		res.send('News article already exists in this location');
	}
	try {
		card = new Card({
			title,
			abstract,
			image,
			tags,
			container,
			user,
		});

		res.send(card);
		await card.save();
	} catch (err) {
		console.log(err);
		//res.send('Server error');
	}
});

// get all cards by container id
router.get('/:id', auth, async (req, res) => {
	try {
		// find all cards with container == req.container
		const containerCards = await Card.find({
			container: req.params.id,
		});

		console.log(containerCards);
		res.send(containerCards);
	} catch (err) {
		console.error(err.message);
		res.status(400).json(err);
	}
});

// delete card on drop outside container
// delete a collection
router.delete('/', auth, async (req, res) => {
	try {
		await Card.findOneAndRemove({ user: req.user.id });

		res.send('Card deleted');
	} catch (e) {
		console.log(e);
		if (err.kind === 'ObjectId') {
			return res.status(500).json({ msg: 'Card not found' });
		}
	}
});

module.exports = router;
