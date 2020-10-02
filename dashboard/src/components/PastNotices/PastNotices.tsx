import { DeleteOutlined } from '@ant-design/icons';
import { Col, Popconfirm, Table, Tag, Typography } from 'antd';
import axios from 'axios';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import Background from '../../images/background.png';
import { TagsType } from '../../redux/types';
import Header from '../../reusables/Header';

const { Text } = Typography;

const PastNotices = () => {
  // const [notices, setNotices] = useState<null | any[]>(null);
  const [{ listData, loading }, setListData] = useState<{
    listData: any[];
    loading: boolean;
  }>({
    listData: [],
    loading: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('notice/getnotices');
        console.log(res, 'data');
        setListData({ listData: res.data, loading: false });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const handleDelete = async id => {
    try {
      const { data } = await axios.post('notice/delete', {
        noticeId: id,
      });

      setListData({ listData: data, loading: false }); // Set updated list from backend
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Upload Date',
      dataIndex: 'date',
      render: date => <Text>{Moment(date).format('DD/MM/YY LT')}</Text>,
    },
    {
      title: 'Expiry Date',
      dataIndex: 'validDate',
      render: date => <Text>{Moment(date).format('DD/MM/YY LT')}</Text>,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      render: (tags: TagsType) => (
        <>
          {tags?.map(tag => {
            return (
              <Tag color={'geekblue'} key={tag.tagName}>
                {tag.verboseName}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      render: (text, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record._id)}
        >
          <DeleteOutlined style={{ color: 'red' }} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${Background})`,
      }}
    >
      <Header />
      <Col
        span={24}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Col span={24} style={{ padding: 30 }}>
          <Table
            loading={loading}
            pagination={{ pageSize: 6 }}
            columns={columns}
            dataSource={listData}
            style={styles.table}
          />
        </Col>
      </Col>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#ffffff90',
    borderBottom: '1px solid #ddd',
    paddingLeft: 30,
    paddingRight: 30,
  },

  table: {
    border: '1px solid #ddd',
    margin: '16px',
    backgroundColor: '#fff',
    padding: '8px',
    borderRadius: '8px',
  },
};

export default PastNotices;
