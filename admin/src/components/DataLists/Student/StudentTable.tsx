import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, Modal, Popconfirm, Row, Table, Typography } from 'antd';
import React from 'react';
import { setStudent } from '../../../redux/action';
import UploadData from '../../Buttons/UploadData';
import getColumnSearchProps from '../getColumnSearchProps';
import useTable from '../useTable';
import InputForm from './InputFormStudent';
import AddEntry from '../../Buttons/AddEntry';
import Moment from 'moment';

const { Text } = Typography;

const StudentTable = ({ listData, loading }) => {
  const {
    currentIdx,
    editModal,
    handleDelete,
    handleEdit,
    toggleEditModal,
    ...colProps
  } = useTable(setStudent, 'student');

  const columns: any[] = [
    {
      title: 'Registration ID',
      dataIndex: 'regId',
      width: '14%',
      align: 'center',
      ...getColumnSearchProps('regId', 'Red. Id', colProps),
    },
    {
      title: 'First Name',
      dataIndex: 'fName',
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('fName', 'First Name', colProps),
    },
    {
      title: 'Last Name',
      dataIndex: 'lName',
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('lName', 'Last Name', colProps),
    },
    {
      title: 'Date of Birth',
      dataIndex: 'birthDate',
      width: '15%',
      align: 'center',
      ...getColumnSearchProps('birthDate', 'DOB', colProps),
      render: date => <Text>{Moment(date).format('DD/MM/YY ')}</Text>,
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      width: '12%',
      align: 'center',
      ...getColumnSearchProps('branch', 'Branch', colProps),
    },
    {
      title: 'Year',
      dataIndex: 'year',
      width: '8%',
      align: 'center',
      ...getColumnSearchProps('year', 'Year', colProps),
    },
    {
      title: 'Division',
      dataIndex: 'division',
      width: '5%',
      align: 'center',
      ...getColumnSearchProps('division', 'Division', colProps),
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      width: '5%',
      align: 'center',
      ...getColumnSearchProps('batch', 'Batch', colProps),
    },
    {
      title: 'Edit',
      width: '8%',
      align: 'center',
      render: (_text, record, index) =>
        listData.length >= 1 ? (
          <EditOutlined onClick={() => handleEdit(record.regId, index)} />
        ) : null,
    },
    {
      title: 'Delete',
      width: '8%',
      align: 'center',
      render: (_text, record) =>
        listData.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <DeleteOutlined style={{ color: 'red' }} />
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <Col
      span={24}
      style={{
        padding: 30,
      }}
    >
      <Modal
        visible={editModal}
        footer={[<></>, <></>]}
        onCancel={() => toggleEditModal(false)}
      >
        <InputForm toggleModal={toggleEditModal} index={currentIdx} />
      </Modal>
      <Row style={{ marginBottom: '16px' }} justify="end">
        <AddEntry title="Student" />
        <UploadData type="student" />
      </Row>
      <Table
        pagination={{ position: ['bottomRight'], pageSize: 6 }}
        style={{ maxHeight: '70vh' }}
        dataSource={listData}
        columns={columns}
        bordered
        loading={loading}
      />
    </Col>
  );
};

export default StudentTable;
