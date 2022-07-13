import axios from 'axios';

const API_URL = `/api/comments`;

export const getCommentList = (postId) => {
  return axios.get(`${API_URL}?post=${postId}`);
};

export const write = (postId, content) => {
  return axios.post(`${API_URL}/${postId}`, content);
};

export const remove = (commentId) => {
  return axios.delete(`${API_URL}/${commentId}`);
};

export const update = (commentId) => {
  return axios.patch(`${API_URL}/${commentId}`);
};
