import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory, changePageNumber } from '@modules/posts/postlist';

const NavBar = ({ pages }) => {
  const [selected, setSelected] = useState('all');
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const onItemClick = (event) => {
    const category = event.target.dataset?.category;
    if (!category) return;
    setSelected(category);
    dispatch(changeCategory(category));
    dispatch(changePageNumber(1));
  };

  // useEffect(() => {
  //   // console.log('NavBar', location);
  //   const { pathname } = location;
  //   if (pathname === '/') {
  //     setIsVisible(true);
  //     return;
  //   }
  //   const categories = pages.map((page) => page.category);
  //   // console.log('NavBar', pathname, categories, pathname.split('/'));
  //   setIsVisible(categories.includes(pathname.split('/')[1]));
  // }, [location]);

  return (
    <>
      {isVisible && (
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
      )}
    </>

    // <nav className="navbar">
    //   <div className="nav-item-wrapper" onClick={onItemClick}>
    //     {pages.map((page) => (
    //       <Link to={`${page.category}`} key={page.category}>
    //         <div
    //           className={
    //             'nav-item ' + (selected === page.category ? 'selected' : '')
    //           }
    //           data-category={page.category}
    //         >
    //           {page.name}
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </nav>
  );
};

export default NavBar;
