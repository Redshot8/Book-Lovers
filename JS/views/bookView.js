//bookView
import numberController from "../controllers/numberController.js";
import paginationView from "./paginationView.js";
import * as model from "../model.js";

class bookView {
  parentEl = document.querySelector(".books__wrapper");
  btnsParentEl = document.querySelector(".books__filter__btn");
  btns = document.querySelectorAll(".books__filter__btn .btn");
  booksPerPage = 10;
  currentPage = 1;

  constructor() {
    this.addHandllerTabClick();
  }

  addHandllerTabClick() {
    this.btnsParentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn");

      if (!btn) return;
      this.btns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      this._switchTab(tab);
    });
  }

  _switchTab(tab) {
    const books = model.getBooks();
    let filteredBooks = books;

    if (tab === "2") {
      // Filter books with sellsCount >= 2000
      filteredBooks = books.filter((book) => book.sellsCount >= 2000);
    }

    this.render(filteredBooks);
  }

  render(books) {
    // Clear previous content
    this.parentEl.innerHTML = "";

    // Calculate pagination
    const start = (this.currentPage - 1) * this.booksPerPage;
    const end = start + this.booksPerPage;
    const paginatedBooks = books.slice(start, end);

    // Render books
    const markup = paginatedBooks.map(this.generateMarkup.bind(this)).join("");
    this.parentEl.insertAdjacentHTML("beforeend", markup);

    // Render pagination
    paginationView.render(books.length);
  }

  generateMarkup(book) {
    return `
        <div class="books__card">
            <div class="card__front">
              <img class="card__img" src="${book.image}" alt="${book.title}" />
              <div class="card__content">
                <h3 class="card__content-name">${book.title}</h3>
                <p class="card__content-author">${book.author}</p>
              </div>
              <div class="line"></div>
              <div class="book__card_bottom">
                <p class="card__price"><span class="card__price_number" >${book.price}</span> تومان</p>
                <button class="card__add-to-cart books__btn">
                  افزودن به سبد خرید
                </button>
              </div>
            </div>
            <!-- Back Side -->
            <div class="card__back">
              <h3 class="card__content-name">${book.title}</h3>
              <p class="card__content-author">${book.author}</p>
              <p class="card__summary">
                ${book.summary}
              </p>
              <div class="card__rate">
                <p class="card__summary">امتیاز: ${book.rate}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentcolor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              </div>
            </div>
        </div>
    `;
  }

  bookCardFlip() {
    this.parentEl.addEventListener("click", (e) => {
      const card = e.target.closest(".books__card");
      if (!card) return;
      if (
        e.target.closest(".card__add-to-cart") ||
        e.target.closest(".books__btn")
      )
        return;
      card.classList.toggle("flip");
      card.onmouseleave = () => {
        setTimeout(() => {
          card.classList.remove("flip");
        }, 3000);
      };
    });
  }
}

export default new bookView();
