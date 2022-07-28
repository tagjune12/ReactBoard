import { useState, useEffect } from 'react';

const DropDown = ({ items, selectItem }) => {
  const [selectedItem, setSelectedItem] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setSelectedItem(items[0].name);
    selectItem(items[0].category);
  }, []);

  return (
    <div>
      <button
        onClick={(event) => {
          event.preventDefault();
          setIsVisible((prev) => !prev);
        }}
      >
        {selectedItem}
      </button>
      {isVisible &&
        items.map((item) => (
          <li
            key={item.category}
            onClick={() => {
              setSelectedItem(item.name);
              selectItem(item.category);
              setIsVisible(false);
            }}
          >
            {item.name}
          </li>
        ))}
    </div>
  );
};

export default DropDown;
