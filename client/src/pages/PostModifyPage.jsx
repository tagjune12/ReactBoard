import PostEditorConntainer from '@containers/post/PostEditorContainer';
import { Helmet } from 'react-helmet-async';

const PostModifyPage = () => {
  return (
    <>
      <Helmet>
        <title>게시글 수정</title>
      </Helmet>
      <PostEditorConntainer type="modify" />
    </>
  );
};

export default PostModifyPage;
