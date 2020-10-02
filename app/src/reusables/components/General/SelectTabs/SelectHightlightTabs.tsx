import React from 'react';
import { StyleSheet, View } from 'react-native';
import Assignments from '../../../../components/Notices/Tabs/Assignments';
import Exam from '../../../../components/Notices/Tabs/Exam';
import Notice from '../../../../components/Notices/Tabs/Notice';
import { NoticeItemType } from '../../../../redux/type';
import { BORDER, OFFWHITE } from '../../../styles/colors';
import { getWidth } from '../../../Utils/DeviceInfo';
import SelectHightlight from '../../HOCs/SelectHighlight';
import TabComponent from './TabComponent';

interface Props {
  index: number;
  fetchLoading: boolean;
  notices: NoticeItemType[];
  renderTags: () => JSX.Element;
  renderComponents: (Comp: React.FC) => JSX.Element;
  selected: number;
}

const switchTab = (selected: number, notices: NoticeItemType[]) => {
  switch (selected) {
    case 0:
      return <Notice data={notices} />;

    case 1:
      return <Assignments data={notices} />;

    case 2:
      return <Exam data={notices} />;

    default:
      break;
  }
};

const SelectHightlightTabs: React.FC<Props> = ({
  renderComponents,
  selected,
  notices,
  renderTags,
  fetchLoading,
}) => {
  return (
    <>
      <View style={styles.container}>{renderComponents(TabComponent)}</View>
      {!fetchLoading ? (
        <>
          {renderTags()}
          {switchTab(selected, notices)}
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidth(),
    height: 42.8,
    flexDirection: 'row',
    borderColor: BORDER,
    borderBottomWidth: 1,
    elevation: 1,
    backgroundColor: OFFWHITE,
  },
});

export default SelectHightlight(SelectHightlightTabs);
