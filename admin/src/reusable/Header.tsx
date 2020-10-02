import { Button, Row, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import LogoutButton from '../components/Buttons/LogoutButton';

const { Title } = Typography;

const Header = () => {
  const history = useHistory();
  const teacherActivated = history.location.pathname === '/faculty-list';
  const colors = ['#416ce1', '#000'];
  const [color1, color2] = teacherActivated ? colors : colors.reverse();

  return (
    <Row style={styles.header} align="middle">
      <Title style={{ margin: 0, color: '#404a57' }} level={2}>
        Admin Panel
      </Title>
      <Button
        type="link"
        style={{ ...styles.link, color: color1 }}
        onClick={() => history.replace('faculty-list')}
      >
        Faculty List
      </Button>
      <Button
        type="link"
        style={{
          ...styles.link,
          color: color2,
          marginRight: 'auto',
          marginLeft: 0,
        }}
        onClick={() => history.replace('student-list')}
      >
        Student List
      </Button>
      <LogoutButton />
    </Row>
  );
};

interface StylesTypes {
  [key: string]: React.CSSProperties;
}

const styles: StylesTypes = {
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottom: '1px solid #ddd',
    padding: '20px 30px',
  },

  link: {
    fontSize: 18,
    marginRight: 24,
    marginLeft: 24,
  },
};

export default Header;
