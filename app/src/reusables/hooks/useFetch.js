import { useState } from 'react';
import { axiosGet } from '../Utils/Server/AxiosConfig';
import useDidUpdate from './useDidUpdate';

export const useFetch = (url, params, processData = (data) => data, reload) => {
  const [state, setstate] = useState({ _data: null, loading: true, err: null });

  useDidUpdate(() => {
    setstate({ _data: null, loading: true, err: null });

    const fetch = async () => {
      // console.log(' i am', url);
      const { data, err } = await axiosGet(url, params);
      setstate({ _data: err ? null : processData(data), err, loading: false });
    };

    fetch();
  }, [url, params.page, reload]);

  return state;
};
