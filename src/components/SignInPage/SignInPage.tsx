import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

export const SignInPage: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { authToggle } = authSlice.actions
  const { isAuth } = useAppSelector(({ auth: { isAuth } }) => ({ isAuth }))

  useEffect(() => {
    console.log(isAuth)
  }, [isAuth])

  const onLogIn = (): void => {
    dispatch(authToggle(true))
  }

  const onLogOut = (): void => {
    dispatch(authToggle(false))
  }

  const onToDoPage = (): void => {
    navigate('/')
  } 

  return (
      <div className="sign-in">
        <Button onClick={onLogIn} variant="contained">logIn</Button>
        <Button onClick={onLogOut} variant="contained">logOut</Button>
        <Button onClick={onToDoPage} variant="contained">ToDoPage</Button>
      </div>
  )
}
