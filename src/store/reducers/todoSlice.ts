import { ITodoSettings, ITodoSavedSettings } from "../../models/ITodoSettings";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ITodoState {
  tasks: Array<object>;
  settings: ITodoSettings;
  savedSettings: ITodoSavedSettings;
}

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
    setTasks(state, action: PayloadAction<Array<object>>) {
      state.tasks = action.payload
    },
    setSavedSettings(state, action: PayloadAction<any>) {
      state.savedSettings = action.payload
    },
    setBGColor(state, action: PayloadAction<any>) {
      state.settings.bGColor = action.payload
    },
    setTextColor(state, action: PayloadAction<any>) {
      state.settings.textColor = action.payload
    },
  }
})

export default todoSlice.reducer
