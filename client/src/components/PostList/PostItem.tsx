import { Link } from 'react-router-dom';
import { Post } from '@components/PostList/types';

type PostItemProps = {
  postNumber: number;
  post: Post;
};

const PostItem = ({ postNumber, post }: PostItemProps) => {
  return (
    <div className="post-item">
      <span className="like">{post.like}</span>
      <span className="category">{post.category}</span>
      <Link to={`/post/${postNumber}`}>
        <span className="title">{`${post.title}(${post.comments.length})`}</span>
      </Link>
      <span className="author">{post.author}</span>
      <span className="date">{post.publishedDate.split('T')[0]}</span>
    </div>
  );
};

export default PostItem;
