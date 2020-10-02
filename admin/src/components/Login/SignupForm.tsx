import { Col, Form, Input, Row, Select, Button } from 'antd';
import React from 'react';

const { Option } = Select;

const SignuForm = ({ form, onFinish, loading }) => {
  return (
    <Form
      labelAlign="left"
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
    >
      <Row>
        <Col span={11}>
          <Form.Item
            name="regId"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
          >
            <Input placeholder="Registration ID" />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Input placeholder="Email ID" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={11}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that you entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Verify password" />
          </Form.Item>
        </Col>
      </Row>
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

export default SignuForm;
