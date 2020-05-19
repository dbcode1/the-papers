import { TOP_STORIES_SUCCESS, TOP_STORIES_FAILURE } from '../actions/types';

const initialState = {
	currentResults: [],
	loading: true,
	error: {},
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case TOP_STORIES_SUCCESS:
			return {
				...state,
				currentResults: payload,
				loading: false,
			};

		case TOP_STORIES_FAILURE:
			return {
				...state,
				error: payload,
				loading: false,
				data: [],
			};
		default:
			return {
				...state,
			};
	}
}
