import {store} from '@src/store/store';

import axiosInstance from './axiosConfig';

const getBaseURL = (type: string) => {
  const state = store.getState();
  return type === 'internal'
    ? state.appConfig.internalUrl
    : state.appConfig.externalURL;
};

export const getRequest = async (
  type: string,
  endpoint: string,
  params = {},
) => {
  const url = getBaseURL(type) + endpoint;
  try {
    const res = await axiosInstance.get(`${url}`, {params});
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
  const url = getBaseURL(type) + endpoint;
  try {
    const res = await axiosInstance.post(`${url}`, body, {params});
    return res.data;
  } catch (err) {
    console.error(`POST request to ${url} failed`, err);
    throw err;
  }
};

export const deleteRequest = async (
  type: string,
  endpoint: string,
  params = {},
) => {
  const url = getBaseURL(type) + endpoint;
  try {
    const res = await axiosInstance.delete(`${url}`, {params});
    return res.data;
  } catch (err) {
    console.error(`DELETE request to ${url} failed`, err);
    throw err;
  }
};

export const putRequest = async (
  type: string,
  endpoint: string,
  body = {},
  params = {},
) => {
  const url = getBaseURL(type) + endpoint;
  try {
    const res = await axiosInstance.put(`${url}`, body, {params});
    return res.data;
  } catch (err) {
    console.error(`PUT request to ${url} failed`, err);
    throw err;
  }
};
