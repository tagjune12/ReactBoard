import Editor from '@components/Editor';
import { useDispatch, useSelector } from 'react-redux';

const ModifyPost = () => {
  const content = useSelector(({ writePost }) => ({
    category: writePost.category,
    title: writePost.title,
    content: writePost.content,
  }));

  return (
    <>
      {/* {loading && '로딩중'} */}
      {!false && <Editor className="modify" content={content} />}
    </>
  );
};

export default ModifyPost;
