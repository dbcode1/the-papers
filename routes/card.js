const express = require('express');
let router = express.Router();
const { check, validationResult } = require('express-validator');
const Container = require('../models/Container');
const auth = require('../middleware/auth');

const Card = require('../models/Card');

// ondrop in container add card
router.post('/', auth, async (req, res) => {
	const { title, abstract, image, tags, containerTitle, user } = req.body;

	let card = await Card.findOne({ title });
	if (card) {
		return res.send('News article already exists in this location');
	}
	try {
		card = new Card({
			title,
			abstract,
			image,
			tags,
			containerTitle, // grab from redux and send with request
			user: req.user.id,
		});

		await card.save();
		res.send(card)
	} catch (err) {
		console.log(err);
		//res.send('Server error');
	}
});

// get all cards by container title
// router.get('/:title', auth, async (req, res) => {
// 	try {
// 		const containerCards = await Card.find({
// 			containerTitle: req.params.title,
// 		});

// 		console.log(containerCards);
// 		res.send(containerCards);
// 	} catch (err) {
// 		console.error(err.message);
// 		res.status(400).json(err);
// 	}
// });

router.get('/', auth, async (req, res) => {
	try {
		const containerCards = await Card.find({
			containerTitle: req.body.containerTitle
		})
	
		res.send(containerCards);
	} catch (err) {
		console.error(err.message);
		res.status(400).json(err);
	}
});


// delete a card
router.delete('/', auth, async (req, res) => {
	try {
		await Card.findOneAndRemove({ _id: req.body.id });

		res.send('Card deleted');
	} catch (e) {
		console.log(e);
		if (err.kind === 'ObjectId') {
			return res.status(500).json({ msg: 'Card not found' });
		}
	}
});

module.exports = router;
