import PostEditorContainer from '@containers/post/PostEditorContainer';
import SEO from '@components/common/SEO';

const WritePostPage = () => {
  return (
    <>
      <SEO title="글 작성하기" />
      <PostEditorContainer />
    </>
  );
};

export default WritePostPage;
