import axios from 'axios';
import { handleError, handleResponse } from './HandleServer';

axios.defaults.baseURL = 'http://localhost:8000';

export const axiosGet = async (url, params) => {
  let responseHandled;
  try {
    const response = await axios.get(url, { params });
    responseHandled = handleResponse(response);
  } catch (error) {
    responseHandled = handleError(error);
  }

  return responseHandled;
};

export const axiosPost = async (url, data) => {
  let responseHandled;
  try {
    const response = await axios.post(url, data);
    responseHandled = handleResponse(response);
  } catch (error) {
    responseHandled = handleError(error);
  }

  return responseHandled;
};
