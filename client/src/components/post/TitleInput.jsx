import DropDown from '@components/common/DropDown';
import React from 'react';

const TitleInput = ({ title, categories, onChangeField }) => {
  return (
    <div>
      <DropDown
        items={categories.slice(1)}
        selectItem={(item) => {
          onChangeField('category', item);
        }}
      />
      {title ? (
        <input
          className="title-input"
          placeholder="제목"
          value={title}
          onChange={(event) => {
            onChangeField('title', event.target.value);
          }}
        />
      ) : (
        <input
          className="title-input"
          placeholder="제목"
          onChange={(event) => {
            onChangeField('title', event.target.value);
          }}
        />
      )}
    </div>
  );
};

export default TitleInput;
