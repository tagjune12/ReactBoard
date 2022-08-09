import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '@modules/';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { checkLoggedIn, setTempUser } from '@modules/users/user';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
const middleware =
  process.env.REACT_APP_ENV === 'production'
    ? applyMiddleware(ReduxThunk)
    : applyMiddleware(logger, ReduxThunk);
const store = createStore(rootReducer, composeWithDevTools(middleware));

const loadUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    store.dispatch(setTempUser(user));
    store.dispatch(checkLoggedIn());
  } catch (e) {
    console.log('localStroage is not working');
  }
};

loadUser();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
);
