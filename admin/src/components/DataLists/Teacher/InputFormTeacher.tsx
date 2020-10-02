import { Button, Col, Form, Input, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux';
import { setFaculty } from '../../../redux/action';

const { Option } = Select;

interface Props {
  toggleModal: any;
  index?: any;
}

const getFormData = (data, allTags) => {
  const tagsNew: number[] = [];

  const { __v, role, password, _id, tags, ...rest } = data;

  for (let i = 0; i < tags.length; ++i) {
    tagsNew.push(
      allTags.indexOf(allTags.find(item => item.tagName === tags[i].tagName)),
    );
  }

  return { ...rest, tags: tagsNew };
};

const InputFormTeacher: React.FC<Props> = ({ toggleModal, index = null }) => {
  const [form] = Form.useForm();
  const facultyData = useSelector((state: AppState) => state.rootStore.faculty);
  const tags = useSelector((state: AppState) => state.rootStore.tags);
  const dispatch = useDispatch();

  const update = index !== null;

  useEffect(() => {
    if (index !== null) {
      form.setFieldsValue({
        ...getFormData(facultyData[index], tags),
      });
    }
  }, [index]);

  const addTeacher = async formValues => {
    const postData = {
      ...formValues,
      tags: JSON.stringify(formValues.tags.map(itemIdx => tags?.[itemIdx])),
      role: 'teacher',
    };

    try {
      const response = await axios.post(
        `teacher/${update ? 'update' : 'addteacher'}`,
        postData,
      );

      if (response.data) {
        dispatch(setFaculty(response.data)); // Updated teacher list

        alert(`${update ? 'Updated' : 'Added'} Successfully`);
      }
    } catch (err) {
      console.log(err);
      alert('Error occured');
    }

    if (!update) {
      form.resetFields();
    }

    toggleModal(false);
  };

  return (
    <Form
      {...layout}
      layout="vertical"
      scrollToFirstError={true}
      size="middle"
      onFinish={addTeacher}
      form={form}
    >
      <Row>
        <Col span={11}>
          <Form.Item
            label="First Name"
            name="fName"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label="Last Name"
            name="lName"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            label="Registration ID"
            name="regId"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label="Email ID"
            name="email"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            label="Select Branch"
            name="branch"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
          >
            <Select placeholder="Select Branch">
              <Option value="C">COMP</Option>
              <Option value="I">IT</Option>
              <Option value="E">ENTC</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label="Joining Year"
            name="joinYear"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="tags"
        label="Select Class/Batch to Assign"
        rules={[{ required: true, message: 'Select a class/batch' }]}
      >
        <Select
          placeholder="Select a class/batch"
          showArrow
          mode="multiple"
          filterOption={(value, option) => option?.children.includes(value)}
        >
          {tags?.map((item, idx) => (
            <Option key={item.tagName} value={idx}>
              {item.verboseName}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Button
          type="ghost"
          onClick={() => form.resetFields()}
          style={{ marginRight: '16px' }}
        >
          Reset Form
        </Button>
        <Button type="primary" htmlType="submit">
          {update ? 'Update Teacher' : 'Add Teacher'}
        </Button>
      </Row>
    </Form>
  );
};

const layout = {
  labelCol: { span: 12 },
};

export default InputFormTeacher;
