import {GET_COMPANIES, GET_INTERNSHIPS, GET_VACANCIES, GET_DEGREES, GET_UNIVERS, GET_TECHNOS, GET_JOB_AREAS} from '../actions/types'

const initialState = {
    internships: [],
    companies: [],
    vacancies: [],
    technos: [],
    univers: [],
    job_areas: [],
    degrees: []
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
                internships: action.payload
            }
        case GET_COMPANIES:
            return {
                ...state,
                companies: action.payload
            }
        case GET_DEGREES:
            return {
                ...state,
                degrees: action.payload
            }  
        case GET_JOB_AREAS:
            return {
                ...state,
                job_areas: action.payload
            }
        case GET_UNIVERS:
            return {
                ...state,
                univers: action.payload
            }
        case GET_TECHNOS:
            return {
                ...state,
                technos: action.payload
            }           
        default:
            return state;
    }
}