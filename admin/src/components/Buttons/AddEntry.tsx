import { Modal } from 'antd';
import Button from 'antd/lib/button/button';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import InputFormTeacher from '../DataLists/Teacher/InputFormTeacher';
import InputFormStudent from '../DataLists/Student/InputFormStudent';

const AddEntry = ({ title }) => {
  const [activateModal, toggleModal] = useState(false); // Toggle Modal
  const InputForm = title === 'Faculty' ? InputFormTeacher : InputFormStudent;
  return (
    <>
      <Modal
        visible={activateModal}
        footer={[<></>, <></>]}
        onCancel={() => toggleModal(false)}
      >
        <InputForm toggleModal={toggleModal} />
      </Modal>
      <Button
        onClick={() => toggleModal(true)}
        style={{ marginRight: '24px' }}
        icon={<PlusOutlined />}
      >
        Add {title}
      </Button>
    </>
  );
};

export default AddEntry;
