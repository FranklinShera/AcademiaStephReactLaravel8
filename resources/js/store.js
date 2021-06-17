import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reviewsListReducer } from './reducers/reviewsListReducers'

import { AuthUserReducer,AuthClientReducer,RegisterUserReducer, AdminPanelReducer } from './reducers/AuthUserReducers'

import {
    ClientOrdersReducer,
    OrderAcademicLevelsReducer,
    OrderPaperTypesReducer,
    OrderSubjectAreaReducer
} from './reducers/OrderReducers'

const reducer =  combineReducers({
    reviewList: reviewsListReducer,
    authUser: AuthUserReducer,
    authClient: AuthClientReducer,
    registration: RegisterUserReducer,
    adminPanel: AdminPanelReducer,
    academicLevels: OrderAcademicLevelsReducer,
    paperTypes: OrderPaperTypesReducer,
    subjectAreas: OrderSubjectAreaReducer,
    clientOrders: ClientOrdersReducer
})


const initialState = {}


const middleware = [thunk]

const store = createStore(
                reducer,
                initialState,
                composeWithDevTools(applyMiddleware(...middleware))
                )


export default store;
