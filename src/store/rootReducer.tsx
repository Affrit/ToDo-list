import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./reducers/authSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
})
