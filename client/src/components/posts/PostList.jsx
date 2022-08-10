import React from 'react';
import PostItem from '@components/posts/PostItem';

const PostListHead = () => {
  return (
    <div className="post-list-header">
      <span className="like">추천</span>
      <span className="category">카테고리</span>
      <span className="title">제목</span>
      <span className="author">작성자</span>
      <span className="date">날짜</span>
    </div>
  );
};

const PostList = ({ posts, currentPost }) => {
  return (
    <>
      <PostListHead />
      <div className="post-item-wrapper">
        {posts?.length === 0 ? (
          <span>게시글이 없습니다.</span>
        ) : (
          posts?.map((post, index) => (
            <PostItem
              key={post._id}
              post={post}
              isCurrentPost={post?._id === currentPost}
            />
          ))
        )}
      </div>
    </>
  );
};

export default React.memo(PostList);
