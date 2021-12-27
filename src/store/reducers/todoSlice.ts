import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodoSavedSettings } from "../../models/ITodoSettings";
import { ITask } from "../../models/ITask";
import { ITodoState } from "../../models/stateTypes";

const initialState: ITodoState = {
  tasks: [],
  settings: {
    bGColor: '',
    textColor: '',
  },
  savedSettings: {
    textColorR: '0',
    textColorG: '0',
    textColorB: '0',
    textColorO: '1',
    bGColorR: '199',
    bGColorG: '198',
    bGColorB: '147',
    bGColorO: '1',
  },
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Array<ITask>>) {
      state.tasks = action.payload
    },
    setSavedSettings(state, action: PayloadAction<ITodoSavedSettings>) {
      state.savedSettings = action.payload
    },
    setBGColor(state, action: PayloadAction<string>) {
      state.settings.bGColor = action.payload
    },
    setTextColor(state, action: PayloadAction<string>) {
      state.settings.textColor = action.payload
    },
    setResetToDo(state) {
      state.savedSettings = initialState.savedSettings
      state.settings = initialState.settings
      state.tasks = initialState.tasks
    },
  }
})

export default todoSlice.reducer
