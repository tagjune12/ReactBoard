import Editor from '@components/Editor';
import { useSelector } from 'react-redux';

const ModifyPost = () => {
  const post = useSelector(({ writePost }) => writePost);

  return (
    <>
      {/* {loading && '로딩중'} */}
      {!false && <Editor className="modify" article={post} type="post" />}
    </>
  );
};

export default ModifyPost;
