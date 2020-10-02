import { useEffect, useRef } from 'react';

// Dont execute on first render just like component did update
export const useDidUpdate: any = (func, deps, didUpdate = true) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didUpdate) {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    } else {
      func();
    }
  }, deps);
};
