import React, { useState, useEffect } from 'react';
import Post from '@components/post/Post';
import { initialize } from '@modules/posts/writepost';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '@lib/api/post';
import { getPost, unloadPost, likePost } from '@modules/posts/post';
import { getPosts, changePageNumber } from '@modules/posts/postlist';

const PostContainer = () => {
  const { id: postId } = useParams();
  const [isMyPost, setIsMyPost] = useState(false);
  const [isUserLikeThis, setIsUserLikeThis] = useState(false);
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

  const onLikeClick = () => {
    console.log('onLikeClick');
    // console.log(event.target);
    setIsUserLikeThis((prev) => !prev);
    dispatch(likePost(postId, userObjId));
    console.log(post);
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
    setIsUserLikeThis(post?.like.includes(userObjId));
    // 게시글 클릭시 화면 이동
    window.scrollTo({
      top: 300,
      left: 0,
      behavior: 'auto',
    });
  }, [post]);

  return (
    <>
      <Post
        post={post}
        isMyPost={isMyPost}
        onDeleteClick={onDeletePostClick}
        onEditClick={onEditPostClick}
        onLikeClick={onLikeClick}
        isUserLikeThis={isUserLikeThis}
      />
    </>
  );
};

export default PostContainer;
