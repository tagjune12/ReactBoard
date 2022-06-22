import { Link } from 'react-router-dom';

type PostItemProps = {
  postId: string;
};

const PostItem = ({ postId }: PostItemProps) => {
  return (
    <div className="post-item">
      <span className="like">5</span>
      <span className="category">카테고리</span>
      <Link to={`/post/${postId}`}>
        <span className="title">타이틀({5})</span>
      </Link>
      <span className="author">작성자</span>
      <span className="date">06-21</span>
    </div>
  );
};

export default PostItem;
