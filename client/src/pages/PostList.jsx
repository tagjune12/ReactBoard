import '@styles/postlist.scss';
import PostItem from '@components/PostList/PostItem';
import * as postAPI from '@api/post';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

const PostList = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    postAPI.getPostList('1').then((response) => {
      setPostList(response);
    });
  }, []);
  return (
    <div className="post-wrapper">
      <div>
        <Outlet />
        <div className="post-item-wrapper">
          {postList?.map((post, index) => (
            <PostItem key={post._id} post={post} postIndex={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
