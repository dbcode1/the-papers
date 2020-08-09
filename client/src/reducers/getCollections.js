import {
	GET_COLLECTION_SUCCESS
} from '../actions/types';

const initialState = {
	loading: true,
	title: ''
};


export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_COLLECTION_SUCCESS:
			return {
				...state,
				containers: payload,
				loading: false,
			};
	
		default:
			return state;
	}
}
