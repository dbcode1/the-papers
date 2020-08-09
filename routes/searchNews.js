const express = require('express');
let router = express.Router();

const config = require('config');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { filter } = require('compression');

const articleObjects = require('./helpers/articleObjects')

// retrieve by search term //
router.get('/', async (req, res) => {
	const query = req.query.q
	// using config to hide keys
	const gaurdianKeyword = `https://content.guardianapis.com/search?q=${query}&show-fields=thumbnail&page-size=50&api-key=${config.get(
		'gaurdianApiKey'
	)}`;
	const nytKeyword = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&page=1
		&api-key=${config.get('nytApiKey')}`;
	const newsApi = `https://newsapi.org/v2/everything?q=${query}&pageSize=40&apiKey=${config.get(
		'newsApiKey'
	)}`;

	// call apis
	const gaurdianReq = await axios.get(gaurdianKeyword);
	const nytKeywordReq = await axios.get(nytKeyword);
	const newsApiReq = await axios.get(newsApi);

  const allSearchData = axios
	 	.all([gaurdianReq, nytKeywordReq, newsApiReq]) //  newsApiNews 
		.then(
	 		axios.spread((...responses) => {
				const gaurdianRes = responses[0];
				const nytKeywordRes = responses[1];
				const newsApiRes = responses[2];
				
				// filter out metadata
				const gaurdianResults = gaurdianRes.data.response.results;
				const nytResults = nytKeywordRes.data.response.docs;
				const newsApiResults = newsApiRes.data.articles;

				// format data into new objects
				const allArticles = articleObjects(gaurdianResults, nytResults, newsApiResults)

				// randomize results with Fischer-Yates algorithm
				const randomResults = (array) => {
					for(let i = array.length - 1; i > 0; i--){
						const j = Math.floor(Math.random() * i)
						const temp = array[i]
						array[i] = array[j]
						array[j] = temp
					}
					return array 
				}

				res.status(200).send(
					//randomResults(filteredNews)
					randomResults(allArticles)
				);
	 		})
	 	)
	 	.catch((err) => {
	 		console.log(err.response);
	 	});
});

module.exports = router;
