import React, { useState, useEffect } from 'react';
import Post from '@components/PostList/Post';
import Comment from '@components/PostList/Comment';
import { useParams, useNavigate } from 'react-router';
import { deletePost } from '@lib/api/post';
import { check } from '@lib/api/auth';
import { getPost } from '@modules/posts/post';
import { useDispatch, useSelector } from 'react-redux';
import { initialize } from '@modules/posts/writepost';
import CommentEditor from '@components/CommentEditor';
import { getComments } from '@modules/comments/comments';

const PostView = () => {
  const { id: postId } = useParams();
  const [isMyPost, setIsMyPost] = useState(false);
  const navigate = useNavigate();
  const { loading, post } = useSelector(({ post }) => post);
  const { comments } = useSelector(({ comments }) => comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    dispatch(getComments(postId));
  }, [postId]);
  // });

  useEffect(() => {
    check().then((response) => {
      setIsMyPost(post?.author._id === response?.data._id);
    });
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
          {comments?.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))}

          <CommentEditor />
        </div>
      )}
    </>
  );
};

export default PostView;
