import { Link } from 'react-router-dom';

type page = {
  name: string;
  path: string;
};

type OffCanvasProps = {
  pages: page[];
};

const OffCanvas = ({ pages }: OffCanvasProps) => {
  return (
    <nav className="navbar">
      <h3>Title</h3>
      <div className="nav-item-wrapper">
        {pages.map((page, key) => (
          <Link key={key} to={page.path}>
            {page.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default OffCanvas;
