import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTagName } from '../../constants/Utils';
import { AppState } from '../../redux';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import SelectHightlightTabs from '../../reusables/components/General/SelectTabs/SelectHightlightTabs';
import Loading from '../Common/Loading';
import FilterTags from './Tabs/FilterTags';
import { filter } from './Tabs/common';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { WHITE, BLUE_BUTTON } from '../../reusables/styles/colors';
import { getCircleStyle } from '../../reusables/styles/style';
import LocalNoticeContext from './LocalNoticeContext';

const optionArr = [
  { title: 'Notices' },
  { title: 'Assignments' },
  { title: 'Exams' },
];

const optionArrFilter = [
  { title: 'General', value: 'general' },
  { title: 'Class Wise', value: 'division' },
  { title: 'Batch Wise', value: 'batch' },
  { title: 'Branch Wise', value: 'branch' },
  { title: 'Year Wise', value: 'year' },
];

const NoticeScreen = () => {
  const [filterSelected, setFilter] = useState<filter>('general');

  const [{ loading, notices }, setNotices] = useState<{
    notices: null | any[],
    loading: boolean,
  }>({
    notices: null,
    loading: true,
  });
  const student = useSelector((state: AppState) => state.rootStore.student);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('notice/getnotices');

      setNotices({
        notices: data,
        loading: false,
      });
    })();
  }, []);

  const getGeneralNotices = () => {
    let arr: any[] = [];

    for (let i = 1; i < optionArrFilter.length; ++i) {
      const valToPush = notices
        ? notices[getTagName(optionArrFilter[i].value, student?.tags)] || []
        : [];
      arr.push(...valToPush);
    }
    return arr;
  };

  const filteredNotices =
    filterSelected === 'general'
      ? getGeneralNotices()
      : notices?.[getTagName(filterSelected, student?.tags)] || [];

  return (
    <FlexedContainer>
      <LocalNoticeContext.Provider value={{ setNotices }}>
        <SelectHightlightTabs
          fetchLoading={loading}
          notices={filteredNotices}
          setNotices={setNotices}
          optionArr={optionArr}
          index={0}
          renderTags={() => (
            <FilterTags
              setFilter={setFilter}
              index={0}
              optionArr={optionArrFilter}
            />
          )}
        />
        {!notices ? <Loading /> : null}
        {/* <View
				style={{
					position: 'absolute',
					bottom: 30,
					right: 30,
					zIndex: 2,
					backgroundColor: BLUE_BUTTON,
					borderWidth: 0,
					borderColor: WHITE,
					elevation: 4,
					...getCircleStyle(35),
				}}
			>
				<AntDesign name="reload1" size={20} color={WHITE} />
			</View> */}
      </LocalNoticeContext.Provider>
    </FlexedContainer>
  );
};

export default NoticeScreen;
