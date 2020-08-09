import { combineReducers } from 'redux';
import searchNews from './searchNews';
import user from './user';
import auth from './auth';
import alert from './alert';
import addCollection from './addCollection'
import card from './card';

export default combineReducers({
	searchNews,
	auth,
	alert,
	addCollection,
	card
});
