import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Container from '../../../../reusables/components/Containers/Container';
import RowContainer from '../../../../reusables/components/Containers/RowContainer';
import Avatar from '../../../../reusables/components/General/Avatar';
import TitledInputMessaged from '../../../../reusables/components/Inputs/TitledInput/TitledInput';
import {
  BLUE_BUTTON,
  BORDER,
  OFFWHITE,
  TEXT_BLACK,
  TEXT_BLACK_1,
} from '../../../../reusables/styles/colors';
import {
  marginStyles,
  paddingStyles,
} from '../../../../reusables/styles/style';
import DifferentTexts from '../../../Common/DifferentTexts';

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(fn) {
  await timeout(3000);
  return fn();
}

const createComment = (name, comment) => ({
  _id: comment,
  comment,
  name,
  statusPending: true,
});

const CommentItem = ({ avatarLink, comment, name, statusPending }) => {
  const opacity = statusPending ? { opacity: 0.4 } : { opacity: 1 };

  return (
    <Container contStyle={[styles.row, opacity]} justify="flex-start" w100>
      <Avatar
        size={25}
        iconContStyle={marginStyles.mr_8}
        iconSource={require('../../../../assets/profile.png')}
      />
      <Container contStyle={{ maxWidth: '86%' }}>
        <Container contStyle={{ flexDirection: 'row' }} align="center">
          <DifferentTexts
            text={name}
            family="semi"
            style={[marginStyles.mb_8, paddingStyles.pl_4]}
          />
          {!statusPending && (
            <DifferentTexts
              level={1}
              text={'Just Now'}
              style={[marginStyles.mb_8, paddingStyles.pl_8]}
              color={TEXT_BLACK_1}
            />
          )}
        </Container>

        <DifferentTexts
          level={2}
          text={comment}
          textAlign="left"
          color={TEXT_BLACK}
          style={styles.comment}
        />
        {statusPending && (
          <DifferentTexts
            level={1}
            text={'Posting......'}
            color={TEXT_BLACK}
            style={paddingStyles.p_4}
          />
        )}
      </Container>
    </Container>
  );
};

const Comments = ({ data, touchable, renderHeader }) => {
  const [commentList, setcommentList] = useState(data);
  const [commentNew, setCommentNew] = useState('');

  const postComment = async (comment) => {
    // post to axios here, send comment to backend
    setCommentNew('');

    const newCommentList = await sleep(() => {
      return [...commentList, { ...comment }].map((item) => ({
        ...item,
        statusPending: false,
      }));
    });

    setcommentList(newCommentList);
  };

  return (
    <>
      <FlatList
        style={[marginStyles.mtb_8]}
        data={touchable ? commentList.slice(-2) : commentList}
        renderItem={({ item }) => {
          return <CommentItem {...item} />;
        }}
        ListHeaderComponent={renderHeader()}
        keyExtractor={(item) => item._id.toString()}
      />
      <RowContainer justifyContent="flex-start" contStyle={styles.commentRow}>
        <Avatar
          size={25}
          iconContStyle={marginStyles.mr_12}
          iconSource={require('../../../../assets/profile.png')}
        />
        <TitledInputMessaged
          config={{
            multiline: true,
            placeholder: 'Type Your Comment.',
            value: commentNew,
            onChangeText: (value) => setCommentNew(value),
          }}
          containerStyle={styles.commentCont}
          textInputStyle={styles.commentIp}
        />
        <MaterialCommunityIcons
          name="send"
          size={24}
          color={BLUE_BUTTON}
          style={styles.send}
          onPress={() => {
            const createdCommet = createComment('Saumitra', commentNew);
            setcommentList([...commentList, createdCommet]);
            postComment(createdCommet);
          }}
        />
      </RowContainer>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    paddingTop: 4,
    marginBottom: 12,
    flexDirection: 'row',
  },

  comment: {
    alignSelf: 'flex-start',
    padding: 4,
    paddingLeft: 8,
    backgroundColor: OFFWHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BORDER,
  },

  commentRow: {
    alignItems: 'flex-end',
    marginBottom: 12,
  },

  commentIp: {
    borderBottomWidth: 1.5,
    borderWidth: 0,
    borderRadius: 0,
    paddingLeft: 2,
    borderColor: BLUE_BUTTON,
  },

  commentCont: {
    flex: 1,
    marginRight: 8,
    marginBottom: 0,
  },

  send: {
    borderWidth: 0,
    bottom: -2,
  },
});

export default Comments;
