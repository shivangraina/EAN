import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const his = useHistory();

  return (
    <Button
      danger
      onClick={() => {
        localStorage.removeItem('admin-token');
        his.push('/auth');
      }}
      style={{ marginRight: 24, marginLeft: 24 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
