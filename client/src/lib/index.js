export const getMonthAndDate = (publishedDate) => {
  const dateFormat = new Date(publishedDate);
  const month = (dateFormat.getMonth() + 1).toString().padStart(2, '0');
  const date = dateFormat.getDate().toString().padStart(2, '0');
  return `${month}-${date}`;
};

export const checkEditorFilled = (target) => {
  return (target === '<p><br></p>' || target === '')
}
