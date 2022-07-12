import Editor from '@components/Editor';
import { useSelector } from 'react-redux';

const WritePost = () => {
  const post = useSelector(({ writePost }) => writePost);

  return <Editor className="write" article={post} type="post" />;
};

export default WritePost;
