import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "./reducers/authSlice"
import todoReducer from "./reducers/todoSlice"

export const rootReducer = combineReducers({
  auth: authReducer,
  todo: todoReducer,
})
