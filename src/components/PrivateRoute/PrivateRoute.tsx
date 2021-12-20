import React, { FC } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../hooks/useReduxSelector';
import { authSelector } from './authSelector'

interface IProps {
  children: JSX.Element
}

export const PrivateRoute: FC<IProps> = ({ children }): JSX.Element => {
  const { isAuth } = useAppSelector(authSelector)
  return isAuth ? children : <Navigate to="/login" />
}
