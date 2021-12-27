import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from '../ToDoList/ToDoList';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { todoSlice } from '../../store/reducers/todoSlice';
import { userSelector } from './userSelector';
import { toDoSelector } from '../ToDoList/toDoSelector';
import { updateUser } from '../helpers/authHelpers';
import { authSelector } from '../PrivateRoute/authSelector';
import './style.scss'
import { IUserData } from '../../models/IUserData';
import { ITask } from '../../models/ITask';

export const TodoPage: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authToggle, saveTasks } = authSlice.actions
  const { setResetToDo, setTasks } = todoSlice.actions
  const { name, tasks: savedTasks } = useAppSelector(userSelector)
  const { isAuth } = useAppSelector(authSelector)
  const { tasks, bGColor, textColor } = useAppSelector(toDoSelector)

  useEffect(() => {
    dispatch(setTasks(savedTasks as Array<ITask>))
  }, [isAuth])

  const onToLoginClicked = (): void => {
    dispatch(saveTasks(tasks))
    dispatch(authToggle(false))
    localStorage.removeItem('ToDo-remebered')
    navigate('/sign-in')
    dispatch(setResetToDo())
  }

  return (
    <div className="todo">
      <div className='header'>
        <div className='header__item'>
          <span className='header__name'>{name}</span>
          <Button onClick={onToLoginClicked} variant="contained">logOut</Button>
        </div>
      </div>
      <div className='todoWrap'>
        <ToDoList />
      </div>
    </div>
  )
}
