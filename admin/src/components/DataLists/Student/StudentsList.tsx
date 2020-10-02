import React from 'react';
import Background from '../../../images/background.png';
import { setStudent } from '../../../redux/action';
import Header from '../../../reusable/Header';
import StudentTable from './StudentTable';
import useList from '../useList';

const StudentList = () => {
  const { listData, loading } = useList(
    'studentList',
    setStudent,
    'teacher/getAllStudents',
  );

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${Background})`,
      }}
    >
      <Header />
      <StudentTable listData={listData} loading={loading} />
    </div>
  );
};

export default StudentList;
