import {GET_COMPANIES, GET_INTERNSHIPS, GET_VACANCIES} from '../actions/types'

const initialState = {
    internships: [],
    companies: [],
    vacancies: []
 }
 
export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case GET_VACANCIES:
            return {
                ...state,
                vacancies: action.payload
            }
        case GET_INTERNSHIPS:
            return {
                ...state,
                interships: action.payload
            }
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            }
        default:
            return state;
    }
}