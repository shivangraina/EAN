/* eslint-disable no-nested-ternary */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { borderStyles } from '../../styles/style';
import FlexedContainer from '../Containers/FlexedContainer';
import KeyboardViewContext from './KeyboardViewContext';

/*
This component is used to solve the keyboard avoiding view issue, hwn the view isnt scroll view
and input is at the bottom of the screen, and if the layout isnt flex-ended then the keyboard
overlaps the input.

Just specify the mode
mode 1 -> Input is not overlapped by keyboard
mode 2 -> Input is overlapped by keyboard

and toggle
*/

const KeyBoardView = ({ children, contStyle }) => {
  const [styleMode, setStyleMode] = useState(null);
  const currentIp = useRef(null);

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidHide = () => {
    setTimeout(() => setStyleMode(null), 0);
    currentIp.current.blur();
    currentIp.current = null;
  };

  return (
    <FlexedContainer
      contStyle={[
			  contStyle,
			  borderStyles.bw_3,
			  styleMode
			    ? styleMode === 1
			      ? { position: 'absolute' }
			      : { justifyContent: 'flex-end' }
			    : null,
      ]}
    >
      <KeyboardViewContext.Provider
        value={{
				  toggleMode: (mode, ref) => {
				    setStyleMode(mode);
				    if (ref) currentIp.current = ref.current;
				  },
        }}
      >
        {children}
      </KeyboardViewContext.Provider>
    </FlexedContainer>
  );
};

export default KeyBoardView;
