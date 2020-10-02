import React from 'react';
import Background from '../../images/background.png';
import Header from '../../reusables/Header';
import AddNotice from './AddNotice/AddNotice';

const NoticeDashboard = () => {
  return (
    <div
      style={{
        height: '100%',
        backgroundImage: `url(${Background})`,
      }}
    >
      <Header />
      <AddNotice />
    </div>
  );
};

export default NoticeDashboard;
