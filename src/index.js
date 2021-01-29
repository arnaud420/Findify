import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { authUser } from './actions/auth';
import './styles/app.scss';

const token = Cookies.get('access_token');
if (token) {
  store.dispatch(authUser(token));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
