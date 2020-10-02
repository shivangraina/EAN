import React from 'react';
import Background from '../../../images/background.png';
import { setFaculty } from '../../../redux/action';
import Header from '../../../reusable/Header';
import TeacherTable from './TeacherTable';
import useList from '../useList';

const TeacherList = () => {
  const { listData, loading } = useList(
    'faculty',
    setFaculty,
    'teacher/getallteachers',
  );

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${Background})`,
      }}
    >
      <Header />
      <TeacherTable listData={listData} loading={loading} />
    </div>
  );
};

export default TeacherList;
