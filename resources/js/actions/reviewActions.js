import {
    REVIEWS_LIST_REQUEST ,
    REVIEWS_LIST_SUCCESS ,
    REVIEWS_LIST_FAIL 
} from '../constants/reviewsConstants'

import axios from 'axios'


export const listReviews = () => async (dispatch) => {
    try {

        dispatch({ type: REVIEWS_LIST_REQUEST })

       const { data } = await axios.get('http://localhost:5000/reviews')
        

        dispatch({
            type: REVIEWS_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REVIEWS_LIST_FAIL,
            error: error.response && error.response.data.message ?  error.response.data.message : error.message
        })

    }
}