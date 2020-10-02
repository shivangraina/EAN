import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TeacherType } from '../../redux/types';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { setTeacher } from '../../redux/actions';

const useInit = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('teacher-token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token || ''}`;

  useEffect(() => {
    if (token) {
      const teacher: TeacherType = jwt_decode(token);
      dispatch(setTeacher(teacher));
    }
  }, []);
};

export default useInit;
