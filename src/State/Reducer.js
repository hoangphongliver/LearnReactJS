import { combineReducers } from 'redux'
import courseReducer from './courseReducer'

export const myReducer = combineReducers({
    course: courseReducer
});
