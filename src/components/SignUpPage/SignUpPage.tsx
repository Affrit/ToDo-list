import React, { FC, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxSelector';
import { authSlice } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../PrivateRoute/authSelector';
import { IUserData } from '../../models/IUserData';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { IUserDataErrors } from '../../models/IUserData';
import { signUpUser } from '../../store/reducers/authSlice';
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

  if (!values.password2) {
    errors.password2 = 'Required';
  } else if (values.password2.length < 5) {
    errors.password2 = 'Must be 5 characters or longer';
  } else if (values.password !== values.password2) {
    errors.password2 = 'passwords must be equal'
  }

  return errors;
}

export const SignUpPage: FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { clearError } = authSlice.actions
  const { isAuth, error } = useAppSelector(authSelector)
  const [nameError, setNameError] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const [password2Error, setPassword2Error] = useState<boolean>(false)
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password2: '',
    },
    validate,
    onSubmit: values => {
      dispatch(signUpUser(values))
    },
  })

  useEffect(() => {
      setNameError(!!(formik.touched.name && formik.errors.name))
      setEmailError(!!(formik.touched.email && formik.errors.email))
      setPasswordError(!!(formik.touched.password && formik.errors.password))
      setPassword2Error(!!(formik.touched.password2 && formik.errors.password2))
  }, [
    formik.touched.name, formik.touched.email, formik.touched.password, formik.touched.password2,  
    formik.errors.name, formik.errors.email, formik.errors.password, formik.errors.password2
  ])

  useEffect(() => {
    if (error) {
      setAlertOpen(true)
    }
    if (isAuth) {
      navigate('/')
    }
  }, [navigate, error, isAuth])

  const onSignInClicked = ():void => {
    navigate('/sign-in')
  }

  const onAlertClose = (): void => {
    setAlertOpen(false)
    setTimeout(() => {
      dispatch(clearError())
    }, 500)
  }

  return (
    <div className="sign-in">
      <form className="form" onSubmit={formik.handleSubmit}>
        <h1>Sign-up form</h1>
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
            error={emailError}
            fullWidth={true}
            helperText={emailError && formik.errors.email}
            id="email"
            name="email"
            type="email"
            label="Email Address"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
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

        <div className='form__item'>
          <TextField
            error={password2Error}
            fullWidth={true}
            helperText={password2Error && formik.errors.password2}
            id="password2"
            name="password2"
            type="password"
            label="repeat password"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
          />
        </div>

        <Button type="submit" variant="contained">Sign-up</Button>

        <div className='form__link'>
          <span className='form__link-text'>
            already have an account?
          </span>
          <Button
            type="button"
            variant="contained"
            size='small'
            onClick={onSignInClicked}
          >
            sign-in
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
