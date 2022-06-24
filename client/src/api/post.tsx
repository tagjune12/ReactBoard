import axios from 'axios';

const API_URL: string = `/api/posts`;

const getPostList = async (
  page: string | number = '1',
  username?: string,
  category?: string,
) => {
  try {
    const { data } = await axios.get(
      `${API_URL}?page=${page}${username ? `&username=${username}` : ''}${
        category ? `&category=${category}` : ''
      }`,
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getPostList };
