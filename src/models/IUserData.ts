import { ITask } from "./ITask";

export interface IUserData {
  name: string;
  password: string;
  email?: string;
  tasks?: Array<ITask>;
}

export interface IUserDataErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}
