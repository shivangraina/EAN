import { useEffect, useRef } from 'react';

// To get the value in previous render

const usePreviousRender = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  // Return happens first
  return ref.current;
};

export default usePreviousRender;
