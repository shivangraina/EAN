import { DeleteOutlined, EditOutlined, DashOutlined } from '@ant-design/icons';
import { Col, Modal, Popconfirm, Row, Table, Tag, Typography } from 'antd';
import React from 'react';
import { setFaculty } from '../../../redux/action';
import AddEntry from '../../Buttons/AddEntry';
import UploadData from '../../Buttons/UploadData';
import InputForm from './InputFormTeacher';
import getColumnSearchProps from '../getColumnSearchProps';
import useTable from '../useTable';
import { TagsType } from '../../../redux/types';

const { Text } = Typography;

const TeacherTable = ({ listData, loading }) => {
  const {
    currentIdx,
    editModal,
    handleDelete,
    handleEdit,
    toggleEditModal,
    ...colProps
  } = useTable(setFaculty, 'teacher');

  const columns: any[] = [
    {
      title: 'Registration ID',
      dataIndex: 'regId',
      width: '12%',
      align: 'center',
      ...getColumnSearchProps('regId', 'Red. Id', colProps),
    },
    {
      title: 'First Name',
      dataIndex: 'fName',
      width: '12%',
      align: 'center',
      ...getColumnSearchProps('fName', 'First Name', colProps),
    },
    {
      title: 'Last Name',
      dataIndex: 'lName',
      width: '12%',
      align: 'center',
      ...getColumnSearchProps('lName', 'Last Name', colProps),
    },
    {
      title: 'Email ID',
      dataIndex: 'email',
      width: '20%',
      align: 'center',
      ...getColumnSearchProps('email', 'Email', colProps),
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      width: '8%',
      align: 'center',
      ...getColumnSearchProps('branch', 'Branch', colProps),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      width: '20%',
      align: 'center',
      render: (tags: TagsType) => (
        <>
          {tags?.length ? (
            tags?.map(tag => {
              return (
                <Tag color={'geekblue'} key={tag.tagName}>
                  {tag.verboseName}
                </Tag>
              );
            })
          ) : (
            <DashOutlined />
          )}
        </>
      ),
    },
    {
      title: 'Activated',
      dataIndex: 'isActivated',
      width: '8%',
      align: 'center',
      ...getColumnSearchProps('isActivated', 'Activated', colProps),
      render: isActivated => <Text>{isActivated ? 'Yes' : 'No'}</Text>,
    },
    {
      title: 'Edit',
      width: '5%',
      align: 'center',
      render: (_text, record, index) =>
        listData.length >= 1 ? (
          <EditOutlined onClick={() => handleEdit(record.regId, index)} />
        ) : null,
    },
    {
      title: 'Delete',
      width: '5%',
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
        <AddEntry title="Faculty" />
        <UploadData type={'teacher'} />
      </Row>
      <Table
        rowKey={'email'}
        pagination={{ position: ['bottomRight'], pageSize: 6 }}
        dataSource={listData}
        columns={columns}
        bordered
        loading={loading}
      />
    </Col>
  );
};

export default TeacherTable;
