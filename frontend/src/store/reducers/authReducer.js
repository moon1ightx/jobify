
import {USER_LOGIN, USER_SIGNUP, USER_LOGOUT, GET_USER_INFO, ADD_USER_INFO, GET_CV, GET_ROADMAP, UPDATE_USER_INFO} from '../actions/types'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const initialState = {
  isAuth: false,
  currentUserId: null,
  signUpSuccess: false,
  user_info: [], 
  roadmap: []
}

export default function (state=initialState, action){
    console.log(action)
    switch(action.type){
        case USER_SIGNUP:
            return {
                ...state,
                signUpSuccess: !state.signUpSuccess
            }
        case USER_LOGIN:
            const payload = jwt_decode(action.payload)
            if(payload.exp < new Date().getTime() / 1000) {
                return {
                    ...state,
                    isAuth: false,
                    currentUserId: null
                }
            } 
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`
            return {
                ...state,
                isAuth: true,
                currentUserId: payload.user_id
            }
        case USER_LOGOUT:
            localStorage.removeItem('access_token')
            delete axios.defaults.headers.common["Authorization"]
            return {
                ...state,
                isAuth: false,
                currentUserId: null
            }
        case GET_USER_INFO:
            return {
                ...state,
                user_info: action.payload
            }
        case GET_ROADMAP:
            return {
                ...state,
                roadmap: action.payload
            }
        case GET_CV:
            return {
                ...state,
            }
        case ADD_USER_INFO:
            return {
                ...state,
               
                }
         case UPDATE_USER_INFO:
            return {
                ...state,
               
                }
        default:
            return state;
    }
}






