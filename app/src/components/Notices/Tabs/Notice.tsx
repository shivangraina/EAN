import React from 'react';
import CommonFlatList from './CommonFlatList';
import CommonListItem from './CommonListItem';
import { NoticeItemType } from '../../../redux/type';

// const NoticeItem: FlatListItem = ({}) => {
//   return (
//     <>
//       {/* Later make different componets for Notice, Exam, Assignment Items */}
//     </>
//   );
// };

interface Props {
  data: NoticeItemType[];
}

const Notice: React.FC<Props> = ({ data }) => {
  return (
    <CommonFlatList RenderItem={CommonListItem} data={data} type="notice" />
  );
};

export default Notice;
