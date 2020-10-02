import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, Typography, Upload, Row } from 'antd';
import React, { useState } from 'react';
import { baseUrl } from '../../reusable/constants/constants';
import axios from 'axios';
import fileDownload from 'js-file-download';

const { Text } = Typography;

const UploadData = ({ type }) => {
  const [visible, setVisible] = useState(false);

  const props = {
    name: 'file',
    action: `${baseUrl}teacher/upload-data`,
    headers: {
      authorization: `Bearer ${localStorage.getItem('admin-token')}`,
    },
    accept: '.xlsx',
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setVisible(false);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} ${info.file.response}.`);
        setVisible(false);
      }
    },
  };

  const downloadFile = async () => {
    try {
      const res = await axios.get('teacher/download-sample', {
        params: { type },
        responseType: 'blob',
      });
      fileDownload(
        res.data,
        type === 'teacher' ? 'FacultySample.xlsx' : 'StudentSample.xlsx',
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button style={{ marginRight: '8px' }} onClick={() => setVisible(true)}>
        <UploadOutlined />
        Upload Data
      </Button>
      <Modal
        title="Upload data"
        visible={visible}
        footer={[]}
        onCancel={() => setVisible(false)}
      >
        <Text>
          You can download the sample data, which specifies the format in which
          the file should be uploaded
        </Text>
        <Row style={{ marginTop: 32 }} align="middle">
          <Button
            ghost
            type="primary"
            style={{ marginRight: 16 }}
            onClick={downloadFile}
          >
            <DownloadOutlined /> Download Sample xcel
          </Button>
          <Text style={{ marginRight: 16 }}>OR</Text>
          <Upload {...props} data={{ type }} showUploadList={false}>
            <Button ghost type="primary">
              <UploadOutlined /> Click to Upload
            </Button>
          </Upload>
        </Row>
      </Modal>
    </>
  );
};

export default UploadData;
