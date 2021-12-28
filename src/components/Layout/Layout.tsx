import React, { FC } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './style.scss'

interface IProps {
  children: JSX.Element
}

const theme = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#6F7E8C',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'white',
          background: '#12355a',
        },
      },
    },
  },
});

export const Layout: FC<IProps> = ({ children }): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <div className='layout'>
        {children}
      </div>
    </ThemeProvider>
  )
}
