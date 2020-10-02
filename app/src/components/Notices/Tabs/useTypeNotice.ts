import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../../../redux';
import { setNotices } from '../../../redux/actions';
import { AppActionsType, NoticeItemType } from '../../../redux/type';

const useTypeNotice = (
  data: NoticeItemType[],
  type: 'notice' | 'assignment' | 'exam'
) => {
  const dispatch = useDispatch<Dispatch<AppActionsType>>();

  const notices = useSelector(
    (state: AppState) => state.rootStore.notices[type]
  );

  useEffect(() => {
    dispatch(
      setNotices({
        [type]: data.filter((item) => item.type === type),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { notices };
};

export default useTypeNotice;
