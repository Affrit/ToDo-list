import { IUserData } from './IUserData';
import { ITask } from './ITask';
import { ITodoSettings, ITodoSavedSettings } from './ITodoSettings';

export interface AuthState {
  isAuth: boolean;
  userData: IUserData;
}

export interface ITodoState {
  tasks: Array<ITask>;
  settings: ITodoSettings;
  savedSettings: ITodoSavedSettings;
}
