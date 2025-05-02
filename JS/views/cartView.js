import * as model from "../model.js";
import numberController from "../controllers/numberController.js";

class cartView {
  parentEl = document.querySelector(".books__wrapper");
  cartBTn = document.querySelector(".header__nav-cart");
  cartDropdown = document.querySelector(".cart-dropdown");
  messageEl = document.querySelector(".item-added_msg");
  messageExistEl = document.querySelector(".item-exist_msg");

  constructor() {
    this.addHandllerAddToCart();
    this.clearCart();
    this.addHandllerRemoveItem();
    this.addHandllerAddItem();
    this.addHandllerReduceItem();
    this.showCart();
    this.totalPrice();
  }
  showCart() {
    this.cartBTn.addEventListener("click", (e) => {
      this.cartDropdown.classList.toggle("hidden");
    });
  }
  addHandllerAddToCart() {
    this.parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".card__add-to-cart");
      if (!btn) return;
      const card = btn.closest(".books__card");
      const cardImg = card.querySelector(".card__img").getAttribute("src");
      const bookName = card.querySelector(".card__content-name").textContent;
      const author = card.querySelector(".card__content-author").textContent;
      let price = +card.querySelector(".card__price_number").textContent;
      console.log(price);
      // price = numberController.formatToEnglish(price);
      if (model.isAlreadyInCart(bookName)) {
        this.showExistMessage(bookName);
        return;
      }

      model.addItemToCart({ bookName, cardImg, author, price });
      this.renderCart();
      this.renderDelBtn();
      this.showAddMessage(bookName);
      this.totalPrice();
      console.log(model.state.cartItem);
    });
  }

  showAddMessage(bookName) {
    const message = this.messageEl.querySelector("p");
    message.innerHTML = `کتاب ${bookName} به سبد خرید اضافه شد`;
    this.messageEl.style.top = `${window.scrollY + 100}px`;
    this.toggleMessage(this.messageEl);
  }

  showExistMessage(bookName) {
    const errorMessage = this.messageExistEl.querySelector("p");
    errorMessage.innerHTML = `کتاب ${bookName} در سبد خرید وجود دارد`;
    this.messageExistEl.style.top = `${window.scrollY + 100}px`;
    this.toggleMessage(this.messageExistEl);
  }

  toggleMessage(element) {
    setTimeout(() => {
      element.classList.remove("hide");
      element.classList.add("show");
    }, 300);
    setTimeout(() => {
      element.classList.remove("show");
      element.classList.add("hide");
    }, 3000);
  }

  renderCartItem({ bookName, cardImg, author, price, quantity = 1 }) {
    return `
      <div class="cart-dropdown__item" data-price="${price}">
        <div class="item__img">
          <img src="${cardImg}" alt="" />
        </div>
        <div class="item__content">
          <h3 class="item__content_name">${bookName}</h3>
          <p class="item_content_author">${author}</p>
        </div>
        <div class="item__controls">
          <i class="fas fa-plus item__icon item__icon-plus"></i>
          <span class="item__count">${quantity}</span>
          <i class="fas fa-minus item__icon item__icon-minus"></i>
        </div>
        <div class="item__price"><span class="item__price_number">${numberController.formatToPersian(
          +price * quantity
        )}</span> تومان</div>
        <i class="fas fa-trash item__icon item__icon-trash"></i>
      </div>
    `;
  }

  renderCart() {
    this.cartDropdown.innerHTML = "";
    if (model.state.cartItem.length === 0) {
      this.cartDropdown.insertAdjacentHTML(
        "afterbegin",
        '<p class="cart-dropdown__empty-msg">سبد خرید خالی است :(</p>'
      );

      return;
    }

    model.state.cartItem.forEach((item) => {
      const markup = this.renderCartItem(item);
      this.cartDropdown.insertAdjacentHTML("afterbegin", markup);
    });
  }
  totalPrice() {
    let total = 0;
    const items = this.cartDropdown.querySelectorAll(".cart-dropdown__item");
    items.forEach((item) => {
      const count = +item.querySelector(".item__count").textContent;
      const unitPrice = +item.dataset.price;
      total += count * unitPrice;
    });
    const totalEl = this.cartDropdown.querySelector(
      ".cart-dropdown__total-number"
    );
    if (totalEl) totalEl.textContent = numberController.formatToPersian(+total);
  }
  renderDelBtn() {
    const markup = `
      <div class="cart-dropdown__remove-btn">
        <button class="remove__btn">حذف همه</button>
      </div>
    `;
    if (model.state.cartItem.length >= 2) {
      this.cartDropdown.insertAdjacentHTML(
        "beforeend",
        '<div class="cart-dropdown__total">مجموع: <span class="cart-dropdown__total-number">0</span> تومان</div>'
      );

      this.totalPrice();
      this.cartDropdown.insertAdjacentHTML("beforeend", markup);
    }
  }

  clearCart() {
    this.cartDropdown.addEventListener("click", (e) => {
      const btn = e.target.closest(".remove__btn");
      if (!btn) return;
      model.clearCArt();
      this.renderCart();
      this.totalPrice();
    });
  }

  addHandllerRemoveItem() {
    this.cartDropdown.addEventListener("click", (e) => {
      const btn = e.target.closest(".item__icon-trash");
      if (!btn) return;
      const itemEl = btn.closest(".cart-dropdown__item");
      const bookName = itemEl.querySelector(".item__content_name").textContent;
      model.removeItemFromCart(bookName);
      this.renderCart();
      this.renderDelBtn();
      this.totalPrice();
    });
  }

  addHandllerAddItem() {
    this.cartDropdown.addEventListener("click", (e) => {
      const btn = e.target.closest(".item__icon-plus");
      if (!btn) return;
      const itemEl = btn.closest(".cart-dropdown__item");
      if (!itemEl) return;
      const countEl = itemEl.querySelector(".item__count");
      const itemPrice = itemEl.querySelector(".item__price_number");
      const unitPrice = +itemEl.dataset.price;
      const bookName = itemEl.querySelector(".item__content_name").textContent;

      model.plusItemToCart(bookName);
      const item = model.state.cartItem.find(
        (item) => item.bookName === bookName
      );
      countEl.textContent = item.quantity;
      itemPrice.textContent = numberController.formatToPersian(
        unitPrice * item.quantity
      );
      this.totalPrice();
    });
  }

  addHandllerReduceItem() {
    this.cartDropdown.addEventListener("click", (e) => {
      const btn = e.target.closest(".item__icon-minus");
      if (!btn) return;
      const itemEl = btn.closest(".cart-dropdown__item");
      if (!itemEl) return;
      const countEl = itemEl.querySelector(".item__count");
      const itemPrice = itemEl.querySelector(".item__price_number");
      const unitPrice = +itemEl.dataset.price;
      const bookName = itemEl.querySelector(".item__content_name").textContent;

      model.reduceItemInCart(bookName);
      const item = model.state.cartItem.find(
        (item) => item.bookName === bookName
      );
      if (item) {
        countEl.textContent = item.quantity;
        itemPrice.textContent = numberController.formatToPersian(
          unitPrice * item.quantity
        );
        this.totalPrice();
      } else {
        itemEl.remove();
        this.renderCart();
      }
    });
  }
}

export default new cartView();
