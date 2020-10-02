import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../../../reusables/components/Containers/Container';
import RowContainer from '../../../reusables/components/Containers/RowContainer';
import {
  BLUE_1,
  BLUE_BUTTON,
  BORDER,
  BUTTON_DISABLED,
  WHITE,
} from '../../../reusables/styles/colors';
import { marginStyles, paddingStyles } from '../../../reusables/styles/style';
import FormatTime from '../../../reusables/Utils/FormatTime';
import { NoticeNavProp } from '../../../routes/types/NoticeStackParamList';
import DifferentTexts from '../../Common/DifferentTexts';
import { ListItemProps } from './common';

const comments = [
  { _id: '1', comment: 'Hello this is nice', name: 'Tanmay Nale' },
  {
    _id: '2',
    comment: 'It is a long established fact that a reader will be distracted.',
    name: 'Shivang Raina',
  },
  { _id: '3', comment: 'Hello this is nice', name: 'Tanmay Nale' },
  {
    _id: '4',
    comment: 'It is a long established fact that a reader will be distracted.',
    name: 'Shivang Raina',
  },
  { _id: '5', comment: 'Hello this is nice', name: 'Tanmay Nale' },
  {
    _id: '6',
    comment: 'It is a long established fact that a reader will be distracted.',
    name: 'Shivang Raina',
  },
];

const CommonListItem = (props: ListItemProps) => {
  const {
    title,
    body,
    date,
    bookmarked,
    index,
    touchable,
    _id,
    fileLink,
  } = props;

  const navigation = useNavigation<NoticeNavProp<'Notices'>>();

  return (
    <Container
      contStyle={[
        styles.noticeCont,
        !index && marginStyles.mt_24,
        !touchable && styles.selected,
      ]}
    >
      <RowContainer contStyle={styles.row1}>
        <FormatTime date={date} />
        <DifferentTexts
          text={title}
          level={3}
          color={BLUE_BUTTON}
          family="bold"
          textAlign="center"
          style={styles.head}
        />

        <FontAwesome
          name={bookmarked ? 'bookmark' : 'bookmark-o'}
          size={22}
          color={WHITE}
        />
      </RowContainer>
      <DifferentTexts text={body} textAlign="left" style={styles.body} />
      <RowContainer contStyle={styles.rowLast}>
        <DifferentTexts text="- Saumitra Kulkarni" level={2} family="semi" />
        <MaterialIcons
          name="file-download"
          size={25}
          color={fileLink === 'null' ? BUTTON_DISABLED : BLUE_1}
          onPress={async () => {
            const token = await AsyncStorage.getItem('token');

            await WebBrowser.openBrowserAsync(
              `https://eanbackend.herokuapp.com/notice/downloadfile?id=${_id}&token=${token}`
            );
          }}
        />
      </RowContainer>
      {/* <DifferentTexts style={styles.comment} text="Comments" color={BLUE_1} />
      <Comments
        renderHeader={() => (
          <>
            {touchable && comments?.length >= 2 ? (
              <DifferentTexts
                text={'See All Comments...'}
                level={2}
                family="bold"
                style={{ marginBottom: 8 }}
                onPress={() =>
                  navigation.navigate('SelectedNotice', { notice: props })
                }
              />
            ) : null}
          </>
        )}
        touchable={touchable}
        data={comments}
      /> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  noticeCont: {
    marginBottom: 23.3,
    elevation: 2,
    borderRadius: 4,
    paddingLeft: 12.7,
    paddingRight: 12.7,
    paddingTop: 10,
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
  },

  head: {
    flex: 1,
    marginRight: 19,
  },

  row1: {
    marginBottom: 13.3,
    borderBottomWidth: 1,
    borderColor: BORDER,
    paddingBottom: 12,
  },

  body: {
    marginBottom: 13.3,
    paddingTop: 12,
    paddingBottom: 12,
  },

  comment: {
    ...paddingStyles.ptb_8,
    borderBottomWidth: 1,
    borderColor: BORDER,
  },

  rowLast: {
    borderBottomWidth: 1,
    borderColor: BORDER,
    paddingBottom: 10,
  },

  selected: {
    elevation: 0,
    borderWidth: 0,
    ...marginStyles.mt_4,
    ...paddingStyles.plr_0,
  },
});

export default CommonListItem;
