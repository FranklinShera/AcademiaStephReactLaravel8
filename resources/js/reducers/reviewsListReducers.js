import {
    REVIEWS_LIST_REQUEST ,
    REVIEWS_LIST_SUCCESS ,
    REVIEWS_LIST_FAIL 
} from '../constants/reviewsConstants'

export const reviewsListReducer = (state = {reviews: []} , action) => {
    switch(action.type){
        case REVIEWS_LIST_REQUEST:
            return {loading: true , reviews: []}
        case REVIEWS_LIST_SUCCESS:
            return {loading: false , reviews: action.payload}
        case REVIEWS_LIST_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state
    }
}