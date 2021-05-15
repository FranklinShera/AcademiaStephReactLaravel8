import {
    USER_LOGIN_REQUEST ,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST ,
    USER_IN_ADMIN_PANEL,
    USER_OUT_ADMIN_PANEL,
    ADMIN_SIDEBAR_POSITION,
    USER_REGISTER_SUCCESS ,
    USER_REGISTER_FAIL,
    USER_REFRESH,
    USER_LOGOUT
} from '../constants/AuthUserConstants'

import axios from 'axios'


axios.defaults.withCredentials = true;

const setHeader = (token) => {
    axios.interceptors.request.use(
         config => {
              config.headers.authorization = `Bearer ${token}`
              return config;
         },
         error => {
             return  Promise.reject(error)
         }
    )
}


export const loginUser = (user) => async (dispatch) => {


    try {

        dispatch({ type: USER_LOGIN_REQUEST })

       const { data } = await axios.post('http://localhost:5000/auth/login', user)
        

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })  
        
        setHeader(data.access_token)

    } catch (error) {
          dispatch({
            type: USER_LOGIN_FAIL,
            error: error 
        })

    }
}


export const registerUser = (user) => async (dispatch) => {


    try {

        dispatch({ type: USER_REGISTER_REQUEST })

       const data  = await axios.post('http://localhost:5000/auth/register', user)

        dispatch({type: USER_REGISTER_SUCCESS})
        
        

    } catch (error) {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error 
        })

    }
}

export const refreshUser = (refreshType = 0) => async (dispatch) => {
  
        if(refreshType !== 1) {
          dispatch({ type: USER_LOGIN_REQUEST })
        } 

        const { data } = await axios.post('http://localhost:5000/auth/refresh-token')

         if(data.access_token) {
            setHeader(data.access_token)

            dispatch({ type: USER_REFRESH , payload : data})
         }else{
            dispatch({
                type: USER_LOGIN_FAIL,
                error: { message: "Unauthenticated!"} 
            })
         }

       
}

export const logoutUser = () => async (dispatch) => {

       const { status } = await axios.delete('http://localhost:5000/auth/logout')

       if(status == 200)
        {
            dispatch({ type: USER_LOGOUT })
        }

       
}

export const authUserIn = () => async (dispatch) => {

       
            dispatch({ type: USER_IN_ADMIN_PANEL ,  payload:  true })
        
       
}



export const authUserOut = () => async (dispatch) => {

       
            dispatch({ type: USER_OUT_ADMIN_PANEL , payload: false })
        
       
}

export const sidebarPos = (pos) => async (dispatch) => {

       
            dispatch({ type: ADMIN_SIDEBAR_POSITION ,  payload: { admin:true , pos: pos } })
        
       
}