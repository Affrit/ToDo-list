import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppSelector } from '../../hooks/useReduxSelector';
//import { publicRoutes, privateRoutes } from "../../routes";

/* export const AppRouter: FC = (): JSX.Element => {
  const { isAuth } = useAppSelector(({ auth: { isAuth } }) => ({ isAuth }))

  return (
    isAuth === true ?
      <Routes>
        {privateRoutes.map(route => {
          <Route key={route.path} path={route.path} element={route.element} />
        })}
      </Routes>
      :
      <Routes>
        {publicRoutes.map(route => {
          <Route key={route.path} path={route.path} element={route.element} />
        })}
      </Routes>
  )
} */
