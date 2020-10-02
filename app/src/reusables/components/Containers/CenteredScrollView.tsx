import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CenteredContainer from './CenteredContainer';

const { width } = Dimensions.get('screen');

interface Props {
  contStyle?: StyleProp<ViewStyle>;
  contentContStyle?: StyleProp<ViewStyle>;
}

const CenteredScrollView: React.FC<Props> = ({
  contStyle,
  contentContStyle,
  children,
}) => (
  <CenteredContainer>
    <ScrollView
      style={[styles.container, contStyle]}
      contentContainerStyle={[styles.contentCont, contentContStyle]}
    >
      {children}
    </ScrollView>
  </CenteredContainer>
);

const styles = StyleSheet.create({
  container: {
    width,
  },

  contentCont: {
    alignItems: 'center',
  },
});

export default CenteredScrollView;
