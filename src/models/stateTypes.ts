import { IUserData } from './IUserData';
import { ITask } from './ITask';
import { ITodoSettings, ITodoSavedSettings } from './ITodoSettings';
import { SerializedError } from '@reduxjs/toolkit';

export interface AuthState {
  isAuth: boolean;
  userData: IUserData;
  error: string;
}

export interface ITodoState {
  tasks: Array<ITask>;
  settings: ITodoSettings;
  savedSettings: ITodoSavedSettings;
}
