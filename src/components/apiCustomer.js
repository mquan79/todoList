import axios from 'axios';

const apiUrl = 'http://192.168.1.46/api';

export const get = async (url) => {
  try {
    const response = await axios.get(`${apiUrl}/${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getById = async (userId, url) => {
  try {
    const response = await axios.get(`${apiUrl}/${url}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const add = async (user, url) => {
  try {
    const response = await axios.post(`${apiUrl}/${url}`, user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updated = async (userId, updatedUser, url) => {
  try {
    const response = await axios.put(`${apiUrl}/${url}/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleted = async (userId, url) => {
  try {
    const response = await axios.delete(`${apiUrl}/${url}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletedAll = async (url) => {
  try {
    const response = await axios.delete(`${apiUrl}/${url}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
