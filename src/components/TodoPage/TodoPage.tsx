import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from '../ToDoList/ToDoList';
import './style.css'

export const TodoPage: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onToLoginClicked = () => {
    navigate('/login')
  }

  return (
    <div className="todo">
      <div className='nav'>
        <Button onClick={onToLoginClicked} variant="contained">to Login</Button>
      </div>
      <div className='todoWrap'>
        <ToDoList />
      </div>
    </div>
  )
}
