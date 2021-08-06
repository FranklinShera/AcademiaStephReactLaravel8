import {
    USER_LOGIN_REQUEST ,
    USER_LOGIN_SUCCESS ,
    USER_LOGIN_FAIL,
    USER_REGISTER_REQUEST ,
    CLIENT_LOGIN_REQUEST ,
    CLIENT_LOGIN_SUCCESS ,
    CLIENT_LOGIN_FAIL,
    CLIENT_REGISTER_REQUEST,
    USER_IN_ADMIN_PANEL ,
    USER_OUT_ADMIN_PANEL,
    ADMIN_SIDEBAR_POSITION,
    USER_REGISTER_SUCCESS ,
    USER_REGISTER_FAIL,
    USER_REFRESH,
    CLIENT_REFRESH,
    USER_LOGOUT,
    CLIENT_LOGOUT
} from '../constants/AuthUserConstants'





export const AuthUserReducer = (state = {loggedInUser: {} , notifications: [], auth: false} , action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return { loading: true , loggedInUser: {} ,notifications: [], auth: false }

        case USER_REFRESH:

            return { loading: false ,  loggedInUser: action.payload.admin , notifications :action.payload.notifications, auth: true }

        case USER_LOGOUT:
            localStorage.removeItem("authUser")
            return { loading: false , loggedInUser: {} , auth: false }

        case USER_LOGIN_SUCCESS:
            localStorage.setItem("authUser", JSON.stringify(action.payload.user))

            return { loading: false , loggedInUser: action.payload.admin , notifications :action.payload.notifications, auth: true }

        case USER_LOGIN_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}




export const AuthClientReducer = (state = { loggedInClient: {} ,notifications: [], clientAuth: false } , action) => {
    switch(action.type){
        case CLIENT_LOGIN_REQUEST:
            return { loading: true , loggedInClient: {} ,notifications: [], clientAuth: false }

        case CLIENT_REFRESH:

            return { loading: false , loggedInClient: action.payload.client , notifications:action.payload.notifications, clientAuth: true }

        case CLIENT_LOGOUT:
            // localStorage.removeItem("clientAuth")

            return { loading: false , loggedInClient: {} , clientAuth: false }


        case CLIENT_LOGIN_SUCCESS:

            // localStorage.setItem("clientAuth", JSON.stringify(action.payload.user))

            return { loading: false , loggedInClient: action.payload.client , notifications:action.payload.notifications, clientAuth: true }

        case CLIENT_LOGIN_FAIL:
            return { loading: false , error: action.payload }

        default:
            return state
    }
}




export const RegisterUserReducer = (state = {loading:false , registered: false, error: []} , action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true , registered: false}

        case USER_REGISTER_SUCCESS:
            return {loading: false , registered: true }

        case USER_REGISTER_FAIL:
            return {loading: false , error: action.payload}

        default:
            return state
    }
}




export const AdminPanelReducer = (state = { inAdminPanel: false , sidebarPosition: 0} , action) => {
    switch(action.type){
        case USER_IN_ADMIN_PANEL:
            return { inAdminPanel: action.payload }

        case USER_OUT_ADMIN_PANEL:
            return { inAdminPanel: action.payload }

        case ADMIN_SIDEBAR_POSITION:
            return { sidebarPosition: action.payload.pos, inAdminPanel: action.payload.admin }

        default:
            return state
    }
}




