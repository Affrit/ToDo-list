import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';

export const SignInPage: FC = () => {
  const dispatch = useAppDispatch()
  const { authToggle } = authSlice.actions
  const { isAuth } = useAppSelector(({ auth: { isAuth } }) => ({ isAuth }))

  useEffect(() => {
    console.log(isAuth)
  }, [isAuth])

  const onLogIn = () => {
    dispatch(authToggle(true))
  }

  const onLogOut = () => {
    dispatch(authToggle(false))
  }

  return (
      <div className="sign-in">
        <Button onClick={onLogIn} variant="contained">logIn</Button>
        <Button onClick={onLogOut} variant="contained">logOut</Button>
      </div>
  )
}
