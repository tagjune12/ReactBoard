import axios from 'axios';

const API_URL = `/api/posts`;

const getPostList = async (page = 1, username, category) => {
  try {
    const response = await axios.get(
      // const { data } = await axios.get(
      `${API_URL}?page=${page}${username ? `&username=${username}` : ''}${
        category ? `&category=${category}` : ''
      }`,
    );
    // console.log(response);
    return response;
    // return data;
  } catch (error) {
    console.log(error);
  }
};

const getPostById = async (postId) => {
  try {
    const { data } = await axios.get(API_URL + '/' + postId);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getPostList, getPostById };
