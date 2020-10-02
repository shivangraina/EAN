import React from 'react';
import { NoticeItemType } from '../../../redux/type';
import CommonFlatList from './CommonFlatList';
import CommonListItem from './CommonListItem';

// const ExamItem: FlatListItem = ({}) => {
//   return (
//     <>
//       {/* Later make different componets for Notice, Exam, Assignment Items */}
//     </>
//   );
// };

interface Props {
  data: NoticeItemType[];
}

const Exam: React.FC<Props> = ({ data }) => {
  return <CommonFlatList RenderItem={CommonListItem} type="exam" data={data} />;
};

export default Exam;
