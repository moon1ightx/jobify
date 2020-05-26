import {GET_HACKATHONS, GET_STORIES, GET_STACKS, GET_TESTS, ADD_ROADMAP} from '../actions/types'

const initialState = {
    stacks: [],
    stories: [],
    hackathons: [],
    tests: []
 }
 
export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case GET_STACKS:
            return {
                ...state,
                stacks: action.payload
            }
        case GET_STORIES:
            return {
                ...state,
                stories: action.payload
            }
        case GET_HACKATHONS:
            return {
                ...state,
                hackathons: action.payload
            }
         case GET_TESTS:
            return {
                ...state,
                tests: action.payload
            }
        case ADD_ROADMAP:
            return {
                ...state,
            }
        default:
            return state;
    }
}