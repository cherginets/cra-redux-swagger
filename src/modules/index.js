import { combineReducers } from 'redux'
import {counter} from './counter'
import {api_client} from './api_client'

export default combineReducers({
    counter,
    api_client,
})