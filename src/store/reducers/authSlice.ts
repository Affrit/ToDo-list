import { ITask } from './../../models/ITask';
import { IUserData } from './../../models/IUserData';
import { AuthState } from "../../models/stateTypes";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser } from "../../components/helpers/authHelpers";
import { rememberUser } from '../../components/helpers/authHelpers';
import { updateUser } from '../../components/helpers/authHelpers';

const initialState: AuthState = {
  isAuth: false,
  userData: {
    name: '',
    email: '',
    userId: null,
    tasks: [],
  },
  error: '',
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: IUserData) => {
    const userFromStorage = getUser(userData)
      if (!userFromStorage) {
        throw new Error('Incorrect username or password')
      } else {
        rememberUser(userFromStorage)
        return userFromStorage
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
    saveTasks(state, action: PayloadAction<Array<ITask>>) {
      state.userData.tasks = action.payload
      updateUser(state.userData, action.payload)
    },
    clearError(state) {
      state.error = initialState.error
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuth = true
        state.userData.name = action.payload.name
        state.userData.email = action.payload.email
        state.userData.tasks = action.payload.tasks
        state.userData.userId = action.payload.userId
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
