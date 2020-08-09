import axios from 'axios'
import {setAlert} from './alert';
import {
  GET_CARDS,
  CARD_ERROR
}

// get posts
export const getCards = () => {
  try { 
    const res = await axios.get('/search-news', {
			params: {
				q: searchTerm,
			},
		});
    dispatchEvent({
      type: ADD_CARDS,
      payload: res.data
    })
  } catch(err) {
    dispatchEvent({
      type: CARD_ERROR,
      payload: { msg: err.reponse.statusText, status: error.response.status}
    })
  }
}