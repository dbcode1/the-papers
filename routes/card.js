const express = require('express');
let router = express.Router();
const Container = require('../models/Container');
const auth = require('../middleware/auth');

const Card = require('../models/Card');

// onclick of +  add card to DB
router.post('/', auth, async (req, res) => {
	const { title, img, url, containerTitle, user } = req.body;

	console.log('body', title, img, url, containerTitle )

	// TODO:  Check for already exists with the container


	try {
		card = new Card({
			title: title,
			img: img,
			url: url,
			containerTitle: containerTitle, 
			user: req.user.id,
		});
		 console.log('card', card)

	
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
		console.log('title 2', req.query.q)
		const containerCards = await Card.find({
			containerTitle: req.query.q
		})
		console.log('containerCards', containerCards)
		res.send( containerCards);
	} catch (err) {
		console.error(err.message);
		res.status(400).json(err);
	}
});


// delete a card
router.delete('/', auth, async (req, res) => {
	try {
		const title = req.body.title
		await Card.deleteMany({containerTitle: title})
		
		res.send('cards deleted')
	} catch (e) {
		console.log(e);
		if (e.kind === 'ObjectId') {
			return res.status(500).json({ msg: 'Card not found' });
		}
	}
});

module.exports = router;
