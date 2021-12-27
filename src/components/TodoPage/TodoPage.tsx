import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from '../ToDoList/ToDoList';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { todoSlice } from '../../store/reducers/todoSlice';
import { userSelector } from './userSelector';
import { toDoSelector } from '../ToDoList/toDoSelector';
import './style.scss'
import { ITask } from '../../models/ITask';

export const TodoPage: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authToggle, saveTasks } = authSlice.actions
  const { setResetToDo, setTasks } = todoSlice.actions
  const { name, tasks: savedTasks } = useAppSelector(userSelector)
  const { tasks } = useAppSelector(toDoSelector)

  useEffect(() => {
    dispatch(setTasks(savedTasks as Array<ITask>))
  }, [dispatch, setTasks, savedTasks])

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
