import {GET_HACKATHONS, GET_STORIES, GET_STACKS} from '../actions/types'

const initialState = {
    stacks: [],
    stories: [],
    hackathons: []
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
        default:
            return state;
    }
}