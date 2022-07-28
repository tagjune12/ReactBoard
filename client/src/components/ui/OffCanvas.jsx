import { Link } from 'react-router-dom';

const OffCanvas = ({ pages }) => {
  return (
    <nav className="navbar">
      <h3>Title</h3>
      <div className="nav-item-wrapper">
        <li key={pages[0].category}>
          <Link to={`/`}>{pages[0].name}</Link>
        </li>
        {pages.slice(1).map((page, key) => (
          <li key={page.category}>
            <Link to={`?category=${page.category}`}>{page.name}</Link>
          </li>
        ))}
      </div>
    </nav>
  );
};

export default OffCanvas;
