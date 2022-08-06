import PostContainer from 'src/containers/post/PostContainer';
import CommentListContainer from 'src/containers/comment/CommentListContainer';

const PostViewer = () => {
  return (
    <div className="post-area">
      <PostContainer />
      <CommentListContainer />
    </div>
  );
};

export default PostViewer;
