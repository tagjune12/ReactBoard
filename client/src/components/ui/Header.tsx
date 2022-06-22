import '@styles/header.scss';
import OffCanvas from './OffCanvas';
import pages from '@assets/data/page.json';

const Header = () => {
  return (
    <div>
      <div>
        <h1 className="title">Title</h1>
      </div>
      <OffCanvas pages={pages} />
    </div>
  );
};

export default Header;
