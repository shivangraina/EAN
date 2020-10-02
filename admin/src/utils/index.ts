import axios from 'axios';
import store from '../redux';
import { RESET } from '../redux/types';

axios.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    const { dispatch } = store;

    if (err.response) {
      const { status } = err.response;
      if (status === 403) {
        console.log('Rested');
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

export { store };
