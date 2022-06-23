import axios from 'axios';

// const API_URL: string = `${process.env.REACT_APP_API_URL}post` as string;
const API_URL: string = `/api/post`;

type QueryParams = {
  username: string | undefined;
  category: string | undefined;
  page: string;
};

const getPostList = async (
  page: string,
  username: string | undefined,
  category: string | undefined,
) => {
  // const response = await fetch('http://localhost:4000/api/post?page=1');
  // const response = await fetch('/api/post?page=1');
  const client = axios.create();
  const response = await client.get('/api/post?page=1');

  console.log(response);
  return response;
};
// const getPostList = async ({
//   username = '',
//   category = '',
//   page = '1',
// }: QueryParams) => {
//   const response = await fetch(
//     API_URL + '?' + username
//       ? `username=${username}`
//       : '' + category
//       ? `category=${category}`
//       : '' + page
//       ? `page=${page}`
//       : '',
//   );

//   console.log(response);
// };

export { getPostList };
