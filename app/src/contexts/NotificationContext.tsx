import React from 'react';

const NotificationContext = React.createContext<{
  expoToken: string,
  notification: any,
}>({
  expoToken: '',
  notification: null,
});

export default NotificationContext;
