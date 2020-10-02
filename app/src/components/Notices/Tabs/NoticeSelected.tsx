import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { WHITE } from '../../../reusables/styles/colors';
import { paddingStyles } from '../../../reusables/styles/style';
import { NoticeNavRouteProps } from '../../../routes/types/NoticeStackParamList';
import TitleBottomText from '../../Common/TitleBottomText';
import CommonListItem from './CommonListItem';

interface Props extends NoticeNavRouteProps<'SelectedNotice'> {}

const NoticeSelected: React.FC<Props> = ({ route }) => {
  const item = route.params.notice;

  return (
    <ScrollView style={[paddingStyles.plr_16, { backgroundColor: WHITE }]}>
      <TitleBottomText
        title="Notice"
        text=""
        back
        headStyle={{ marginTop: 28.3, marginBottom: 0 }}
      />
      <CommonListItem {...item} touchable={false} />
    </ScrollView>
  );
};

export default NoticeSelected;
