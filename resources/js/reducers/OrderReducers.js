import {
    REQUEST_ACADEMIC_LEVELS ,
    REQUEST_ACADEMIC_LEVELS_SUCCESS ,
    REQUEST_ACADEMIC_LEVELS_FAIL ,
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

