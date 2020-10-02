import { Button, Form, Input, Row } from 'antd';
import React from 'react';
import { MailOutlined, KeyOutlined } from '@ant-design/icons';

const LoginForm = ({ form, onFinish, loading }) => {
  return (
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
  );
};

export default LoginForm;
