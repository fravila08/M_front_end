import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useState, createContext } from 'react';

export const UserContext = createContext();

export const tokenManagement = async (token = null) => {
  if (token) {
    await SecureStore.setItemAsync('authToken', `Token ${token}`);
  } else {
    await SecureStore.deleteItemAsync('authToken');
  }
};

export const alterAxios = async () => {
  const API_URL = 'https://tango-dep.com/api/';
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: await SecureStore.getItemAsync('authToken'),
    },
  });
  return axiosInstance;
};

export const logOut = async () => {
  const formattedAxios = await alterAxios();
  formattedAxios
    .post('users/logout/')
    .then((resp) => {
      tokenManagement();
      console.log('complete', resp.status);
      return null;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
};

export const evalElement = (title, newContent) => {
  switch (title) {
    case 'years_of_xp':
      return { years_of_xp: newContent };
    case 'job_title':
      return { job_title: newContent };
    case 'profession':
      return { profession: newContent };
    case 'employer':
      return { employer: newContent };
    case 'user':
      return { user: newContent };
    default:
      return { bio: newContent };
  }
};
