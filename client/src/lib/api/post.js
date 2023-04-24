import axios from 'axios';

const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
const API_URL = `${PROXY}/api/posts`;

export const getPostList = (query) => {
  const queryString = Object.entries(query).reduce((result, entry) => {
    const [key, value] = entry;
    return value ? result.concat(`${key}=${value}`) : result;
  }, []).join("&");

  return axios.get(
    `${API_URL}?${queryString}`,
  );
};

export const getPostById = (postId) => {
  return axios.get(API_URL + '/' + postId);
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/${postId}`);
    if (response.status === 204) return response.status;
  } catch (error) {
    throw (error);
  }
};

export const write = async (content) => {
  try {
    const response = await axios.post(API_URL, content);

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    throw (error);
  }
};

export const update = async (postId, post) => {
  return axios.patch(`${API_URL}/${postId}`, post);
};

export const like = (postId, userObjId) => {
  return axios.patch(`${API_URL}/like/${postId}`, userObjId);
}
