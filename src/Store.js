import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from './AuthReducer'

export default configureStore({
  reducer:persistReducer({
        key:'ubankStore',
        version:1,
        storage
    },combineReducers({
        auth:authReducer,
    }))
  
})