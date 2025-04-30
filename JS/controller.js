//controller
import * as model from "./model.js";
import bookView from "./views/bookView.js";
import navView from "./views/navView.js";
import cartView from "./views/cartView.js";
import aboutUsView from "./views/aboutUsView.js";
import animateView from "./views/animateView.js";
import BookSlideView from "./views/bookSlideView.js";
import CommentSliderView from "./views/commentSliderView.js";
import commentSliderView from "./views/commentSliderView.js";
import paginationView from "./views/paginationView.js";
const books = model.getBooks();

const cartControll = function () {
  model.loadCart();
  cartView.renderCart(model.state.cartItem);
  cartView.renderDelBtn();
};
cartControll();

const init = function () {
  navView.obserHeader();
  bookView.render(books);
  bookView.bookCardFlip();
  paginationView.addHandlerClick(function (page) {
    bookView.currentPage = page;
    bookView.render(books);
  });
  animateView.init();
  BookSlideView.init();
  CommentSliderView.init();
};
init();

//////////////////
