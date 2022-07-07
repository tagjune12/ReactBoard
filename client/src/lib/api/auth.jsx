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
  } catch (e) {
    console.log(e);
  }
};

export const requestLogout = async (userInfo) => {
  return axios.post(`${API_URL}/logout`, userInfo);
};

export const check = async () => {
  try {
    const response = await axios.get(`${API_URL}/check`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
