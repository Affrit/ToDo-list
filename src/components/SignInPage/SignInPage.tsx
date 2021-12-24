import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../PrivateRoute/authSelector';
import { IUserData, IUserDataErrors } from '../../models/IUserData';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { loginUser } from '../../store/reducers/authSlice';
import { getRemeberedUser } from '../helpers/authHelpers';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import AlertTitle from '@mui/material/AlertTitle';
import './style.scss'

const validate = (values: IUserData) => {
  const errors: IUserDataErrors = {}

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 5) {
    errors.name = 'Must be 5 characters or longer';
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
  const { authToggle, clearError } = authSlice.actions
  const { isAuth, error } = useAppSelector(authSelector)
  const [nameError, setNameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      dispatch(loginUser(values))
    },
  })

  useEffect(() => {
    setNameError(!!(formik.touched.name && formik.errors.name))
    setPasswordError(!!(formik.touched.password && formik.errors.password))
  }, [
    formik.touched.name, formik.touched.password,
    formik.errors.name, formik.errors.password,
  ])

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth])

  useEffect(() => {
    const remeberedUser: IUserData | null = getRemeberedUser() as IUserData
    if (remeberedUser) {
      dispatch(loginUser(remeberedUser))
    }
  }, [dispatch])

  useEffect(() => {
    if (error) {
      setAlertOpen(true)
    } else {
      setAlertOpen(false)
    }
  }, [error])

  const onSignUpClicked = (): void => {
    navigate('/sign-up')
  }

  const onAlertClose = (): void => {
    dispatch(clearError())
  }

  return (
    <div className="sign-in">
      <h1 className='sign-in__title'>You have to login to start using ToDo app</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1 className='form__title'>Login form</h1>
        <div className='form__item'>
          <TextField
            error={nameError}
            fullWidth={true}
            //autoComplete={'off'}
            //size={'small'}
            helperText={nameError && formik.errors.name}
            id="name"
            name="name"
            label="name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>

        <div className='form__item'>
          <TextField
            error={passwordError}
            fullWidth={true}
            helperText={passwordError && formik.errors.password}
            id="password"
            name="password"
            type="password"
            label="password"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>

        <Button type="submit" variant="contained">Login</Button>
        <div className='form__link'>
          <span className='form__link-text'>
            haven't an account yet?
          </span>
          <Button
            type="button"
            variant="contained"
            size='small'
            onClick={onSignUpClicked}
          >
            sign-up
          </Button>
        </div>

        <div className='form__alert'>
          <Collapse in={isAlertOpen}>
            <Alert severity="error" action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={onAlertClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
              sx={{ mb: 2 }}
            >
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          </Collapse>
        </div>
      </form>
    </div>
  );
}
