import React from 'react';
import MyText from '../components/Texts/MyText';
import { formatDate, formatTime } from './formatData';
import { View } from 'react-native';

const FormatTime = ({ date }) => {
  return (
    <View>
      <MyText style={{ fontSize: 11, textAlign: 'left' }}>
        {formatDate(date)}
      </MyText>
      <MyText style={{ fontSize: 11, textAlign: 'left' }}>
        {formatTime(date)}
      </MyText>
    </View>
  );
};

export default FormatTime;
