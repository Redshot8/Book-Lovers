// model

import books from "../data/books.json";
export const getBooks = () => books;

export const state = {
  cartItem: [],
};

const persistCart = function () {
  localStorage.setItem("cart", JSON.stringify(state.cartItem));
};
export const loadCart = function () {
  const storage = localStorage.getItem("cart");
  if (storage) {
    state.cartItem = JSON.parse(storage);
  }
};
export const addItemToCart = function (item) {
  state.cartItem.push(item);
  persistCart();
};
export const plusItemToCart = function (bookName) {
  state.cartItem = state.cartItem.filter((item) => item.bookName);
  persistCart();
};
export const removeItemFromCart = function (bookName) {
  state.cartItem = state.cartItem.filter((item) => item.bookName !== bookName);
  persistCart();
};

export const clearCArt = function () {
  state.cartItem = [];
  persistCart();
};
export const isAlreadyInCart = function (bookName) {
  return state.cartItem.some((item) => item.bookName === bookName);
};
