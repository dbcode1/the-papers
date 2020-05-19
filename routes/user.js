const express = require('express');
let router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// const auth = require('../../middleware/auth');
const User = require('.././models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

// create a user
router.post(
	'/',
	[
		check('fullname', 'Fullname is required').not().isEmpty(),
		check(
			'email',
			'Please include a password with 6 or more characters'
		).isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { fullname, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: 'User already exists' }] });
			}
			// get users gravatar
			const avatar = gravatar.url('email', {
				s: 200,
				r: 'pg',
				d: 'mm',
			});

			user = new User({
				fullname,
				email,
				password,
			});

			// encrypt password

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			return res.status(500).send('Server error');
		}
	}
);

// get user by id
router.get('/:id', async (req, res) => {
	res.send('get all users');
});

// delete a user
router.delete('/', auth, async (req, res) => {
	try {
		const user = await User.find({ _id: req.user.id });
		console.log(user);
		await User.findOneAndRemove({ _id: req.user.id });
		await Container.deleteMany({ user: req.user.id });

		res.json({ msg: 'User deleted' });
	} catch (e) {
		if (err.kind === 'ObjectId') {
			return res.status(500).json({ msg: 'User not found' });
		}
	}
});

module.exports = router;
