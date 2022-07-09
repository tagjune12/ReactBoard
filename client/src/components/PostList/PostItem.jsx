import { Link } from 'react-router-dom';

const PostItem = ({
  post: { like, category, _id, title, comments, author, publishedDate },
}) => {
  const getMonthAndDate = () => {
    const dateFormat = new Date(publishedDate);
    const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
    const date = dateFormat.getDate().toString().padStart(2, '0');
    return `${month}-${date}`;
  };

  return (
    <div className="post-item">
      <span className="like">{like.length}</span>
      <span className="category">{category}</span>
      <Link to={`/post/${_id}`}>
        <span className="title">{`${title}(${comments})`}</span>
      </Link>
      <span className="author">{author.nickname}</span>
      <span className="date">{getMonthAndDate()}</span>
    </div>
  );
};

export default PostItem;
