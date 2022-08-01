import { Link } from 'react-router-dom';
import { useState } from 'react';

const OffCanvas = ({ pages }) => {
  const [selected, setSelected] = useState('all');

  const onItemClick = (event) => {
    const category = event.target.dataset?.category;
    if (!category) return;
    setSelected(category);
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
