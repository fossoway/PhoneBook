export const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];


export const setStorage = (key, value) => {
  const phoneBook = getStorage(key);
  phoneBook.push(value);
  localStorage.setItem(key, JSON.stringify(phoneBook));
};


export const removeStorage = (key, number) => {
  const phoneBook = getStorage(key);
  const index = phoneBook.findIndex(i => i.phone === number);
  phoneBook.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(phoneBook));
};
