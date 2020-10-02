import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import qs from 'querystring';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Background from '../../images/background.png';
import { setTeacher } from '../../redux/action';
import { MyThunkDispatch, TeacherType } from '../../redux/types';

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<MyThunkDispatch>();

  const onFinish = data => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.post<{ access_token: string }>(
          'auth/login',
          qs.stringify({ ...data, loginType: 'admin' }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          },
        );

        const token = response.data.access_token;

        localStorage.setItem('admin-token', token);

        const teacher: TeacherType = jwt_decode(token);
        dispatch(setTeacher(teacher));

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        history.replace('/faculty-list');
      } catch (err) {
        console.log(err?.response);
        if (err?.response) {
          if (err.response?.status === 401) {
            alert('Invalid Credentials');
            setLoading(false);
          }
        }
      }
    })();
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
          Admin Dashboard
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
        <Title level={3} style={{ marginBottom: '20px' }}>
          Login
        </Title>
        <Form
          labelAlign="left"
          name="basic"
          initialValues={{ remember: true }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="Enter your email address"
              prefix={<MailOutlined />}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Enter your password"
              prefix={<KeyOutlined />}
            />
          </Form.Item>

          <Row justify="start">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default Login;
