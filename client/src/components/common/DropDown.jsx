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
    <div>
      <div
        onClick={(event) => {
          event.preventDefault();
          setIsVisible((prev) => !prev);
        }}
      >
        <span>{selectedItem}</span>
        {isVisible ? <FiChevronUp /> : <FiChevronDown />}
      </div>
      {isVisible &&
        items.map((item) => (
          <div
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
  );
};

export default DropDown;
