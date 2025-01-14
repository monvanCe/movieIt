import {store} from '@src/store/store';

import axiosInstance from './axiosConfig';

const getBaseURL = (type: string) => {
  const state = store.getState();
  return type === 'internal'
    ? 'http://127.0.0.1:3001'
    : state.appConfig.externalURL;
};

export const getRequest = async (
  type: string,
  endpoint: string,
  params = {},
) => {
  const url = getBaseURL(type);
  try {
    const res = await axiosInstance.get(`${url}${endpoint}`, {params});
    return res.data;
  } catch (err) {
    console.error(`GET request to ${url}${endpoint} failed`, err);
    throw err;
  }
};

export const postRequest = async (
  type: string,
  endpoint: string,
  body = {},
  params = {},
) => {
  const url = getBaseURL(type);
  return axiosInstance
    .post(`${url}${endpoint}`, body, {params})
    .then(res => res.data)
    .catch(err => {
      console.error(`POST request to ${url}${endpoint} failed`, err);
      throw err;
    });
};

export const deleteRequest = async (
  type: string,
  endpoint: string,
  params = {},
) => {
  const url = getBaseURL(type);
  return axiosInstance
    .delete(`${url}${endpoint}`, {params})
    .then(res => res.data)
    .catch(err => {
      console.error(`DELETE request to ${url}${endpoint} failed`, err);
      throw err;
    });
};

export const putRequest = async (
  type: string,
  endpoint: string,
  body = {},
  params = {},
) => {
  const url = getBaseURL(type);
  return axiosInstance
    .put(`${url}${endpoint}`, body, {params})
    .then(res => res.data)
    .catch(err => {
      console.error(`PUT request to ${url}${endpoint} failed`, err);
      throw err;
    });
};
