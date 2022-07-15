import React from 'react';

const TitleInput = ({ title, category, onChangeField }) => {
  return (
    <>
      <input
        className="category-input"
        placeholder="카테고리"
        value={'post'}
        // onChange={onChange}
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
    </>
  );
};

export default TitleInput;
