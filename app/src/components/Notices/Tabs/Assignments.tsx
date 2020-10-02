import React from 'react';
import { NoticeItemType } from '../../../redux/type';
import CommonFlatList from './CommonFlatList';
import CommonListItem from './CommonListItem';

// const AssignmentItem: FlatListItem = ({}) => {
//   return (
//     <>
//       {/* Later make different componets for Notice, Exam, Assignment Items */}
//     </>
//   );
// };

interface Props {
  data: NoticeItemType[];
}

const Assignments: React.FC<Props> = ({ data }) => {
  return (
    <CommonFlatList RenderItem={CommonListItem} data={data} type="assignment" />
  );
};

export default Assignments;
