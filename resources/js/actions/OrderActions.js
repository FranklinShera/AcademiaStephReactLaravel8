import {
    REQUEST_ACADEMIC_LEVELS,
    REQUEST_ACADEMIC_LEVELS_SUCCESS,
    REQUEST_ACADEMIC_LEVELS_FAIL,
    REQUEST_CLIENT_ORDERS,
    CLIENT_ORDERS_SUCCESS,
    CLIENT_ORDERS_FAIL,
    REQUEST_PAPER_TYPES_SUCCESS, REQUEST_PAPER_TYPES_FAIL, REQUEST_PAPER_TYPES,
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



export const adminFetchPaperTypes = (paperTypeUrl = '/api/auth/admin/paper-types') => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_PAPER_TYPES })

        const { data } = await axios.get(paperTypeUrl)


        dispatch({
            type: REQUEST_PAPER_TYPES_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_PAPER_TYPES_FAIL,
            error: error
        })

    }
}




export const ClientFetchOrders = (ordersUrl) => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_CLIENT_ORDERS })

        const { data } = await axios.get(ordersUrl)


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
