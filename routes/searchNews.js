const express = require('express');
let router = express.Router();

const config = require('config');
const bcrypt = require('bcryptjs');
const axios = require('axios');

// retrieve by search term //
router.get('/', async (req, res) => {
	const query = req.query.q;

	// using config to hide keys
	const gaurdianKeyword = `https://content.guardianapis.com/search?show-fields=thumbnail&q=${query}&page-size=200&api-key=${config.get(
		'gaurdianApiKey'
	)}`;

	// const gaurdianKeyword =
	// 	'https://content.guardianapis.com/search?show-fields=thumbnail&q=' +
	// 	query +
	// 	'&page-size=200&api-key=3cb25f91-26b8-4f58-833f-873b0478f441';

	const nytKeyword = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}
		&api-key=${config.get('nytApiKey')}`;

	const googleKeyword = `http://newsapi.org/v2/everything?q=${query}
		&apiKey=${config.get('googleApiKey')}`;

	const newsApi = `https://newsapi.org/v2/everything?q=${query}&apiKey=${config.get(
		'newsApiKey'
	)}`;

	const gaurdianReq = await axios.get(gaurdianKeyword);
	const nytKeywordReq = await axios.get(nytKeyword);
	const googleReq = await axios.get(googleKeyword);
	const newsApiReq = await axios.get(newsApi);

	const allSearchData = axios
		.all([gaurdianReq, nytKeywordReq, googleReq, newsApiReq])
		.then(
			axios.spread((...responses) => {
				const gaurdianRes = responses[0];
				const nytKeywordRes = responses[1];
				const googleRes = responses[2];
				const newsApiRes = responses[3];
				res
					.status(200)
					.send([
						gaurdianRes.data,
						nytKeywordRes.data,
						googleRes.data,
						newsApiRes.data,
					]);
			})
		)
		.catch((err) => {
			console.log(err.response);
		});
});

module.exports = router;
