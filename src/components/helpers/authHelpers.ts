import { ITask } from './../../models/ITask';
import { IUserData } from "../../models/IUserData"

export const getAllUsersFromStorage = (): Array<IUserData> => {
  const allUsersFromStorage: string | null = localStorage.getItem('ToDo-users')
  if (typeof allUsersFromStorage === 'string') {
    const allUsers: Array<IUserData> = JSON.parse(allUsersFromStorage)
    return allUsers
  } else {
    return []
  }
}

export const getUser = (user: IUserData): IUserData | undefined => {
  const { name, password } = user
  const allUsers: Array<IUserData> = getAllUsersFromStorage()
  return allUsers.find((user: IUserData) => {
    return user.name === name && user.password === password
  })
}

export const isUserExists = (user: IUserData): boolean => {
  const allUsers: Array<IUserData> = getAllUsersFromStorage()
  return allUsers.some((ArrUser: IUserData): boolean => ArrUser.name === user.name)
}

export const createNewUser = (user: IUserData): void => {
  const allUsers: Array<IUserData> = getAllUsersFromStorage()
  const newUsers: string = JSON.stringify([...allUsers, user])
  localStorage.setItem('ToDo-users', newUsers)
}

export const updateUser = (user: IUserData, tasks: Array<ITask>): void => {
  const allUsers: Array<IUserData> = getAllUsersFromStorage()
  allUsers.find((userInStorage: IUserData) => {
    if (user.userId === userInStorage.userId) {
      userInStorage.tasks = tasks
    }
  })
  const newUsers: string = JSON.stringify(allUsers)
  localStorage.setItem('ToDo-users', newUsers)
}

export const rememberUser = (user: IUserData): void => {
  const remeberedUser = JSON.stringify(user)
  localStorage.setItem('ToDo-remebered', remeberedUser)
}

export const getRemeberedUser = (): IUserData | null => {
  const rememberedUserFromStorage: string | null = localStorage.getItem('ToDo-remebered')
  if (typeof rememberedUserFromStorage === 'string') {
    const rememberedUser: IUserData = JSON.parse(rememberedUserFromStorage)
    return rememberedUser
  } else {
    return null
  }
}
