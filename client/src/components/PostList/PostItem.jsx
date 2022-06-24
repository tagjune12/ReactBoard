import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { viewPost } from '@modules/post';

const PostItem = ({ postNumber, post }) => {
  const dispatch = useDispatch();
  const onClick = () => dispatch(viewPost(post));

  return (
    <div className="post-item">
      <span className="like">{post.like}</span>
      <span className="category">{post.category}</span>
      <Link to={`/post/${postNumber}`}>
        <span
          onClick={onClick}
          className="title"
        >{`${post.title}(${post.comments.length})`}</span>
      </Link>
      <span className="author">{post.author}</span>
      <span className="date">{post.publishedDate.split('T')[0]}</span>
    </div>
  );
};

export default PostItem;
