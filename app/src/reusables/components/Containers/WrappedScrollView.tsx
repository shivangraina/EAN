import React from 'react';
import {
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ScrollViewProps,
} from 'react-native';
import Container from './Container';
import { WHITE } from '../../styles/colors';

interface Props {
  contStyle?: StyleProp<ViewStyle>;
  scrollContStyle?: StyleProp<ViewStyle>;
  contentContStyle?: StyleProp<ViewStyle>;
  config?: ScrollViewProps;
}

const WrappedScrollView: React.FC<Props> = ({
  contStyle,
  scrollContStyle,
  contentContStyle,

  children,
  config,
}) => (
  <Container contStyle={[contStyle, { flex: 1 }]}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, scrollContStyle]}
      contentContainerStyle={[styles.contentCont, contentContStyle]}
      {...config}
    >
      {children}
    </ScrollView>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    borderColor: 'red',
    backgroundColor: WHITE,
    paddingLeft: 16.7,
    paddingRight: 16.7,
  },

  contentCont: {
    borderWidth: 0,
    alignItems: 'center',
  },
});

export default WrappedScrollView;
