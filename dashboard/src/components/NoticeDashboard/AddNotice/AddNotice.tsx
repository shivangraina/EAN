import { Button, Col, Form, Input, Radio, Select } from 'antd';
import { FormInstance } from 'antd/lib/form';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../../redux';
import { getFromdata } from '../../../reusables/utils';
import { InputEventType } from '../../../types';

const { Option } = Select;

const AddNotice = () => {
  const history = useHistory();

  const { allTags, teacher } = useSelector(({ rootStore }: AppState) => ({
    allTags: rootStore.teacher?.tags,
    teacher: rootStore.teacher,
  }));
  const [file, setFile] = useState<File | null>();
  const formRef = React.createRef<FormInstance>();

  const resetForm = () => {
    formRef.current?.resetFields();
    setFile(null);
  };

  const uploadNotice = async data => {
    // Extract Tag objects from form tags
    const tags = data.tags.map(itemIdx => allTags?.[itemIdx]);

    // Override file field beacause returns only path in Antd

    const formValues = {
      ...data,
      tags: JSON.stringify(tags),
      teacher: JSON.stringify({
        _id: teacher?.teacherId,
        name: `${teacher?.fName} ${teacher?.lName}`,
      }),
      file,
    };

    try {
      const response = await axios.post(
        'notice/addnotices',
        getFromdata({
          ...formValues,
        }),
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data) {
        resetForm();
        alert('Notice Uploaded');
        history.push('notices');
      } else {
        resetForm();
      }
    } catch (err) {
      resetForm();
    }
  };

  const handleFileChange: InputEventType = e => {
    setFile(e.target.files?.[0] || null);
  };

  return (
    <Col
      span={24}
      style={{
        backgroundColor: '#fff',
      }}
    >
      <Form
        labelAlign="left"
        ref={formRef}
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '32px',
        }}
        name="basic"
        initialValues={{ type: 'notice' }}
        onFinish={uploadNotice}
      >
        <Col span={12}>
          <Form.Item
            {...formItemLayout}
            labelAlign="left"
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please add Title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Body" name="body" {...formItemLayout}>
            <Input.TextArea rows={15} />
          </Form.Item>
          <Form.Item label="Attachment" name="file" {...formItemLayout}>
            <Input type="file" name="file" onChange={handleFileChange} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            labelCol={{ span: 5 }}
            label="Select Tags"
            name="tags"
            rules={[{ required: true, message: 'Please add tags!' }]}
          >
            <Select
              mode="multiple"
              size={'middle'}
              showArrow
              filterOption={(value, option) => option?.children.includes(value)}
            >
              {allTags?.map((item, idx) => (
                <Option key={item.tagName} value={idx}>
                  {item.verboseName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            labelCol={{ span: 5 }}
            label="Expiration Date"
            name="validDate"
            rules={[{ required: true, message: 'Please add expiration date!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Notice Type" name="type" labelCol={{ span: 5 }}>
            <Radio.Group defaultValue={'notice'}>
              <Radio.Button value="notice">Notice</Radio.Button>
              <Radio.Button value="exam">Exam</Radio.Button>
              <Radio.Button value="assignment">Assignment</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Upload Notice
          </Button>
        </Col>
      </Form>
    </Col>
  );
};

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 19 },
};

export default AddNotice;
