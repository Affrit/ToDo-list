import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from '../ToDoList/ToDoList';
import { useAppDispatch } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import './style.scss'

export const TodoPage: FC = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authToggle } = authSlice.actions

  const onToLoginClicked = (): void => {
    dispatch(authToggle(false))
    localStorage.removeItem('ToDo-remebered')
    navigate('/sign-in')
  }

  return (
    <div className="todo">
      <div className='header'>
        <div className='header__item'>
          <span className='header__name'>USERNAME</span>
          <Button onClick={onToLoginClicked} variant="contained">logOut</Button>
        </div>
      </div>
      <div className='todoWrap'>
        <ToDoList />
      </div>
    </div>
  )
}
