import PostContainer from '@containers/post/PostContainer';
import CommentListContainer from '@containers/comment/CommentListContainer';

const PostViewer = () => {
  return (
    <div className="post-area">
      <PostContainer />
      <CommentListContainer />
    </div>
  );
};

export default PostViewer;
