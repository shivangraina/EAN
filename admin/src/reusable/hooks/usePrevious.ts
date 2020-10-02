import { useEffect, useRef } from 'react';

// To get the previous value which isnt same due to rerender of component

export const usePrevious = (value) => {
  const ref = useRef();
  const ref2 = useRef();

  useEffect(() => {
    ref.current = value;
  });

  if (value === ref.current) {
    return ref2.current;
  }

  ref2.current = ref.current;
  return ref.current;
};

export default usePrevious;
