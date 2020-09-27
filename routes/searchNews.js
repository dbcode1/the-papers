const express = require('express');
let router = express.Router();

const config = require('config');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const { filter } = require('compression');

const articleObjects = require('./helpers/articleObjects')

// retrieve by search term //
router.get('/', async (req, res) => {
	try {
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

		// filter out metadata
		const gaurdianResults = gaurdianReq.data.response.results;
		const nytResults = nytKeywordReq.data.response.docs;
		const newsApiResults = newsApiReq.data.articles;

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
			//console.log('everything', allArticles)

			// get rid of duplicates
			const titles = []
			allArticles.forEach(item => {

				if (titles.includes(item.title)) {
					const x = allArticles.indexOf(item)
					allArticles.splice(x, 1)

				} else {
					titles.push(item.title);
				}
			});

			 console.log(titles)

			res.status(200).send(
				randomResults(allArticles)
			);
		} catch(err) {
			console.log(err)
			res.json({msg: 'No Results'})
		}
})
		 

module.exports = router;
