import { TOP_STORIES_SUCCESS, TOP_STORIES_FAILURE } from './types';
import axios from 'axios';

export const topStories = () => async (dispatch) => {
	try {
		const callNews = await axios.get('/top-stories');
		console.log(callNews);
		dispatch({
			type: TOP_STORIES_SUCCESS,
			payload: callNews,
		});
	} catch (err) {
		dispatch({
			type: TOP_STORIES_FAILURE,
			payload: {
				msg: err,
				status: err,
			},
		});
	}
};
