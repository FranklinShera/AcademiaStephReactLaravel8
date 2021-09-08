import { createStore,combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { reviewsListReducer } from './reducers/reviewsListReducers'

import { AuthUserReducer,AuthClientReducer,RegisterUserReducer, AdminPanelReducer , AuthTimeReducer} from './reducers/AuthUserReducers'

import {
    ClientOrdersReducer,
    OrderAcademicLevelsReducer, OrderPaperFormatReducer,
    OrderPaperTypesReducer, OrderPrefferedEnglishReducer, OrdersReducer,
    OrderSubjectAreaReducer
} from './reducers/OrderReducers'

const reducer =  combineReducers({
    reviewList: reviewsListReducer,
    authUser: AuthUserReducer,
    appTime: AuthTimeReducer,
    authClient: AuthClientReducer,
    registration: RegisterUserReducer,
    adminPanel: AdminPanelReducer,
    academicLevels: OrderAcademicLevelsReducer,
    paperTypes: OrderPaperTypesReducer,
    subjectAreas: OrderSubjectAreaReducer,
    preffEnglish: OrderPrefferedEnglishReducer,
    paperFormats: OrderPaperFormatReducer,
    Orders: OrdersReducer
})


const initialState = {}


const middleware = [thunk]

const store = createStore(
                reducer,
                initialState,
                composeWithDevTools(applyMiddleware(...middleware))
                )


export default store;
