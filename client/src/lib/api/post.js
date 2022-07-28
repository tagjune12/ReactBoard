import axios from 'axios';

const API_URL = `/api/posts`;

// export const getPostList = (page = 1, username, category) => {
//   return axios.get(
//     `${API_URL}?page=${page}${username ? `&username=${username}` : ''}${
//       category ? `&category=${category}` : ''
//     }`,
//   );
// };
export const getPostList = (query) => {
  const queryString = Object.entries(query).reduce((result, entry) => {
    const [key, value] = entry;
    return value ? result.concat(`${key}=${value}`) : result;
  }, []).join("&");
  console.log(queryString);
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
  } catch (e) {
    console.log(e);
  }
};

export const write = async (content) => {
  try {
    const response = await axios.post(API_URL, content);

    if (response.status === 200) {
      // console.log('response', response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
};

export const update = async (postId, post) => {
  return axios.patch(`${API_URL}/${postId}`, post);
};
