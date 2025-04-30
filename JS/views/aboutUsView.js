class AboutUsView {
  aboutUsBtns = document.querySelector(".about-us__btns");
  aboutUsBtn = document.querySelectorAll(".about-us__btn");
  aboutUsContent = document.querySelectorAll(".about-us__content");
  constructor() {
    this._addHandlerTabClick();
  }

  _addHandlerTabClick() {
    this.aboutUsBtns.addEventListener("click", (e) => {
      const btn = e.target.closest(".about-us__btn");
      if (!btn) return;

      const tab = btn.dataset.tab;
      this._switchTab(tab);
    });
  }

  _switchTab(tab) {
    // Remove active class from all buttons and contents
    this.aboutUsBtn.forEach((btn) => btn.classList.remove("active"));
    this.aboutUsContent.forEach((content) =>
      content.classList.remove("active")
    );

    // Add active class to clicked button
    const activeBtn = document.querySelector(
      `.about-us__btn[data-tab="${tab}"]`
    );
    const activeContent = document.getElementById(`tab-${tab}`);

    activeBtn.classList.add("active");
    activeContent.classList.add("active");
  }
}

export default new AboutUsView();
