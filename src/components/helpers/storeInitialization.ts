import { IUserData } from "../../models/IUserData"

export const storageInitialization = (): void => {
  const allUsersFromStorage: string | null = localStorage.getItem('ToDo-users')
  if (!allUsersFromStorage) {
    const defaultUser: IUserData = { 
      name: 'admin', 
      email: 'test@test.com', 
      password: 'admin',
      tasks: [],
    }
    const users: string = JSON.stringify([defaultUser])
    localStorage.setItem('ToDo-users', users)
  }
}
