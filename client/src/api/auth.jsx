import axios from 'axios';

const API_URL = `/api/auth`;

const login = async ({ userId, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      userId,
      password,
    });
    return response;
  } catch (e) {
    console.log(e);
  }
};

const register = async (registerInfo) => {
  try {
    console.log(registerInfo);
    const response = await axios.post(`${API_URL}/register`, registerInfo);

    return response;
  } catch (e) {
    console.log(e);
  }
};

export { login, register };
