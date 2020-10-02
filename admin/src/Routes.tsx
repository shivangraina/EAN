import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StudentList from './components/DataLists/Student/StudentsList';
import TeacherList from './components/DataLists/Teacher/TeachersList';
import GlobalListener from './components/GlobalListerner';
import InitScreen from './components/InitScreen/InitScreen';
import useInit from './components/InitScreen/useInit';
import Login from './components/Login/Login';
import { baseUrl } from './reusable/constants/constants';
import Auth from './components/Login/Auth';

axios.defaults.baseURL = baseUrl;

const Routes = () => {
  useInit();

  return (
    <BrowserRouter basename="/admin">
      <GlobalListener />
      <Switch>
        <Route exact path="/">
          <InitScreen />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/faculty-list">
          <TeacherList />
        </Route>
        <Route exact path="/student-list">
          <StudentList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
