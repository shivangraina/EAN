import { Button, Col, Form, Input, Row, Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux';
import { setStudent } from '../../../redux/action';
import {
  yearPicker,
  branchPicker,
  divPicker,
  batchPicker,
} from '../../../reusable/constants/pickerConstants';
import { useDidUpdate } from '../../../reusable/hooks';

const { Option } = Select;

interface Props {
  toggleModal: any;
  index?: any;
}

const getFormData = data => {
  const { __v, role, password, _id, tags, ...rest } = data;

  return { ...rest };
};

const InputFormStudent: React.FC<Props> = ({ toggleModal, index = null }) => {
  const [form] = Form.useForm();
  const studentList = useSelector(
    (state: AppState) => state.rootStore.studentList,
  );
  const [pickerRows, setPickerRows] = useState({
    divisionRows: divPicker.FE.C,
    batchRows: batchPicker.FE.C,
  });

  const { batchRows, divisionRows } = pickerRows;

  const dispatch = useDispatch();

  const update = index !== null;

  useEffect(() => {
    if (index !== null) {
      form.setFieldsValue({
        ...getFormData(studentList[index]),
      });
    }
  }, [index]);

  useDidUpdate(() => {
    form.setFieldsValue({
      batch: batchRows[0].value.toString(),
      division: divisionRows[0].value.toString(),
    });
  }, [pickerRows]);

  const addStudent = async formValues => {
    const postData = {
      ...formValues,
    };

    try {
      // Make this api call in backend
      const response = await axios.post(
        `teacher/${update ? 'update-student' : 'addstudent'}`,
        postData,
      );

      console.log(response.data, 'll');
      if (response.data) {
        dispatch(setStudent(response.data)); // Updated student list

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
      onFinish={addStudent}
      form={form}
      onValuesChange={(changedValues, allValues) => {
        const { year, branch } = allValues;
        if (year && branch && (changedValues.year || changedValues.branch)) {
          setPickerRows({
            batchRows: batchPicker[year][branch],
            divisionRows: divPicker[year][branch],
          });
        }
      }}
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
            label="Date of Birth"
            name="birthDate"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Input type="date" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
          >
            <Select placeholder="Select Year">
              {yearPicker.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label="Branch"
            name="branch"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Select placeholder="Select Branch">
              {branchPicker.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Form.Item
            label="Division"
            name="division"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
          >
            <Select placeholder="Select Divison">
              {divisionRows.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={13}>
          <Form.Item
            label="Batch"
            name="batch"
            rules={[{ required: true, message: 'This field is mandatary!' }]}
            style={{ marginLeft: 20 }}
          >
            <Select placeholder="Select Batch">
              {batchRows.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="ghost"
          onClick={() => form.resetFields()}
          style={{ marginRight: '16px' }}
        >
          Reset Form
        </Button>
        <Button type="primary" htmlType="submit">
          {update ? 'Update Student' : 'Add Student'}
        </Button>
      </Row>
    </Form>
  );
};

const layout = {
  labelCol: { span: 12 },
};

export default InputFormStudent;
