import React, { FC } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '../../hooks/useReduxSelector';

export const PrivateRoute: FC = ({ children }: any) => {
  const { isAuth } = useAppSelector(({ auth: { isAuth } }) => ({ isAuth }))
  return isAuth ? children : <Navigate to="/login" />
}
