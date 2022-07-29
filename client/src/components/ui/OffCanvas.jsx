import { Link } from 'react-router-dom';

const OffCanvas = ({ pages }) => {
  return (
    <nav className="navbar">
      <h3>Title</h3>
      <div className="nav-item-wrapper">
        <div key={pages[0].category}>
          <Link to={''}>{pages[0].name}</Link>
        </div>
        {pages.slice(1).map((page, key) => (
          <div key={page.category}>
            <Link to={`?category=${page.category}`}>{page.name}</Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default OffCanvas;
