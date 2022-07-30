import React, { useState, useEffect } from 'react';
import Post from '@components/post/Post';
import { initialize } from '@modules/posts/writepost';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '@lib/api/post';
import { getPost, unloadPost } from '@modules/posts/post';
import { getPosts, changePageNumber } from '@modules/posts/postlist';

const PostContainer = () => {
  const { id: postId } = useParams();
  const [isMyPost, setIsMyPost] = useState(false);
  const { loading, post } = useSelector(({ post }) => post);
  const userObjId = useSelector(({ user }) => user.user?._id);
  const { curPage, postsInThisPage } = useSelector(({ postlist }) => ({
    curPage: postlist.curPage,
    postsInThisPage: postlist.posts?.length,
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDeletePostClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost(postId).then((response) => {
        if (response === 204) {
          navigate('/all');
          if (curPage === 1) {
            dispatch(getPosts(curPage));
          } else {
            if (postsInThisPage === 1) {
              dispatch(getPosts(curPage - 1));
              dispatch(changePageNumber(curPage - 1));
            }
          }
        }
      });
    }
  };

  const onEditPostClick = () => {
    dispatch(
      initialize({
        category: post.category,
        title: post.title,
        content: post.content,
      }),
    );
    navigate(`/modify/${postId}`);
  };

  useEffect(() => {
    console.log('postId is Changed');
    dispatch(getPost(postId));

    return () => {
      dispatch(unloadPost());
    };
  }, [postId]);

  // 수정 필요
  useEffect(() => {
    setIsMyPost(post?.author._id === userObjId);
  }, [post]);

  return (
    <>
      {loading && '불러오는 중...'}
      {!loading && (
        <Post
          post={post}
          isMyPost={isMyPost}
          onDeleteClick={onDeletePostClick}
          onEditClick={onEditPostClick}
        />
      )}
    </>
  );
};

export default PostContainer;
