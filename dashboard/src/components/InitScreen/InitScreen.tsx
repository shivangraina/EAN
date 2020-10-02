import React, { useEffect } from 'react';
import { Spin, Row } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { TeacherType } from '../../redux/types';
import { useDispatch } from 'react-redux';
import { setTeacher } from '../../redux/actions';

const antIcon = <LoadingOutlined style={{ fontSize: '10vh' }} spin />;

const InitScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('teacher-token');
    if (token) {
      const teacher: TeacherType = jwt_decode(token);

      dispatch(setTeacher(teacher));

      axios.defaults.headers.common['Authorization'] = `Bearer ${token || ''}`;
      history.push('/add-notice');
    } else {
      history.push('auth');
    }
  }, []);

  return (
    <Row style={{ height: '100vh' }} align="middle" justify="center">
      <Spin indicator={antIcon} />
    </Row>
  );
};

export default InitScreen;
