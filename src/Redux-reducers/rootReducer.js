import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { taskReducer } from './taskReducer'
import {ngrokReducer} from './ngrokReducer'

const rootReducer = combineReducers({
    UserReducer: userReducer,
    TaskReducer: taskReducer,
    NgrokReducer: ngrokReducer,
})

export default rootReducer