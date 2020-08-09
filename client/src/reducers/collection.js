
import {
	ADD_COLLECTION_SUCCESS
} from '../actions/types';

const initialState = {
	loading: true,
	title: ''
};



const addCollection = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_COLLECTION_SUCCESS:
			return {
				...state,
				containers: payload,
				loading: false,
			};
	
		default:
			return state;
	}
}

