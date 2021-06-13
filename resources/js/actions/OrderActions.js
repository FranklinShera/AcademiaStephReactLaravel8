import {
    REQUEST_ACADEMIC_LEVELS,
    REQUEST_ACADEMIC_LEVELS_SUCCESS,
    REQUEST_ACADEMIC_LEVELS_FAIL, REQUEST_CLIENT_ORDERS, CLIENT_ORDERS_SUCCESS, CLIENT_ORDERS_FAIL,
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

export const ClientFetchOrders = (levelUrl) => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_CLIENT_ORDERS })

        const { data } = await axios.get(levelUrl)


        dispatch({
            type: CLIENT_ORDERS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: CLIENT_ORDERS_FAIL,
            error: error
        })

    }
}
