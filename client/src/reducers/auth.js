import {
	REGISTER_SUCCESS,
	// REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	DELETE_USER,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
	error: ''
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: false,
			};
		//	case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
			return {
				...state,
				error: payload,
			}
		case LOGOUT:
		case DELETE_USER:
			return {
				...state,
				token: null,
				user: null,
				isAuthenticated: false,
				loading: false,
			};

		default:
			return state;
	}
}
