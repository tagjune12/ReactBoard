import axios from 'axios';

const API_URL = `/api/posts`;

export const getPostList = async (page = 1, username, category) => {
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

export const getPostById = (postId) => {
  return axios.get(API_URL + '/' + postId);
};

export const writePost = async (content) => {
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

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_URL}/${postId}`);
    if (response.status === 204) return response.status;
  } catch (e) {
    console.log(e);
  }
};

export const editPost = async (postId, post) => {
  return axios.patch(`${API_URL}/${postId}`, post);
};

// import axios from 'axios';

// const API_URL = `/api/posts`;

// export const getPostList = async (page = 1, username, category) => {
//   try {
//     const response = await axios.get(
//       // const { data } = await axios.get(
//       `${API_URL}?page=${page}${username ? `&username=${username}` : ''}${
//         category ? `&category=${category}` : ''
//       }`,
//     );
//     // console.log(response);
//     return response;
//     // return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getPostById = async (postId) => {
//   try {
//     const { data: post } = await axios.get(API_URL + '/' + postId);

//     return post;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const writePost = async (content) => {
//   try {
//     const response = await axios.post(API_URL, content);

//     if (response.status === 200) {
//       // console.log('response', response);
//       return response;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deletePost = async (postId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${postId}`);
//     if (response.status === 204) return response.status;
//   } catch (e) {
//     console.log(e);
//   }
// };

// export const editPost = async (postId, post) => {
//   try {
//     const response = await axios.patch(`${API_URL}/${postId}`, post);
//     if (response.status === 200) {
//       return response.data;
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
