import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../redux';
import { setAllTags } from '../../redux/action';
import {
  AppActionsType,
  FacultyType,
  StudentType,
  TagsType,
} from '../../redux/types';
import { useDidUpdate } from '../../reusable/hooks';
import { setFaculty, setStudent } from './../../redux/action';

const useList = (
  key: 'faculty' | 'studentList',
  dispatchAction: typeof setFaculty | typeof setStudent,
  api,
) => {
  const [{ listData, loading }, setListData] = useState<{
    listData: FacultyType | StudentType[];
    loading: boolean;
  }>({
    listData: [],
    loading: true,
  });

  const storeListData = useSelector((state: AppState) => state.rootStore[key]);

  const dispatch = useDispatch<Dispatch<AppActionsType>>();

  useEffect(() => {
    if (key === 'faculty') {
      (async () => {
        try {
          const { data } = await axios.get<TagsType>('tags/getAllTags');
          dispatch(setAllTags(data));
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(api);
        dispatch(dispatchAction(data));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useDidUpdate(() => {
    setListData({ listData: storeListData, loading: false });
  }, [storeListData]);

  return { listData, loading };
};

export default useList;
