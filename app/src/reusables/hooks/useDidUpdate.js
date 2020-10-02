import { useEffect, useRef } from 'react';

// Dont execute on first render just like component did update
const useDidUpdate = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export default useDidUpdate;
