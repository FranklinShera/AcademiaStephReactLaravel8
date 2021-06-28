import {
    REQUEST_ACADEMIC_LEVELS,
    REQUEST_ACADEMIC_LEVELS_SUCCESS,
    REQUEST_ACADEMIC_LEVELS_FAIL,
    REQUEST_PAPER_TYPES_SUCCESS,
    REQUEST_PAPER_TYPES_FAIL,
    REQUEST_PAPER_TYPES,
    REQUEST_SUBJECT_AREAS,
    REQUEST_SUBJECT_AREAS_SUCCESS,
    REQUEST_SUBJECT_AREAS_FAIL,
    REQUEST_ORDERS_FAIL,
    REQUEST_ORDERS_SUCCESS,
    REQUEST_ORDERS,
    REQUEST_PREFERED_ENGLISH,
    REQUEST_PREFERED_ENGLISH_SUCCESS,
    REQUEST_PREFERED_ENGLISH_FAIL,
    REQUEST_PAPER_FORMAT_SUCCESS, REQUEST_PAPER_FORMAT, REQUEST_PAPER_FORMAT_FAIL,
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



export const fetchPaperTypes = () => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_PAPER_TYPES })

        const { data } = await axios.get('/api/paper-types')


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







export const adminFetchSubjectAreas = (subjectAreaUrl = '/api/auth/admin/subject-areas') => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_SUBJECT_AREAS })

        const { data } = await axios.get(subjectAreaUrl)


        dispatch({
            type: REQUEST_SUBJECT_AREAS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_SUBJECT_AREAS_FAIL,
            error: error
        })

    }
}








export const fetchSubjectAreas = () => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_SUBJECT_AREAS })

        const { data } = await axios.get('/api/subject-areas')


        dispatch({
            type: REQUEST_SUBJECT_AREAS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_SUBJECT_AREAS_FAIL,
            error: error
        })

    }
}




export const adminFetchPrefferedEnglish = (prefEnglishUrl = '/api/auth/admin/preffered-english') => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_PREFERED_ENGLISH })

        const { data } = await axios.get(prefEnglishUrl)


        dispatch({
            type: REQUEST_PREFERED_ENGLISH_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_PREFERED_ENGLISH_FAIL,
            error: error
        })

    }
}








export const fetchPrefferedEnglish = () => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_PREFERED_ENGLISH })

        const { data } = await axios.get('/api/preffered-english')


        dispatch({
            type: REQUEST_PREFERED_ENGLISH_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_PREFERED_ENGLISH_FAIL,
            error: error
        })

    }
}









export const adminFetchPaperFormats = (paperFormatsUrl = '/api/auth/admin/paper-formats') => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_PAPER_FORMAT })

        const { data } = await axios.get(paperFormatsUrl)


        dispatch({
            type: REQUEST_PAPER_FORMAT_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_PAPER_FORMAT_FAIL,
            error: error
        })

    }
}








export const fetchPaperFormats = () => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_PAPER_FORMAT })

        const { data } = await axios.get('/api/paper-formats')


        dispatch({
            type: REQUEST_PAPER_FORMAT_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_PAPER_FORMAT_FAIL,
            error: error
        })

    }
}














export const ClientFetchOrders = (ordersUrl) => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_ORDERS })

        const { data } = await axios.get(ordersUrl)


        dispatch({
            type: REQUEST_ORDERS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_ORDERS_FAIL,
            error: error
        })

    }
}






export const adminFetchOrders = (ordersUrl = '/api/auth/admin/orders') => async (dispatch) => {


    try {


        dispatch({ type: REQUEST_ORDERS })

        const { data } = await axios.get(ordersUrl)


        dispatch({
            type: REQUEST_ORDERS_SUCCESS,
            payload: data
        })


    } catch (error) {
          dispatch({
            type: REQUEST_ORDERS_FAIL,
            error: error
        })

    }
}
