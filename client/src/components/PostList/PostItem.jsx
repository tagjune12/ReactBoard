import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { getMonthAndDate } from '@lib';

const PostItem = ({
  post: { like, category, _id, title, comments, author, publishedDate },
  isCurrentPost,
}) => {
  return (
    <div className={clsx('post-item', isCurrentPost && 'current-post')}>
      <span className="like">{like.length}</span>
      <span className="category">{category}</span>
      <Link to={`/${category}/${_id}`}>
        <span className="title">{`${title}(${comments})`}</span>
      </Link>
      <span className="author">{author.nickname}</span>
      <span className="date">{getMonthAndDate(publishedDate)}</span>
    </div>
  );
};

export default PostItem;
