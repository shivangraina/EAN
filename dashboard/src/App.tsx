import 'antd/dist/antd.css';
import axios from 'axios';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import { RESET } from './redux/types';
import Routes from './Routes';

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    const { dispatch } = store;
    if (err.response) {
      const { status } = err.response;
      if (status === 403) {
        dispatch({ type: RESET });
      }

      if (status === 500) {
        alert('Server Error');
      }
    } else {
      // Network error
      alert('Server or Network Error');
    }

    return Promise.reject(err);
  },
);

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
