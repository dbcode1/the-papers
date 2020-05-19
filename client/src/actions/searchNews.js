import { SEARCH_SUCCESS, SEARCH_FAILURE } from './types';
import axios from 'axios';

export const searchNews = (searchTerm) => async (dispatch) => {
	//	cors();
	console.log('search');
	try {
		const callSearchNews = await axios.get('/search-news', {
			params: {
				q: searchTerm,
			},
		});

		console.log('action', callSearchNews);
		dispatch({
			type: SEARCH_SUCCESS,
			// should this be callSearchnews.data ????
			payload: callSearchNews,
		});
	} catch (err) {
		dispatch({
			type: SEARCH_FAILURE,
			payload: {
				msg: err,
				status: err,
			},
		});
	}
};
