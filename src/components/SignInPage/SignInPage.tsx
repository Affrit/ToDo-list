import React, { FC, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../PrivateRoute/authSelector';
import { IUserData } from '../../models/IUserData';
import { useFormik } from 'formik';

interface IUserDataErrors {
  name?: string;
  email?: string;
  password?: string;
}

const validate = (values: IUserData) => {
  const errors: IUserDataErrors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 5) {
    errors.name = 'Must be 5 characters or longer';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 5) {
    errors.password = 'Must be 5 characters or longer';
  }

  return errors;
};

export const SignInPage: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { authToggle } = authSlice.actions
  const { isAuth } = useAppSelector(authSelector)

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

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="sign-in">
      <Button onClick={onLogIn} variant="contained">logIn</Button>
      <Button onClick={onLogOut} variant="contained">logOut</Button>
      <Button onClick={onToDoPage} variant="contained">ToDoPage</Button>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password ? <div>{formik.errors.password}</div> : null}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
