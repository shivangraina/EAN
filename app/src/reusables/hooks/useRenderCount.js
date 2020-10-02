import { useRef } from 'react';

// Used to check how many times a component rendered
const useRenderCount = (screen) => {
  const ref = useRef(0);

  console.log(ref.current++, screen);
};

export default useRenderCount;
