
import {combineReducers} from 'redux'

import mainReducer from './mainReducer'
import exploreReducer from './exploreReducer'

export default combineReducers({
    mainReducer,
    exploreReducer
})