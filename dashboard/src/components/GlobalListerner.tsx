import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux';
import { useDidUpdate } from '../reusables/hooks/useDidUpdate';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const GlobalListener = withRouter(({ history }) => {
  const teacher = useSelector((state: AppState) => state.rootStore.teacher);

  useDidUpdate(() => {
    // If store is reset due to token expiry
    if (!teacher) {
      localStorage.removeItem('teacher-token');
      axios.defaults.headers.common['Authorization'] = '';

      alert('Session expired, Log In again to continue');

      history.replace('auth');
    }
  }, [teacher]);
  return <></>;
});

export default GlobalListener;
