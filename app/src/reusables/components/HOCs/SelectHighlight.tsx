import React, { useState } from 'react';

const SelectHightlight = (WrappedComponent) => (props) => {
  const createArray = (startIndex) => {
    const arr = new Array(props.optionArr.length).fill(false);
    arr[startIndex] = true;

    return arr;
  };

  const [state, setState] = useState({
    selecState: createArray(props.index),
    selectedIndex: props.index,
  });

  const handlePress = (i) => {
    const arr = new Array(props.optionArr.length).fill(false);
    arr[i] = true;

    setState({
      selecState: [...arr],
      selectedIndex: i,
    });
  };

  const renderComponents = (Comp, currentSelectedIndex, otherProps) => (
    <>
      {state.selecState.map((state, i) => (
        <Comp
          key={i}
          currentSelectedIndex={currentSelectedIndex}
          selected={state}
          handlePress={handlePress}
          index={i}
          {...props.optionArr[i]}
          {...otherProps}
        />
      ))}
    </>
  );

  return (
    <WrappedComponent
      selected={state.selectedIndex}
      handlePress={handlePress}
      renderComponents={renderComponents}
      {...props}
    />
  );
};

export default SelectHightlight;
