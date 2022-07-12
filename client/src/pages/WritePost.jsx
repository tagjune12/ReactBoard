import Editor from '@components/Editor';
import { useSelector } from 'react-redux';

const WritePost = () => {
  const content = useSelector(({ writePost }) => ({
    category: 'post',
    title: writePost.title,
    content: writePost.content,
  }));

  return <Editor className="write" content={content} />;
};

export default WritePost;
