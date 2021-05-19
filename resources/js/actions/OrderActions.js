import {
    REQUEST_ACADEMIC_LEVELS ,
    REQUEST_ACADEMIC_LEVELS_SUCCESS ,
    REQUEST_ACADEMIC_LEVELS_FAIL ,
} from '../constants/OrderConstants'

import axios from 'axios'


axios.defaults.withCredentials = true;



export const fetchAcademicLevels = () => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_ACADEMIC_LEVELS })

        const { data } = await axios.get('/api/academic-levels')



        dispatch({
            type: REQUEST_ACADEMIC_LEVELS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_ACADEMIC_LEVELS_FAIL,
            error: error
        })

    }
}

export const adminFetchAcademicLevels = (levelUrl = '/api/auth/admin/academic-levels') => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_ACADEMIC_LEVELS })

        const { data } = await axios.get(levelUrl)


        dispatch({
            type: REQUEST_ACADEMIC_LEVELS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_ACADEMIC_LEVELS_FAIL,
            error: error
        })

    }
}
