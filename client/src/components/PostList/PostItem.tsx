import { Link } from 'react-router-dom';

const PostItem = () => {
  return (
    <div className="post-item">
      <span className="thumb-up">5</span>
      <span className="post-category">카테고리</span>
      <Link className="post-title" to=":id">
        타이틀({5})
      </Link>
      <span className="post-author">작성자</span>
      <span className="post-date">06-21</span>
    </div>
  );
};

export default PostItem;
