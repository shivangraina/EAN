import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTeacher } from '../../redux/action';
import { TeacherType } from '../../redux/types';

const useInit = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('admin-token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token || ''}`;

  useEffect(() => {
    if (token) {
      const teacher: TeacherType = jwt_decode(token);

      dispatch(setTeacher(teacher));
    }
  }, []);
};

export default useInit;
