import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import './App.css';
import { SignInPage } from './components/SignInPage/SignInPage';
import { TodoPage } from './components/TodoPage/TodoPage';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path='/login' element={<SignInPage />} />
            <Route path='/' element={
              <PrivateRoute>
                <TodoPage />
              </PrivateRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
