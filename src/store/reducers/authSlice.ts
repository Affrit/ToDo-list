import { IUserData } from './../../models/IUserData';
import { AuthState } from "../../models/stateTypes";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isDataCorrect } from "../../components/helpers/authHelpers";
import { rememberUser } from '../../components/helpers/authHelpers';

const initialState: AuthState = {
  isAuth: false,
  userData: {
    name: '',
    email: '',
    password: '',
  },
  error: '',
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: IUserData, { rejectWithValue }) => {
      if (!isDataCorrect(userData)) {
        throw new Error('Incorrect username or password')
      } else {
        rememberUser(userData)
        return userData
      }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authToggle(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload
      if (!action.payload) {
        state.userData = initialState.userData
      }
    },
    clearError(state) {
      state.error = initialState.error
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true;
        state.userData = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message as string
      })
  },
})

/*

export const setNewUser = (userData) => async (dispatch, getState) => {
  try {
    if (isUserExists(userData)) {
      throw new Error('Such user has been alredy exists!')
    } else {
      createNewUser(userData)
      dispatch(loginUser(userData))
      dispatch(setClearError())
    }
  } catch (error) {
    console.warn(error)
    const { login: { errors } } = getState()
    if (!errors.some(item => item === error.message)) {
      dispatch(setAuthError(error.message))
    }
  }
}
*/

export default authSlice.reducer
