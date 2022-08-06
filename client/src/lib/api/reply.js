import axios from 'axios';

const API_URL = `/api/replies`;

export const list = async (commentId) => {
  return axios.get(`${API_URL}?comment=${commentId}`);
}

export const write = (commentId, content) => {
  return axios.post(`${API_URL}/${commentId}`, content);
};

export const remove = (replyId) => {
  return axios.delete(`${API_URL}/${replyId}`);
};

export const update = (replyId, content) => {
  return axios.patch(`${API_URL}/${replyId}`, content);
};