import PostEditorContainer from '@containers/post/PostEditorContainer';
import { Helmet } from 'react-helmet-async';

const WritePostPage = () => {
  return (
    <>
      <Helmet>
        <title>글 작성하기</title>
      </Helmet>
      <PostEditorContainer />
    </>
  );
};

export default WritePostPage;
