import { useState, useEffect } from 'react';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const DropDown = ({ items, selectItem }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSelectedItem(items[0].name);
    selectItem(items[0].category);
  }, []);

  return (
    <div className="dropdown-wrapper">
      <div
        className="selected"
        onClick={(event) => {
          event.preventDefault();
          setIsVisible((prev) => !prev);
        }}
      >
        <span>{selectedItem}</span>
        {isVisible ? (
          <FiChevronUp className="arrow-up" />
        ) : (
          <FiChevronDown className="arrow-down" />
        )}
      </div>
      {isVisible && (
        <div className="option-list">
          {items.map((item) => (
            <div
              className="option"
              key={item.category}
              onClick={() => {
                setSelectedItem(item.name);
                selectItem(item.category);
                setIsVisible(false);
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
