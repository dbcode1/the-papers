const express = require('express');
let router = express.Router();

const config = require('config');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const nyc = `https://api.nytimes.com/svc/topstories/v2/us.json?api-key=${config.get(
	'nytApiKey'
)}`;

const newsApi = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.get(
	'newsApiKey'
)}`;

const google = `http://newsapi.org/v2/top-headlines?sources=google-news&apiKey=${config.get(
	'googleApiKey'
)}`;

// retrive top stories //

router.get('/', async (req, res) => {
	const nycCall = await axios.get(nyc);
	const newsApiReq = await axios.get(newsApi);
	const googleReq = await axios.get(google);

	axios
		.all([nycCall, newsApiReq, googleReq])
		.then(
			axios.spread((...responses) => {
				const nycRes = responses[0];
				const newsApiRes = responses[1];
				res.status(200).send([nycRes.data, newsApiRes.data, googleReq.data]);
			})
		)
		.catch((err) => {
			res.status(404);
		});
});

module.exports = router;
