import {
    REQUEST_ACADEMIC_LEVELS,
    REQUEST_ACADEMIC_LEVELS_SUCCESS,
    REQUEST_ACADEMIC_LEVELS_FAIL,
    REQUEST_PAPER_TYPES,
    REQUEST_PAPER_TYPES_SUCCESS,
    REQUEST_PAPER_TYPES_FAIL,
    REQUEST_SUBJECT_AREAS,
    REQUEST_SUBJECT_AREAS_SUCCESS,
    REQUEST_SUBJECT_AREAS_FAIL,
    REQUEST_ORDERS,
    REQUEST_ORDERS_SUCCESS,
    REQUEST_ORDERS_FAIL,
    REQUEST_PREFERED_ENGLISH,
    REQUEST_PREFERED_ENGLISH_SUCCESS,
    REQUEST_PREFERED_ENGLISH_FAIL,
    REQUEST_PAPER_FORMAT, REQUEST_PAPER_FORMAT_SUCCESS, REQUEST_PAPER_FORMAT_FAIL,
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





export const OrderSubjectAreaReducer = (state = { allSubjectAreas: [], links:{} , meta:{}} , action) => {
    switch(action.type){

        case REQUEST_SUBJECT_AREAS:
            return { loading: true , allSubjectAreas: [] , links:{} , meta:{} }


        case REQUEST_SUBJECT_AREAS_SUCCESS:

            return { loading: false ,  allSubjectAreas: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case REQUEST_SUBJECT_AREAS_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}


export const OrderPrefferedEnglishReducer = (state = { allPreffEnglish: [], links:{} , meta:{}} , action) => {
    switch(action.type){

        case REQUEST_PREFERED_ENGLISH:
            return { loading: true , allPreffEnglish: [] , links:{} , meta:{} }


        case REQUEST_PREFERED_ENGLISH_SUCCESS:

            return { loading: false ,  allPreffEnglish: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case REQUEST_PREFERED_ENGLISH_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}




export const OrderPaperFormatReducer = (state = { allPaperFormats: [], links:{} , meta:{}} , action) => {
    switch(action.type){

        case REQUEST_PAPER_FORMAT:
            return { loading: true , allPaperFormats: [] , links:{} , meta:{} }


        case REQUEST_PAPER_FORMAT_SUCCESS:

            return { loading: false ,  allPaperFormats: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case REQUEST_PAPER_FORMAT_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}





export const OrdersReducer = (state = { orders: [], links:{} , meta:{}} , action) => {
    switch(action.type){

        case REQUEST_ORDERS:
            return { loading: true , orders: [] , links:{} , meta:{} }


        case REQUEST_ORDERS_SUCCESS:

            return { loading: false ,  orders: action.payload.data ,  links:action.payload.links , meta:action.payload.meta }

        case REQUEST_ORDERS_FAIL:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}

