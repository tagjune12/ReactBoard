import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <span className="like">{post.like}</span>
      <span className="category">{post.category}</span>
      <Link to={`/post/${post._id}`}>
        <span className="title">{`${post.title}(${post.comments.length})`}</span>
      </Link>
      <span className="author">{post.author}</span>
      <span className="date">{post.publishedDate.split('T')[0]}</span>
    </div>
  );
};

export default PostItem;
