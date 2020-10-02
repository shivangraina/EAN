import React from 'react';

const LoadingContext = React.createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | []
>([]);

export default LoadingContext;
