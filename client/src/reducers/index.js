import { combineReducers } from 'redux';
import searchNews from './searchNews';
import topStories from './topStories';
import user from './user';
import auth from './auth';
import alert from './alert';

export default combineReducers({
	topStories,
	searchNews,
	auth,
	alert,
});
