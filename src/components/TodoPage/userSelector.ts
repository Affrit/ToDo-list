import { IUserData } from './../../models/IUserData';
import { ITask } from './../../models/ITask';

interface IUserSelector {
  auth: {
    userData: IUserData
  }
}

export const userSelector = ({
  auth: {
    userData: {
      name,
      tasks
    }
  }
}: IUserSelector) => ({
  name,
  tasks
})
