
import {combineReducers} from 'redux'

import mainReducer from './mainReducer'
import exploreReducer from './exploreReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
    mainReducer,
    exploreReducer,
    authReducer,
    errorReducer
})