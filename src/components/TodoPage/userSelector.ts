import { IUserData } from './../../models/IUserData';

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
