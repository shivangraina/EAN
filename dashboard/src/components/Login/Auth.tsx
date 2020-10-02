import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, Typography } from 'antd';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import qs from 'query-string';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Background from '../../images/background.png';
import { setTeacher } from '../../redux/actions';
import { MyThunkDispatch, TeacherType } from '../../redux/types';
import LoginForm from './LoginForm';
import SignuForm from './SignupForm';

const { Title, Text } = Typography;

const Auth = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<MyThunkDispatch>();

  const [flag, setFlag] = useState(false);

  const onFinish = data => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.post<{ access_token: string }>(
          'auth/login',
          qs.stringify({ ...data, loginType: 'teacher' }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        );

        const token = response.data.access_token;

        localStorage.setItem('teacher-token', token);

        const teacher: TeacherType = jwt_decode(token);

        dispatch(setTeacher(teacher));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        history.replace('/add-notice');
      } catch (err) {
        console.log(err?.response);
        setLoading(false);
        alert(err?.response?.data);
      }
    })();
  };

  const addTeacher = async formValues => {
    setLoading(true);
    const postData = {
      ...formValues,
      tags: [],
      role: 'teacher',
    };

    try {
      const response = await axios.post('auth/signupTeacher', postData);

      if (response.data) {
        alert('Activation Link sent your mail');
        form.resetFields();
        setFlag(false);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        alert(err.response?.data);
      } else {
        alert('Error occured');
      }
    }

    setLoading(false);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        backgroundImage: `url(${Background})`,
      }}
    >
      <Title
        level={4}
        style={{
          marginTop: '20px',
          position: 'absolute',
          top: 0,
          color: '#fff',
        }}
      >
        PICT EAN{' '}
        <Text
          style={{
            fontSize: '12px',
            color: '#f8f8f8',
          }}
        >
          Teacher Dashboard
        </Text>
      </Title>
      <Col
        span={8}
        style={{
          backgroundColor: '#fff',
          padding: '0px 32px',
          paddingTop: '12px',
          borderRadius: '16px',
        }}
      >
        <Row style={{ marginBottom: 32, marginTop: 8 }}>
          <Button
            type={!flag ? 'primary' : 'default'}
            ghost={!flag}
            icon={<LoginOutlined />}
            onClick={() => setFlag(false)}
            style={{ borderRadius: 4, marginRight: 16 }}
          >
            Login
          </Button>
          <Button
            ghost={flag}
            type={flag ? 'primary' : 'default'}
            icon={<UserOutlined />}
            onClick={() => setFlag(true)}
            style={{ borderRadius: 4 }}
          >
            Register
          </Button>
        </Row>

        {!flag ? (
          <LoginForm form={form} onFinish={onFinish} loading={loading} />
        ) : (
          <SignuForm form={form} onFinish={addTeacher} loading={loading} />
        )}
      </Col>
    </Row>
  );
};

export default Auth;
