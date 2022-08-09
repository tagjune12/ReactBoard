import PostEditorConntainer from '@containers/post/PostEditorContainer';
import SEO from '@components/common/SEO';

const PostModifyPage = () => {
  return (
    <>
      <SEO title="게시글 수정" />
      <PostEditorConntainer type="modify" />
    </>
  );
};

export default PostModifyPage;
