import React, { useState, useEffect } from 'react';
import Post from '@components/PostList/Post';
// import Comment from '@components/PostList/Comment';
import { useParams, useNavigate } from 'react-router';
import { deletePost } from '@lib/api/post';
import { check } from '@lib/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '@modules/posts/writepost';
import CommentEditor from '@components/CommentEditor';
import CommentList from '@components/CommentList';
import { getPost } from '@modules/posts/post';

const PostView = () => {
  const { id: postId } = useParams();
  const [isMyPost, setIsMyPost] = useState(false);
  const navigate = useNavigate();
  const { loading, post } = useSelector(({ post }) => post);
  const userObjId = useSelector(({ user }) => user.user?._id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId]);

  // 수정 필요
  useEffect(() => {
    setIsMyPost(post?.author._id === userObjId);
    // check().then((response) => {
    //   setIsMyPost(post?.author._id === response?.data._id);
    // });
  }, [post]);

  const onDeletePostClick = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deletePost(postId).then((response) => {
        if (response === 204) {
          navigate('/');
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

  return (
    <>
      {loading && '불러오는 중...'}
      {!loading && (
        <div className="post-area">
          <Post
            post={post}
            isMyPost={isMyPost}
            onDeleteClick={onDeletePostClick}
            onEditClick={onEditPostClick}
          />
          <CommentList postId={postId} userObjId={userObjId} />

          <CommentEditor className="comment-editor" />
        </div>
      )}
    </>
  );
};

export default PostView;
