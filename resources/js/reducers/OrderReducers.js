import {
    REQUEST_ACADEMIC_LEVELS,
    REQUEST_ACADEMIC_LEVELS_SUCCESS,
    REQUEST_ACADEMIC_LEVELS_FAIL,
    REQUEST_CLIENT_ORDERS,
    CLIENT_ORDERS_SUCCESS,
    CLIENT_ORDERS_FAIL,
    REQUEST_PAPER_TYPES,
    REQUEST_PAPER_TYPES_SUCCESS, REQUEST_PAPER_TYPES_FAIL,
} from '../constants/OrderConstants'





export const OrderAcademicLevelsReducer = (state = { allAcademicLevels: [], links:{} , meta:{}} , action) => {
    switch(action.type){
        case REQUEST_ACADEMIC_LEVELS:
            return { loading: true , allAcademicLevels: [] , links:{} , meta:{} }


        case REQUEST_ACADEMIC_LEVELS_SUCCESS:

            return { loading: false ,  allAcademicLevels: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case REQUEST_ACADEMIC_LEVELS_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}

export const OrderPaperTypesReducer = (state = { allPaperTypes: [], links:{} , meta:{}} , action) => {
    switch(action.type){

        case REQUEST_PAPER_TYPES:
            return { loading: true , allPaperTypes: [] , links:{} , meta:{} }


        case REQUEST_PAPER_TYPES_SUCCESS:

            return { loading: false ,  allPaperTypes: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case REQUEST_PAPER_TYPES_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}


export const ClientOrdersReducer = (state = { orders: [], links:{} , meta:{}} , action) => {
    switch(action.type){

        case REQUEST_CLIENT_ORDERS:
            return { loading: true , orders: [] , links:{} , meta:{} }


        case CLIENT_ORDERS_SUCCESS:

            return { loading: false ,  orders: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case CLIENT_ORDERS_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}

