import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from '../ToDoList/ToDoList';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { userSelector } from './userSelector';
import { toDoSelector } from '../ToDoList/toDoSelector';
import { updateUser } from '../helpers/authHelpers';
import './style.scss'

export const TodoPage: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authToggle, saveTasks } = authSlice.actions
  const { name } = useAppSelector(userSelector)
  const { tasks, bGColor, textColor } = useAppSelector(toDoSelector)

  const onToLoginClicked = (): void => {
    dispatch(saveTasks(tasks))
    dispatch(authToggle(false))
    localStorage.removeItem('ToDo-remebered')
    navigate('/sign-in')
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
