import axios from 'axios'
import {setAlert} from './alert';
import {
  GET_CARDS,
  CARD_ERROR, 
  ADD_CARD,
  RETRIEVE_CARDS_SUCCESS,
  RETRIEVE_CARDS_FAILURE,
  DELETE_CARDS_SUCCESS,
  DELETE_CARDS_FAILURE,
  CLEAR_CARDS_SUCCESS,
  CLEAR_CARDS_FAILURE
} from './types'

// get posts
export const getCards = (searchTerm) => async (dispatch, res, req) => {
  try { 
    const res = await axios.get('/search-news', {
			params: {
				q: searchTerm,
			},
		});
    dispatch({
      type: GET_CARDS,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: CARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}


export const addCard = (title, img, url, containerTitle) => async (dispatch, res, req) =>  {
  
  const config = { 
		headers: {'Content-Type': 'application/json'
		}
  }
  // send card data to collection in DB
  try {
    const res = await axios({
      method: 'post',
      url: '/card',
      data: {
        title,
        img,
        url,
        containerTitle 
      },
      config
    } ) 

    dispatch({
      type: ADD_CARD,
      payload: res.data
    })

    console.log('addCard', res)
  }
  
  catch(err) {
    console.log(err.message)
  }
}

export const retrieveCards = (title) => async (dispatch, res, req) => {
  try { 
    
    const res = await axios.get('/card', {
			params: {
				q: title,
			},
    });

    dispatch({
      type: RETRIEVE_CARDS_SUCCESS,
      payload: res.data
    })
      
  } catch(err) {
    dispatch({
      type: RETRIEVE_CARDS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const clearCards = (title) => async (dispatch, res, req) => {
  try { 
    dispatch({
      type: CLEAR_CARDS_SUCCESS,
      payload: title
    })
      
  } catch(err) {
    dispatch({
      type: RETRIEVE_CARDS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}

export const deleteCards = (title) => async (dispatch, res, req) => {
  
  try { 
    await axios({
			method: 'delete',
			url: '/card',
			data: {
				title : title
			}
    })
    console.log('cards deleted')
    dispatch({
      type: DELETE_CARDS_SUCCESS,
      payload: title
    })
      
  } catch(err) {
    dispatch({
      type: DELETE_CARDS_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status}
    })
  }
}