import {
  ADD_COLLECTION_SUCCESS,
	ADD_COLLECTION_FAILURE,
	GET_COLLECTIONS,
	GET_COLLECTIONS_FAILURE
} from './types';

const axios = require('axios')

// to be called on select in card and on collections view
export const getCollections = () => async (dispatch, req, res) => {
	try {
		const res = await axios.get('/container');

		dispatch({
			type: GET_COLLECTIONS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: GET_COLLECTIONS_FAILURE,
			payload: res.err
		});
	}
};

export const addCollection = (title) => async (dispatch, res, req) => {
	console.log("addCollection")
	try {
		const res = await axios({
			method: 'post',
			url: '/container',
			data: {
				title: title
			}
		} )
		console.log(res)

		dispatch({
			type: ADD_COLLECTION_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ADD_COLLECTION_FAILURE,
		});
	}
};