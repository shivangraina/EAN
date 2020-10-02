import React from 'react';

const navigationRef = React.createRef<any>();
const isMountedRef: React.MutableRefObject<
  boolean | null
> = React.createRef<boolean>();

const navigate = (name, params) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  } else {
    console.log('Not mounted');
  }
};

const dispatchAction = (action) => {
  if (isMountedRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(action);
  } else {
    console.log('Not mounted');
  }
};

export default {
  navigate,
  dispatchAction,
  navigationRef,
  isMountedRef,
};
