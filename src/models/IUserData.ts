import { ITask } from "./ITask";

export interface IUserData {
  name: string;
  password: string;
  email?: string;
  tasks?: Array<ITask>;
  userId?: null | number;
}

export interface IUserDataErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}
