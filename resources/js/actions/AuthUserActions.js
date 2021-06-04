import {
    USER_LOGIN_REQUEST ,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST ,
    CLIENT_LOGIN_REQUEST ,
    CLIENT_LOGIN_SUCCESS ,
    CLIENT_LOGIN_FAIL,
    CLIENT_REGISTER_REQUEST,
    USER_IN_ADMIN_PANEL,
    USER_OUT_ADMIN_PANEL,
    ADMIN_SIDEBAR_POSITION,
    USER_REGISTER_SUCCESS ,
    USER_REGISTER_FAIL,
    USER_REFRESH,
    CLIENT_REFRESH,
    USER_LOGOUT,
    CLIENT_LOGOUT
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

        const { data } = await axios.post('/api/login', user)

        // setHeader(data.token)

        const loggedUser = await axios.post('/api/auth/user')


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: loggedUser.data
        })


    } catch (error) {
          dispatch({
            type: USER_LOGIN_FAIL,
            error: error
        })

    }
}

export const loginClient = (client) => async (dispatch) => {


    try {

        dispatch({ type: CLIENT_LOGIN_REQUEST })

        const { data } = await axios.post('/api/client-login', client)



        const loggedClient = await axios.post('/api/auth/client')


        dispatch({
            type: CLIENT_LOGIN_SUCCESS,
            payload: loggedClient.data
        })


    } catch (error) {
          dispatch({
            type: CLIENT_LOGIN_FAIL,
            error: error
        })

    }
}


export const registerUser = (user) => async (dispatch) => {


    try {

        dispatch({ type: USER_REGISTER_REQUEST })

       const data  = await axios.post('/api/register', user)

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

        const res = await axios.post('/api/auth/refresh-token')


         if(res.status == 200) {

            const refUser =  await axios.post('/api/auth/user')

            dispatch({ type: USER_REFRESH , payload : refUser.data})

         }else{

            dispatch({
                type: USER_LOGIN_FAIL,
                error: { message: "Unauthenticated!"}
            })

         }


}
export const refreshClient = (refreshType = 0) => async (dispatch) => {

        if(refreshType !== 1) {

          dispatch({ type: CLIENT_LOGIN_REQUEST })

        }

        const res = await axios.post('/api/auth/refresh-client-token')


         if(res.status == 200) {

            const refClient =  await axios.post('/api/auth/client')

            dispatch({ type: CLIENT_REFRESH , payload : refClient.data})

         }else{

            dispatch({
                type: CLIENT_LOGIN_FAIL,
                error: { message: "Unauthenticated!"}
            })

         }


}



export const logoutUser = () => async (dispatch) => {

       const { status } = await axios.post('/api/auth/logout')

       if(status == 200)
        {
            dispatch({ type: USER_LOGOUT })
        }


}


export const logoutClient = () => async (dispatch) => {

       const { status } = await axios.post('/api/auth/client-logout')

       if(status == 200)
        {
            dispatch({ type: CLIENT_LOGOUT })
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
