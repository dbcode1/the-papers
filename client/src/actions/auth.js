import axios from 'axios';
import { setAlert } from './alert';
import store from '../store';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	DELETE_USER,
	SET_ALERT,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
	try {
		const res = await axios.get('/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ name, email, password });

	try {
		const res = await axios.post('/user', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;
		console.log(errors);

		// if (errors) {
		// 	errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		// }

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

export const alert = (err) => {
	console.log(err);
};

// Login User
export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ email, password });
	console.log(body);

	try {
		const res = await axios.post('/auth', body, config);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(loadUser());
	} catch (err) {
		console.log(err.message);

		const errors = err.response.data.errors;

		if (errors) {
			const errorMessage = errors[0].msg;
			console.log(Array.isArray(errorMessage));
			errors.forEach((error) => dispatch(setAlert(errorMessage, 'danger')));
		}

		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};

// Delete User Account
export const deleteUser = () => async (dispatch) => {
	const body = store.getState().auth.token;

	await axios.delete('/user', body);

	dispatch({
		type: DELETE_USER,
	});
};
