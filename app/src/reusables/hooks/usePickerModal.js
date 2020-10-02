/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

/**
 *
 * @param {func} func The function to execute after the picer index changes
 * @param {number} initalIndex The initial index for the picker, default 0
 */

const usePickerModal = (func, initalIndex = 0) => {
  const [picker, setPicker] = useState({
    index: initalIndex,
    visible: false,
  });

  useEffect(() => {
    func(picker.index);
  }, [picker.index]);

  return {
    // Set Picker index onChange
    setIndex: (index) =>
      setPicker((prevState) => ({
        ...prevState,
        index,
        visible: false,
      })),

    // Hide picker modal
    hideModal: () =>
      setPicker((prevState) => ({ ...prevState, visible: false })),

    // Show picker modal
    showModal: () =>
      setPicker((prevState) => ({ ...prevState, visible: true })),

    negativeModal: () =>
      setPicker((prevState) => ({ ...prevState, visible: !prevState.visible })),

    picker,
  };
};

export default usePickerModal;
