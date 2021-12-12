import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import { SignInPage } from './components/SignInPage/SignInPage';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <SignInPage />
      </div>
    </Provider>
  )
}

export default App
