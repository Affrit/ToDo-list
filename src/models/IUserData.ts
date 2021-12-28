import { ITask } from "./ITask";

export interface IUserData {
  name?: string;
  password?: string;
  password2?: string;
  email?: string;
  tasks?: Array<ITask>;
  userId?: null | number;
}

export type IUserDataErrors = Omit<IUserData, 'tasks' | 'userId'>
