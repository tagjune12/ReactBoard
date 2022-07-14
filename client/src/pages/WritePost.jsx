import Editor from '@components/common/Editor';
import { useSelector } from 'react-redux';

const WritePost = () => {
  const post = useSelector(({ writePost }) => writePost);

  return <Editor className="write" article={post} type="post" />;
};

export default WritePost;
