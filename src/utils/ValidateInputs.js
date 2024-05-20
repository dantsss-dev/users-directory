export const HasOnlyNumbers = (text) => {
  const regex = /^[0-9\s-]*$/;
  return regex.test(text);
};
