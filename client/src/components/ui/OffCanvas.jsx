import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePageNumber } from '@modules/posts/postlist';

const OffCanvas = ({ pages }) => {
  const [selected, setSelected] = useState('all');
  const dispatch = useDispatch();

  const onItemClick = (event) => {
    const category = event.target.dataset?.category;
    if (!category) return;
    setSelected(category);
    dispatch(changePageNumber(1));
  };

  return (
    <nav className="navbar">
      <div className="nav-item-wrapper" onClick={onItemClick}>
        {pages.map((page) => (
          <Link to={`${page.category}`} key={page.category}>
            <div
              className={
                'nav-item ' + (selected === page.category ? 'selected' : '')
              }
              data-category={page.category}
            >
              {page.name}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default OffCanvas;
