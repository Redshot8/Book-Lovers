class PaginationView {
  constructor() {
    this.parentEl = document.querySelector(".books__wrapper");
    this.booksPerPage = 10;
    this.currentPage = 1;
  }

  render(totalBooks) {
    const totalPages = Math.ceil(totalBooks / this.booksPerPage);
    const markup = this.generateMarkup(totalPages);
    this.parentEl.insertAdjacentHTML("beforeend", markup);
  }

  generateMarkup(totalPages) {
    return `
      <div class="pagination">
        <button class="pagination__btn pagination__btn--prev" data-page="${
          this.currentPage - 1
        }">
          <i class="fas fa-chevron-right"></i>
        </button>
        ${this.generatePageNumbers(totalPages)}
        <button class="pagination__btn pagination__btn--next" data-page="${
          this.currentPage + 1
        }">
          <i class="fas fa-chevron-left"></i>
        </button>
      </div>
    `;
  }

  generatePageNumbers(totalPages) {
    let pageNumbers = "";
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers += `
        <button class="pagination__btn ${
          i === this.currentPage ? "pagination__btn--active" : ""
        }" data-page="${i}">
          ${i}
        </button>
      `;
    }
    return pageNumbers;
  }

  addHandlerClick(handler) {
    this.parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".pagination__btn");
      if (!btn) return;

      const page = +btn.dataset.page;
      if (page < 1 || page > Math.ceil(20 / this.booksPerPage)) return;

      this.currentPage = page;
      handler(page);
    });
  }
}

export default new PaginationView();
