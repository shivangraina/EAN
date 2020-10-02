import React, { useContext } from 'react';
import { StyleSheet, RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NoticeItemType } from '../../../redux/type';
import MyText from '../../../reusables/components/Texts/MyText';
import { FlatListItem } from './common';
import useTypeNotice from './useTypeNotice';
import LocalNoticeContext from '../LocalNoticeContext';
import axios from 'axios';
import { BLUE_BUTTON } from '../../../reusables/styles/colors';

interface Props {
  data: NoticeItemType[];
  RenderItem: FlatListItem;
  type: 'notice' | 'exam' | 'assignment';
}

const CommonFlatList: React.FC<Props> = ({ data, RenderItem, type }) => {
  const { notices } = useTypeNotice(data, type);
  const { setNotices } = useContext(LocalNoticeContext);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    const { data } = await axios.get('notice/getnotices');

    setNotices({
      notices: data,
      loading: false,
    });

    setRefreshing(false);
  }, []);

  return (
    <FlatList
      style={styles.container}
      data={notices}
      refreshControl={
        <RefreshControl
          colors={[BLUE_BUTTON]}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item, index }) => {
        return <RenderItem {...item} index={index} touchable={true} />;
      }}
      ListEmptyComponent={
        <MyText style={styles.emptyComp}>Data Not Avialable</MyText>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'red',
    paddingLeft: 16.7,
    paddingRight: 16.7,
  },

  emptyComp: {
    alignSelf: 'center',
    marginTop: 24,
  },
});

export default CommonFlatList;
