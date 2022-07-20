// import CommentEditor from '@components/CommentEditor';
import PostContainer from 'src/containers/post/PostContainer';
import CommentListContainer from 'src/containers/comment/CommentListContainer';
// import CommentEditorContainer from 'src/containers/comment/CommentEditorContainer';

const PostView = () => {
  return (
    <div className="post-area">
      <PostContainer />
      <CommentListContainer />
      {/* <CommentEditorContainer /> */}
      {/* <CommentEditor className="comment-editor" /> */}
    </div>
  );
};

export default PostView;
