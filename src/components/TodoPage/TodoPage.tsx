import React, { FC } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ToDoList } from '../ToDoList/ToDoList';
import './style.css'

export const TodoPage: FC = (): JSX.Element => {
  const navigate = useNavigate()

  const onToLoginClicked = (): void => {
    navigate('/sign-in')
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
