import { AuthState } from "../../models/stateTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuth: false,
  userData: {
    name: '',
    email: '',
    password: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authToggle(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
    }
  }
})

export default authSlice.reducer
