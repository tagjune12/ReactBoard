import axios from 'axios';

const API_URL = `/api/auth`;

export const requestLogin = ({ userId, password }) => {
  return axios.post(`${API_URL}/login`, {
    userId,
    password,
  });
};

export const register = async (registerInfo) => {
  try {
    const response = await axios.post(`${API_URL}/register`, registerInfo);

    return response;
  } catch (error) {
    throw (error);
  }
};

export const requestLogout = async (userInfo) => {
  return axios.post(`${API_URL}/logout`, userInfo);
};

export const check = async () => {
  return axios.get(`${API_URL}/check`);
};
