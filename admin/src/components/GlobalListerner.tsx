import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppState } from '../redux';
import { useDidUpdate } from '../reusable/hooks';

const GlobalListener = withRouter(({ history }) => {
  const teacher = useSelector((state: AppState) => state.rootStore.teacher);

  useDidUpdate(() => {
    // If store is reset due to token expiry
    if (!teacher) {
      localStorage.removeItem('admin-token');
      axios.defaults.headers.common['Authorization'] = '';

      alert('Session expired, Log In again to continue');

      history.push('auth');
    }
  }, [teacher]);

  return <></>;
});

export default GlobalListener;
