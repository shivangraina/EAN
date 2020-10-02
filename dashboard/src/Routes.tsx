import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InitScreen from './components/InitScreen/InitScreen';
import useInit from './components/InitScreen/useInit';
import Auth from './components/Login/Auth';
import NoticeDashboard from './components/NoticeDashboard/NoticeDashboard';
import PastNotices from './components/PastNotices/PastNotices';
import { baseUrl } from './reusables/contants';
import GlobalListener from './components/GlobalListerner';

axios.defaults.baseURL = baseUrl;

const Routes = () => {
  useInit();

  return (
    <BrowserRouter basename="/dashboard">
      <GlobalListener />
      <Switch>
        <Route exact path="/">
          <InitScreen />
        </Route>
        <Route exact path="/notices">
          <PastNotices />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/add-notice">
          <NoticeDashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
