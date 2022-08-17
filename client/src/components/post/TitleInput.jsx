import DropDown from '@components/common/DropDown';
import React from 'react';

const TitleInput = ({ title, categories, setCategory, setTitle }) => {
  return (
    <div className="title-form">
      <DropDown
        items={categories.slice(1)}
        selectItem={(item) => {
          setCategory(item);
        }}
      />
      <input
        className="title-input"
        placeholder="제목"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
    </div>
  );
};

export default TitleInput;
